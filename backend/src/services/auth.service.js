const authRepository = require('../repositories/user.repository')
const sessionRepository = require('../repositories/session.repository')
const { generateOtp, hashOtp } = require('../utils/generateOtp')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const emailService = require('../providers/sendMail')
const crypto = require('crypto')

const registerUser = async (data) => {
    const { name, email, password } = data

    const existing = await authRepository.findByEmail(email)

    const otp = generateOtp()
    const hashedOtp = hashOtp(otp) 
    const otpExpiry = Date.now() + 10 * 60 * 1000

    if(existing){

        if(existing.isVerified){
            const error = new Error("User already exists")
            error.statusCode = 400
            throw error
        }

        const updatedUser = await authRepository.updateUser(existing, {
            name,
            password,
            emailVerificationOtp: hashedOtp,
            emailVerificationOtpExpires: otpExpiry
        })

        await emailService.sendOtpEmail(email, otp)
        
        return updatedUser
    }

    const user = await authRepository.createUser({
        name, 
        email, 
        password,
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: otpExpiry
    })

    await emailService.sendOtpEmail(email, otp)

    return user
}

const verifyEmailOtp = async ({ email, otp }, req) => {

    const hashedOtp = hashOtp(otp)

    const user = await authRepository.findByEmailAndOtp(email, hashedOtp)
    if(!user){
        const error = new Error("Invalid or expired OTP")
        error.statusCode = 400
        throw error
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    await authRepository.updateUser(user, {
        isVerified: true,
        emailVerificationOtp: undefined,
        emailVerificationOtpExpires: undefined,
        refreshToken: refreshToken
    })

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    await sessionRepository.createSession({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    return {
        user,
        accessToken,
        refreshToken
    }
}

const resendEmailOtp = async (email) => {
    
    const user = await authRepository.findByEmail(email)

    if(!user){
        const error = new Error('User not found')
        error.statusCode = 400
        throw error
    }

    if(user.isVerified){
        throw new Error("User already verified")
    }

    const otp = generateOtp()
    const hashedOtp = hashOtp(otp)

    await authRepository.updateUser(user, {
        emailVerificationOtp: hashedOtp,
        emailVerificationOtpExpires: Date.now() + 10 * 60 * 1000
    })

    await emailService.sendOtpEmail(email, otp)
}

const forgotPassword = async (email) => {
    const user = await authRepository.findByEmail( email )

    if(!user){
        const error = new Error('User not found')
        error.statusCode = 400
        throw error
    }

    const resetToken = user.getPasswordResetToken()
    await authRepository.save(user, { validateBeforeSave: false })

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

    await emailService.sendForgotPasswordEmail(email, resetLink)
}

const resetPassrord = async (token, newPassword) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await authRepository.findByResetToken(hashedToken)

    if(!user){
        const error = new Error('Invalid or expired token')
        error.statusCode = 400
        throw error
    }
    
    await authRepository.updateUser(user, {
        password: newPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
    })

    await authRepository.save(user, { validateBeforeSave: false })
}

const refreshAccessToken = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const session = await sessionRepository.findSessionByRefreshTokenHash(refreshTokenHash)

        if(!session){
            const error = new Error('Invalid refresh token')
            error.statusCode = 401
            throw error
        }

        const user = await authRepository.findById(decoded.id)

        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user)

        const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex')

        await sessionRepository.updateSession(session, {
            refreshTokenHash: newRefreshTokenHash
        })

        return {
            newAccessToken,
            newRefreshToken
        }
    } catch (error) {
        throw error
    }
}

const loginUser = async (data, req) => {
    const { email, password } = data

    const user = await authRepository.findByEmailWithPassword(email)

    if(!user){
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        throw error
    }

    if(!user.isVerified){
        const otp = generateOtp()
        const hashedOtp = hashOtp(otp)

        await authRepository.updateUser(user, {
            emailVerificationOtp: hashedOtp,
            emailVerificationOtpExpires: Date.now() + 10 * 60 * 1000
        })

        await emailService.sendOtpEmail(user.email, otp)

        throw new Error("Email not verified. OTP sent again.")
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    await sessionRepository.createSession({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    return { user, accessToken, refreshToken }
}

const logoutUser = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    
    const session = await sessionRepository.findSessionByRefreshTokenHash(refreshTokenHash)

    if(!session){
        const error = new Error('Invalid refresh token')
        error.statusCode = 401
        throw error
    }

    await sessionRepository.updateSession(session, {
        revoked: true
    })

}

const logoutAllDevices = async (refreshToken) => {
    if(!refreshToken){
        const error = new Error('Refresh token not found')
        error.statusCode = 404
        throw error
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    await sessionRepository.revokeAllSessions(decoded.id)   
}


module.exports = { 
    registerUser,
    verifyEmailOtp,
    resendEmailOtp,
    refreshAccessToken,
    loginUser,
    forgotPassword,
    resetPassrord,
    logoutUser,
    logoutAllDevices
}