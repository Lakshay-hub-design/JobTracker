const express = require('express');
const router = express.Router();

const {register, login, forgotPasswordJWT, resetPasswordJWT} = require('../controller/authController')

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPasswordJWT);

router.post("/reset-password/:token", resetPasswordJWT);

module.exports = router;