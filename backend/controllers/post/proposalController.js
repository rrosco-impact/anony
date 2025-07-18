import { sql } from "../../config/db.js";

export const createProposal = async (req, res) => {
  const { postId } = req.params;
  const { proposal_title, pdf, summary, caption, start_date, end_date } =
    req.body;

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
      VALUES (${postId}, ${proposal_title}, ${pdf}, ${summary}, ${caption}, ${start_date}, ${end_date})
      RETURNING *`[
      (postId, proposal_title, pdf, summary, caption, start_date, end_date)
    ];
    res.status(201).json(result[0]);
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
