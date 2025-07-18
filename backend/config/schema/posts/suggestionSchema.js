export async function createSuggestionTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS suggestions (
      suggestion_id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      summary TEXT,
      post_id INTEGER NOT NULL REFERENCES posts(post_id),
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
