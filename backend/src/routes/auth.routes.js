const express = require('express');
const authController = require('../controllers/auth.controller');
const validate  = require('../middlewares/validate');
const { registerSchema } = require('../validations/auth.validator');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register)
router.post('/verify-email', authController.verifyEmail)
router.post('/resend-otpmail', authController.resendOtp)
router.post('/login', authController.login)

router.get('/refresh-token', authController.refreshAccessTokenController)
router.get('/logout', authController.logout)

// router.post('/forgot-password', authController.forgotPassword)
// router.post('/reset-password/:token', authController.resetPassword)

module.exports = router