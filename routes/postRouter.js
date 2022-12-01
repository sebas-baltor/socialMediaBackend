import express from "express";
import postController from "../controllers/postController.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();
// LEER
router.get("/",middleware.verifyToken,postController.getFeed);
router.get("/:userId/posts",middleware.verifyToken,postController.getByUserId);
// ACTUALIZAR
router.patch("/:id/like",middleware.verifyToken,postController.like);

export default router;