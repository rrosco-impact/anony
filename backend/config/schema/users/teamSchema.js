export async function createTeamTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS teams (
      team_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(user_id),
      team_name TEXT NOT NULL,
      verification_status BOOLEAN DEFAULT FALSE,
      invite_link TEXT NOT NULL UNIQUE,
      team_code TEXT NOT NULL UNIQUE,
      team_password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
}
