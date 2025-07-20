import { sql } from "../../config/db.js";
import { GoogleGenAI } from "@google/genai";
import { Storage } from '@google-cloud/storage';

const ai = new GoogleGenAI({});
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

export const createProposal = async (req, res) => {
  const post_id = req.params.postId;
  const payloadJson = JSON.parse(req.body.payload);
  // [RROSCO] Removed pdf and summary since it can be get using req.file
  const { proposal_title, caption, start_date, end_date } = payloadJson;

  // Get PDF
  const pdfBuffer = Buffer.from(req.file.buffer, 'utf-8');

  // Upload to cloud storage bucket
  await storage.bucket(bucketName).file(req.file.originalname).save(pdfBuffer).catch(console.error);

  // Link to store in database
  // const pdf = 'link';
  const pdf = `https://storage.cloud.google.com/${bucketName}/${req.file.originalname}`

  // Summarize document
  // Content for Gemini Prompt
  const contents = [
    { text: "Summarize this document" },
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: Buffer.from(pdfBuffer).toString("base64")
        }
      }
  ];

  // Prompt to Gemini
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents
  });
  
  // Store to summary variable
  // const summary = "this is a summary"
  const summary = response.text;

  console.log(`post_id: ${post_id}`);
  console.log(`proposal_title: ${proposal_title}`);
  console.log(`caption: ${caption}`);
  console.log(`pdf: ${pdf}`);
  console.log(`summary: ${summary}`);
  console.log(`start_date: ${start_date}`);
  console.log(`end_date: ${end_date}`);
  
  if (
    !post_id ||
    !proposal_title ||
    !caption ||
    !pdf ||
    !summary ||
    !start_date ||
    !end_date
  ) {
    return res.status(400).json({
      error:
        "post_id, proposal title, caption, pdf, start_date, and end_date and sumary required",
    });
  }

  try {
    const result = await sql`
      INSERT INTO proposals (post_id, proposal_title, pdf, summary, caption, start_date, end_date)
      VALUES (${post_id}, ${proposal_title}, ${pdf}, ${summary}, ${caption}, ${start_date}, ${end_date})
      RETURNING *;`;[
      post_id, proposal_title, pdf, summary, caption, start_date, end_date
    ];    
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProposal = async (req, res) => {
  try {
    const proposals = await sql`
      SELECT * FROM proposals ORDER BY proposal_id DESC;
    `;
    res.json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificProposal = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql`
      SELECT * FROM proposals WHERE proposal_id = ${id};
    `;
    if (result.length === 0) {
      return res.status(404).json({ error: "Proposal not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProposal = async (req, res) => {
  const { id } = req.params;
  const { proposal_title, pdf, summary, caption, start_date, end_date } =
    req.body;

  try {
    const updatedProposal = await sql`
      UPDATE proposals
      SET proposal_title = ${proposal_title}, pdf = ${pdf}, summary = ${summary}, caption = ${caption}, start_date = ${start_date}, end_date = ${end_date}, updated_at = NOW()
      WHERE proposal_id = ${id}
      RETURNING *;
    `;

    if (updatedProposal.length === 0) {
      return res.status(404).json({ error: "Proposal not found" });
    }
    res.status(200).json(updatedProposal[0]);
  } catch (error) {
    console.error("Error updating proposal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProposal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProposal = await sql`
      DELETE FROM proposals WHERE proposal_id = ${id} RETURNING *;
    `;

    if (deletedProposal.length === 0) {
      return res.status(404).json({ error: "Proposal not found" });
    }
    res.status(200).json(deletedProposal[0]);
  } catch (error) {
    console.error("Error deleting proposal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
