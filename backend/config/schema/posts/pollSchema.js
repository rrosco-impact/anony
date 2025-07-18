export async function createPollTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS polls (
      poll_id SERIAL PRIMARY KEY,
      post_id INTEGER NOT NULL REFERENCES posts(post_id),
      question TEXT NOT NULL,
      option TEXT[],
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS poll_votes (
      vote_id SERIAL PRIMARY KEY,  
        poll_id INTEGER NOT NULL REFERENCES polls(poll_id),
        user_id INTEGER NOT NULL REFERENCES users(user_id),
        option TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (poll_id, user_id) 
    );
  `;
}
