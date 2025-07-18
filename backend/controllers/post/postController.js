import { sql } from "../../config/db.js";

export const createPost = async (req, res) => {
  const { user_id, team_id, post_type } = req.body;
  try {
    const result = await sql`
         INSERT INTO posts (user_id, team_id, post_type)
            VALUES (${user_id}, ${team_id}, ${post_type})
            RETURNING *;
        `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const result = await sql`
      SELECT
        p.*,
        q.content AS question_content,
        s.content AS suggestion_content,
        m.content AS message_content,
        po.proposal_title AS proposal_title,
        pl.question AS poll_question
      FROM posts p
      LEFT JOIN questions q ON p.post_id = q.post_id
      LEFT JOIN suggestions s ON p.post_id = s.post_id
      LEFT JOIN messages m ON p.post_id = m.post_id
      LEFT JOIN proposals po ON p.post_id = po.post_id
      LEFT JOIN polls pl ON p.post_id = pl.post_id
  ORDER BY p.created_at DESC;
    `;

    const formatted = result.map((row) => {
      let content = "";
      switch (row.post_type) {
        case "question":
          content = row.question_content;
          break;
        case "suggestion":
          content = row.suggestion_content;
          break;
        case "message":
          content = row.message_content;
          break;
        case "proposal":
          content = row.proposal_title;
          break;
        case "poll":
          content = row.poll_question;
          break;
      }

      return {
        ...row,
        content,
      };
    });

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//
