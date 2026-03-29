const express = require('express');
const authController = require('../controllers/auth.controller');
const validate  = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/auth.validator');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register)
router.post('/verify-email', authController.verifyEmail)
router.post('/resend-otpmail', authController.resendOtp)
router.post('/login', validate(loginSchema), authController.login)

router.get('/refresh-token', authController.refreshAccessTokenController)
router.get('/logout', authController.logout)

router.post('/forgot-password', authController.forgotPasswordController)
router.post('/reset-password/:token', authController.resetPasswordController)

module.exports = router