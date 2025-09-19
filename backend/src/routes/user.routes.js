const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/user-info', authMiddleware, userController.updateUserProfile)
router.post('/image', authMiddleware, upload.single("profileImage"),  userController.imageUpload)
router.get('/me', authMiddleware, userController.getImage);

module.exports = router