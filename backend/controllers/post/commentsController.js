import { sql } from "../../config/db.js";

export const createComment = async (req, res) => {
    const { user_id, post_id, team_id, content } = req.body

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

    const sentiment_label = response.text

    const sentiment_score = "Temporary sentiment score";
    const content_embedding = "Temporary embedding";

    if (
    !user_id ||
    !post_id ||
    !team_id ||
    !content ||
    !content_embedding ||
    !sentiment_score ||
    !sentiment_label
  ) {
    return res.status(400).json({
      error:
        "user_id, post_id, team_id, content, content_embedding, sentiment_score, and sentiment_label are required",
    });
  }

  try {
    const result = await sql`
      INSERT INTO comments (user_id, post_id, team_id, content, content_embedding, sentiment_score, sentiment_label)
      VALUES (${user_id}, ${post_id}, ${team_id}, ${content}, ${content_embedding}, ${sentiment_score}, ${sentiment_label})
      RETURNING *;`;[
      user_id, post_id, team_id, content, content_embedding, sentiment_score, sentiment_label
    ];    
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllComments = async (req, res) => {};
