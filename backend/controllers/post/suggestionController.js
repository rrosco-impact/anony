import { sql } from "../../config/db.js";

export const createSuggestion = async (req, res) => {
  const { postId } = req.params;
  const { content, summary } = req.body;
  try {
    const newPost = await sql`
      INSERT INTO suggestions (content, summary, post_id, start_date, end_date)
      VALUES ( ${content}, ${summary}, ${postId}, ${start_date}, ${end_date})
      RETURNING *;
    `;

    res.status(201).json(newPost[0]);
  } catch (error) {
    console.error("Error creating suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllSuggestions = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM suggestions;`;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificSuggestion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM suggestions WHERE id = ${id};`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Suggestion not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSuggestion = async (req, res) => {
  const { id } = req.params;
  const { content, summary } = req.body;
  try {
    const updatedSuggestion = await sql`
        UPDATE suggestions
        SET content = ${content}, summary = ${summary}, 
            start_date = ${start_date}, end_date = ${end_date}
        WHERE id = ${id}
        RETURNING *;
        `;

    if (updatedSuggestion.length === 0) {
      return res.status(404).json({ error: "Suggestion not found" });
    }
    res.status(200).json(updatedSuggestion[0]);
  } catch (error) {
    console.error("Error updating suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSuggestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSuggestion = await sql`
      DELETE FROM suggestions
      WHERE id = ${id}
      RETURNING *;
    `;

    if (deletedSuggestion.length === 0) {
      return res.status(404).json({ error: "Suggestion not found" });
    }
    res.status(200).json(deletedSuggestion[0]);
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
