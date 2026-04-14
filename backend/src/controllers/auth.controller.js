const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/user.model");
const { registerUser, verifyEmailOtp, loginUser, resendEmailOtp, refreshAccessToken, logoutUser, forgotPassword, resetPassrord, logoutAllDevices } = require("../services/auth.service")

const register = asyncHandler(async (req, res, next) => {
    await registerUser(req.body)

    res.status(201).json({
        success: true,
        message: "User registered successfully",
    });
})

const verifyEmail = asyncHandler(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await verifyEmailOtp(req.body, req)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
    });

    res.status(200).json({
        success: true,
        message: "Email verified successfully",
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })
})

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body

    await resendEmailOtp(email)

    res.status(200).json({
        success: true,
        message: 'OTP sent succesfully'
    })
})

const refreshAccessTokenController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    const { newAccessToken, newRefreshToken } = await refreshAccessToken(refreshToken)

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
})

const login = asyncHandler(async (req, res, next) => {
    const { user, accessToken, refreshToken } = await loginUser(req.body, req)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })

    res.status(200).json({
        success: true,
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
})

const forgotPasswordController = asyncHandler(async (req, res) => {

    const { email } = req.body

    await forgotPassword(email)

    res.status(200).json({
        success: true,
        message: "Password reset link sent to your email"
    })
})

const resetPasswordController = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    await resetPassrord(token, password)

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
})

const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

const logout = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    await logoutUser(refreshToken)

    res.clearCookie('refreshToken')

    res.status(200).json({ 
        success: true,
        message: "Logged out successfully" 
    })
})

const logoutAll = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken

    await logoutAllDevices(refreshToken)

    res.clearCookie('refreshToken')

    res.status(200).json({
        success: true,
        message: "Logged out from all devices successfully"
    })
})


module.exports = {
    register,
    verifyEmail,
    resendOtp,
    refreshAccessTokenController,
    login,
    forgotPasswordController,
    resetPasswordController,
    getMe,
    logout,
    logoutAll
}