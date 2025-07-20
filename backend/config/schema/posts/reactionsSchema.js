export async function createReactionTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS reactions (
        reaction_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        reaction_type TEXT NOT NULL,
        type TEXT NOT NULL,
        post_id INTEGER REFERENCES posts(post_id),
        comment_id INTEGER REFERENCES comments(comment_id),
        created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
