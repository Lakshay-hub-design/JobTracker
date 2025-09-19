const express = require('express');
const authController = require('../controller/auth.controller')

const router = express.Router();

router.post('/user/register', authController.userRegister)
router.post('/user/login', authController.userLogin)
router.get('/user/logout', authController.userLogout)

router.post('/user/forgot-password', authController.forgotPassword)
router.post('/user/reset-password/:token', authController.resetPassword)

module.exports = router