import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { initSchema } from "./config/initSchema.js";

import authRoutes from "./routes/auth/authRoutes.js"
import userRoutes from "./routes/auth/userRoutes.js"
import commentsRoutes from "./routes/post/commentsRoutes.js";
import postRoutes from "./routes/post/postRoutes.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Parse JSON bodies
app.use(cors()); //enable CORS for all routes
app.use(helmet()); //secure the app by setting various HTTP headers
app.use(morgan("dev")); //log requests to the console

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

app.use("/api/", postRoutes);
app.use("/api/", commentsRoutes);

initSchema().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
