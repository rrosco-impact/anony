import express from "express";
const router = express.Router();
import {register, login} from "../../controllers/auth/authController.js"

router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out" });
});
export default router;