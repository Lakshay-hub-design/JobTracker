import api from "../../../shared/api/axios"

export async function register({ name, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            name, email, password
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function verifyEmail({email, otp}) {
    try {
        const response = await api.post('/api/auth/verify-email', {
            email, otp
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function resendOtp( email ){
    try {
        await api.post('/api/auth/resend-otp',{
            email
        })
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })
        return response.data
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function forgotPassword(email) {
    try {
        await api.post('/api/auth/forgot-password', {
            email
        })
    
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function resetPassword(token, password) {
    try {
        await api.post(`/api/auth/reset-password/${token}`, {
            password
        })
    } catch (error) {
        throw error.response?.data || error
    }
}

export async function getMe(axiosPrivate) {
    
    try {
        const res = await axiosPrivate.get('/api/auth/get-me')

        return res.data 
    } catch (err) {
        console.log(err)
    }
}

export async function logout(axiosPrivate) {
    try {
        await axiosPrivate.get('/api/auth/logout')
    } catch (error) {
        throw error.response?.data || error
    }
}