const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller')

const upload = require('../middlewares/file.middleware')
const router = express.Router()

router.get('/profile', authMiddleware, upload.single('profileImage'), userController.getProfile)
router.patch('/profile', authMiddleware, userController.updateProfile)
router.get('/stats', authMiddleware, userController.getStats)
router.post('/change-password', authMiddleware, userController.changePassword)

module.exports = router