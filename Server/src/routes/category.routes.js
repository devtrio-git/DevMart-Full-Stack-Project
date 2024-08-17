import express from 'express';
import Catergories from '../controllers/category.controller.js';
import upload from '../middleware/multer-middleware.js';
import { authMiddleware, checkAdminMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

router.post("/create", authMiddleware , checkAdminMiddleware ,upload.single("image") , Catergories.create);
router.get("/all", Catergories.getAll);
router.delete("/:id", authMiddleware, checkAdminMiddleware, Catergories.deleteOne )

export default router