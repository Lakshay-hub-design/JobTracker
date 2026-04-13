const asyncHandler = require("../middlewares/asyncHandler");
const { getProfileService, updateProfileService, getStatsService, changePasswordService, updateThemeService } = require("../services/user.service");

const getProfile = asyncHandler(async( req, res) => {
    const profile = await getProfileService(req.user.id)
    
    res.status(200).json({
        success: true,
        message: 'Profile fetched succesfully',
        data: profile
    })
})

const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const body = req.body
    const file = req.file

    const updatedUser = await updateProfileService(userId, body, file)

    res.status(200).json({
        success: true,
        message: 'Profile updated succesfully',
        data: updatedUser
    })
})

const getStats = asyncHandler(async (req, res) => {
    const stats = await getStatsService(req.user.id)

    res.status(200).json({
        success: true,
        message: 'Stats fetched succesfully',
        data: stats
    })
})

const changePassword = asyncHandler(async(req, res) => {
    const userId = req.user.id
    const body = req.body

    await changePasswordService(userId, body)

    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    })
})

const updateTheme = asyncHandler(async(req, res) => {
    const theme = await updateThemeService(
        req.user.id,
        req.body
    )

    res.status(200).json({
        success: true,
        theme
    })
})

module.exports = {
    getProfile,
    updateProfile,
    getStats,
    changePassword,
    updateTheme
}