import express from "express";
import userController from "../controllers/userController.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();
// OBTERNER
router.get("/:id",middleware.verifyToken,userController.byId);
router.get("/:id/friends",middleware.verifyToken,userController.getFriends);
// AACTUALIZAR
router.patch("/:id/friends",middleware.verifyToken,userController.addRemoveFriend);

export default router;