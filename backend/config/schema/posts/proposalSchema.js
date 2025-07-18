export async function createProposalTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS proposals (
      proposal_id SERIAL PRIMARY KEY,
      post_id INTEGER NOT NULL REFERENCES posts(post_id),
      proposal_title TEXT NOT NULL,
      pdf TEXT,
      summary TEXT,
      caption TEXT,
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS feedback (
      feedback_id SERIAL PRIMARY KEY,
      proposal_id INTEGER NOT NULL REFERENCES proposals(proposal_id),
      submitted_by INTEGER NOT NULL REFERENCES users(user_id),
      topic TEXT,
      content_embedding TEXT,
      sentiment_score INTEGER,
      sentiment_label TEXT,
      submitted_on TIMESTAMP DEFAULT NOW()
    );
  `;
}
