import { sql } from "../../config/db.js";

export const createEvent = async (req, res) => {
  const { postId } = req.params;
  const { title, description, date, location } = req.body;
  try {
    const newEvent = await sql`
        INSERT INTO events (title, description, date, location, post_id)
        VALUES (${title}, ${description}, ${date}, ${location}, ${postId})
        RETURNING *;
        `;

    res.status(201).json(newEvent[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM events;`;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql`SELECT * FROM events WHERE id = ${id};`;
    if (result.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;
  try {
    const updatedEvent = await sql`
            UPDATE events
            SET title = ${title}, description = ${description}, date = ${date}, location = ${location}
            WHERE id = ${id}
            RETURNING *;
            `;

    if (updatedEvent.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent[0]);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent =
      await sql`DELETE FROM events WHERE id = ${id} RETURNING *;`;
    if (deletedEvent.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(deletedEvent[0]);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
