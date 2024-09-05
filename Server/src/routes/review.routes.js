import express from "express";
import ReviewsRating from "../controllers/raview.controller.js";
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post("/create", authMiddleware, ReviewsRating.create);
router.delete("/remove/:id", authMiddleware, ReviewsRating.remove);
router.get("/get/:productId", ReviewsRating.getProductReviews);

export default router;