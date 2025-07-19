import express from "express";
import multer from "multer";

const router = express.Router();

const memoryStorage = multer.memoryStorage()
const upload = multer({ 
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
})

// controllers
import {
  createPost,
  getAllPosts,
} from "../../controllers/post/postController.js";
import {
  createQuestion,
  getAllQuestions,
  getSpecificQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../controllers/post/questionController.js";
import {
  createSuggestion,
  getAllSuggestions,
  getSpecificSuggestion,
  updateSuggestion,
  deleteSuggestion,
} from "../../controllers/post/suggestionController.js";
import {
  createProposal,
  getAllProposal,
  getSpecificProposal,
  updateProposal,
  deleteProposal,
} from "../../controllers/post/proposalController.js";
import {
  createMessage,
  getAllMessages,
  getSpecificMessage,
  updateMessage,
  deleteMessage,
} from "../../controllers/post/messageController.js";
import {
  createPoll,
  getAllPolls,
  getSpecificPoll,
  updatePoll,
  deletePoll,
} from "../../controllers/post/pollController.js";
import {
  createEvent,
  getAllEvents,
  getSpecificEvent,
  updateEvent,
  deleteEvent,
} from "../../controllers/post/eventController.js";

// Create base post
router.post("/posts", createPost);

// Get all posts
router.get("/posts", getAllPosts);

// question subtype
router.post("/posts/:postId/question", createQuestion);
router.get("/posts/questions", getAllQuestions);
router.get("/posts/questions/:id", getSpecificQuestion);
router.put("/posts/questions/:id", updateQuestion);
router.delete("/posts/questions/:id", deleteQuestion);

// suggestion subtype
router.post("/posts/:postId/suggestion", createSuggestion);
router.get("/posts/suggestions", getAllSuggestions);
router.get("/posts/suggestions/:id", getSpecificSuggestion);
router.put("/posts/suggestions/:id", updateSuggestion);
router.delete("/posts/suggestions/:id", deleteSuggestion);

//message subtype
router.post("/posts/:postId/message", createMessage);
router.get("/posts/messages", getAllMessages);
router.get("/posts/messages/:id", getSpecificMessage);
router.put("/posts/messages/:id", updateMessage);
router.delete("/posts/messages/:id", deleteMessage);

// proposal subtype
router.post("/posts/:postId/proposal", upload.single('proposal'), createProposal);
router.get("/posts/proposals", getAllProposal);
router.get("/posts/proposals/:id", getSpecificProposal);
router.put("/posts/proposals/:id", updateProposal);
router.delete("/posts/proposals/:id", deleteProposal);

// poll subtype
router.post("/posts/:postId/poll", createPoll);
router.get("/posts/polls", getAllPolls);
router.get("/posts/polls/:id", getSpecificPoll);
router.put("/posts/polls/:id", updatePoll);
router.delete("/posts/polls/:id", deletePoll);

// event subtype
router.post("/posts/:postId/event", createEvent);
router.get("/posts/events", getAllEvents);
router.get("/posts/events/:id", getSpecificEvent);
router.put("/posts/events/:id", updateEvent);
router.delete("/posts/events/:id", deleteEvent);

export default router;
