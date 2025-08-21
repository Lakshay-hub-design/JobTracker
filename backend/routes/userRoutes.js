const express = require('express');
const { getUserProfile, updateUserProfile, profileUpload } = require('../controller/userController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth)

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/profile/image', authMiddleware, upload.single('profileImage'), profileUpload)


module.exports = router;