import express from "express";
import { createComment } from "../../controllers/post/commentsController.js";

const router = express.Router();

router.post("/:type/:id/comments", createComment);

export default router;
