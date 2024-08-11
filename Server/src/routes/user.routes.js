import express from 'express';
import Users from '../controllers/user.controller.js';

const router = express.Router();

router.post("/signup", Users.signup);
router.post("/login", Users.login)

export default router