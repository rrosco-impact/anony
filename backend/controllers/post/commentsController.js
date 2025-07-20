import { sql } from "../../config/db.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const postComment = async (req, res) => {
  const { user_id, post_id, reply_to, content } = req.body

  const reply_to_post = 0;

  const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
      config: {
        systemInstruction: "You are a sentiment analysis model. Classify the content as [Positive, Neutral, Negative]",
        temperature: 0.5,
        candidateCount: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024
      }
  });

  const sentiment_label = response.text;
  const sentiment_score =  1;
  const content_embedding = "Temporary embedding";

  if (
    !user_id ||
    !post_id ||
    !content ||
    !content_embedding ||
    !sentiment_score ||
    !sentiment_label
  ) {
    return res.status(400).json({
      error:
        "user_id, post_id, content, content_embedding, sentiment_score, and sentiment_label are required",
    });
  }

  try {
    const result = await sql`
      INSERT INTO comments (user_id, post_id, reply_to, content, content_embedding, sentiment_score, sentiment_label)
      VALUES (${user_id}, ${post_id}, ${reply_to_post}, ${content}, ${content_embedding}, ${sentiment_score}, ${sentiment_label})
      RETURNING *;`;[
      user_id, post_id, reply_to_post, content, content_embedding, sentiment_score, sentiment_label
    ];    
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const replyComment = async (req, res) => {
  const { user_id, post_id, reply_to, content } = req.body;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
        config: {
          systemInstruction: "You are a sentiment analysis model. Classify the content as [Positive, Neutral, Negative].",
          temperature: 0.5,
          candidateCount: 1,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
    });

    const sentiment_label = response.text

    const sentiment_score = 1;
    const content_embedding = "Temporary embedding";

  if (
    !user_id ||
    !post_id ||
    !reply_to ||
    !content ||
    !content_embedding ||
    !sentiment_score ||
    !sentiment_label
  ) {
    return res.status(400).json({
      error:
        "user_id, post_id, content, content_embedding, sentiment_score, and sentiment_label are required",
    });
  }

  try {
    const result = await sql`
      INSERT INTO comments (user_id, post_id, reply_to, content, content_embedding, sentiment_score, sentiment_label)
      VALUES (${user_id}, ${post_id}, ${reply_to}, ${content}, ${content_embedding}, ${sentiment_score}, ${sentiment_label})
      RETURNING *;`;[
      user_id, post_id, reply_to, content, content_embedding, sentiment_score, sentiment_label
    ];    
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating reply to comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {};
