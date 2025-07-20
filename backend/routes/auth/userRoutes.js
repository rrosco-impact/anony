import express from "express";
const router = express.Router();
import verifyToken from '../../middlewares/authMiddleware.js'
import authorizedRoles from '../../middlewares/roleMiddleware.js'
// Admin Routes
router.get("/admin", verifyToken, authorizedRoles("admin"), (req, res) => {
   res.json({message: "Welcome Admin"}) 
}); 

// Team Owner Routes
router.get("/owner", verifyToken, authorizedRoles("team_owner"),(req, res) => {
   res.json({message: "Welcome Team Owner"}) 
}); 

// Member Routes
router.get("/member", verifyToken, authorizedRoles("team_owner", "member"), (req, res) => {
   res.json({message: "Welcome Member"}) 
}); 

// Get current user
router.get("/me", verifyToken, (req, res) => {
    res.json({ user: req.user }); // This will include id and user_type
});


export default router;