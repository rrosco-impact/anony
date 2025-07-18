// backend/db/initSchema.js
import { createUserTable } from "./schema/users/userSchema.js";
import { createTeamTable } from "./schema/users/teamSchema.js";

import { createPostTable } from "./schema/posts/postSchema.js";
import { createMessageTable } from "./schema/posts/messageSchema.js";
import { createQuestionTable } from "./schema/posts/questionSchema.js";
import { createSuggestionTable } from "./schema/posts/suggestionSchema.js";

import { createProposalTable } from "./schema/posts/proposalSchema.js";
import { createPollTable } from "./schema/posts/pollSchema.js";

import { sql } from "../config/db.js";

export async function initSchema() {
  try {
    await createUserTable(sql);
    await createTeamTable(sql);
    await createPostTable(sql);
    await createMessageTable(sql);
    await createQuestionTable(sql);
    await createSuggestionTable(sql);
    await createProposalTable(sql);
    await createPollTable(sql);
    console.log("All tables created successfully");
  } catch (err) {
    console.error("Failed to initialize schema:", err);
    throw err;
  }
}
