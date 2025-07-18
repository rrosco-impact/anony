export async function createPostTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      post_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(user_id),
      team_id INTEGER NOT NULL REFERENCES teams(team_id),
      post_type VARCHAR(50) NOT NULL CHECK (post_type IN ('question', 'suggestion', 'message', 'proposal', 'poll', 'event')),
      sentiment TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
