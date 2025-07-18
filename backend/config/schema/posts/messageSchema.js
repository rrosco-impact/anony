export async function createMessageTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      message_id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      summary TEXT,
      post_id INTEGER NOT NULL REFERENCES posts(post_id),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
