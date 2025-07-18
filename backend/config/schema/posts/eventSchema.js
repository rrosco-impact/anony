export async function createEventTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS events (
        event_id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(post_id),
        event_title TEXT NOT NULL,
        event_description TEXT,
        event_date TIMESTAMP NOT NULL,
        event_location TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    `;
}
