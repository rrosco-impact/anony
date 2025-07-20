import express from "express";
import { postComment, replyComment, getAllComments } from "../../controllers/post/commentsController.js";

const router = express.Router();

// [RROSCO] Baguhon ko ini
// router.post("/:type/:id/comments", createComment);

router.post("/comments/postComment", postComment);
router.post("/comments/replyComment", replyComment);
router.post("/comments/getAllComments", getAllComments);

export default router;
