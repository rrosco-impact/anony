import { sql } from "../../config/db.js";

export const createMessage = async (req, res) => {
  const { postId } = req.params;
  const { content, summary } = req.body;
  try {
    const newPost = await sql`
      INSERT INTO messages (content, summary, post_id)
      VALUES ( ${content}, ${summary}, ${postId})
      RETURNING *;
    `;

    res.status(201).json(newPost[0]);
  } catch (error) {
    console.error("Error creating suggestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM messages;`;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM messages WHERE id = ${id};`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { content, summary } = req.body;
  try {
    const updatedMessage = await sql`
        UPDATE messages
        SET content = ${content}, summary = ${summary}
        WHERE id = ${id}
        RETURNING *;
        `;

    if (updatedMessage.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json(updatedMessage[0]);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await sql`
        DELETE FROM messages
        WHERE id = ${id}
        RETURNING *;
        `;

    if (deletedMessage.length === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
