export async function createCommentTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
        comment_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        post_id INTEGER NOT NULL REFERENCES posts(post_id),
        team_id INTEGER NOT NULL REFERENCES teams(team_id),
        reply_to INTEGER NOT NULL REFERENCES users(user_id),
        content TEXT NOT NULL,
        content_embedding TEXT,
        sentiment_score INTEGER,
        sentiment_label TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
    `;
}
