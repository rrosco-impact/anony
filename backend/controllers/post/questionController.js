import { sql } from "../../config/db.js";

export const createQuestion = async (req, res) => {
  const { postId } = req.params;
  const { content, summary, start_date, end_date } = req.body;
  try {
    const newPost = await sql`
      INSERT INTO questions (content, summary, post_id, start_date, end_date)
      VALUES ( ${content}, ${summary}, ${postId}, ${start_date}, ${end_date})
      RETURNING *;
    `;

    res.status(201).json(newPost[0]);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM questions;`;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM questions WHERE id = ${id};`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { content, summary } = req.body;
  try {
    const updatedQuestion = await sql`
        UPDATE questions
        SET content = ${content}, summary = ${summary}, start_date = ${start_date}, end_date = ${end_date}
        WHERE id = ${id}
        RETURNING *;
        `;

    if (updatedQuestion.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(updatedQuestion[0]);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await sql`
        DELETE FROM questions
        WHERE id = ${id}
        RETURNING *;
        `;

    if (deletedQuestion.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
