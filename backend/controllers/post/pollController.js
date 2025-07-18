import { sql } from "../../config/db.js";

export const createPoll = async (req, res) => {
  const { postId } = req.params;
  const { question, options } = req.body;
  try {
    const newPoll = await sql`
        INSERT INTO polls (question, options, post_id, start_date, end_date)
        VALUES (${question}, ${options}, ${postId}, ${start_date}, ${end_date})
        RETURNING *;
        `;
    res.status(201).json(newPoll[0]);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPolls = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM polls;`;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificPoll = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM polls WHERE id = ${id};`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Poll not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching poll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePoll = async (req, res) => {
  const { id } = req.params;
  const { question, options } = req.body;
  try {
    const updatedPoll = await sql`
        UPDATE polls
        SET question = ${question}, options = ${options}, 
            start_date = ${start_date}, end_date = ${end_date}
        WHERE id = ${id}
        RETURNING *;
        `;

    if (updatedPoll.length === 0) {
      return res.status(404).json({ error: "Poll not found" });
    }
    res.status(200).json(updatedPoll[0]);
  } catch (error) {
    console.error("Error updating poll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePoll = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPoll = await sql`
            DELETE FROM polls
            WHERE id = ${id}
            RETURNING *;
            `;

    if (deletedPoll.length === 0) {
      return res.status(404).json({ error: "Poll not found" });
    }
    res.status(200).json(deletedPoll[0]);
  } catch (error) {
    console.error("Error deleting poll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
