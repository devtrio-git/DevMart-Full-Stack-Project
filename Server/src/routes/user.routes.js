import express from 'express';
import Users from '../controllers/user.controller.js';

const router = express.Router();

router.post("/signup", Users.signup);
router.post("/login", Users.login);
router.post("/forgot-password", Users.forgotPassword);
router.post("/verify-otp", Users.verifyOtp);
router.post("/reset-password", Users.resetPassword);

export default router