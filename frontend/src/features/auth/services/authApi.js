import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

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
        await api.post('/api/v1/auth/resend-otp',{
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

export async function logout() {
    try {
        await api.post('/api/auth/logout')
    } catch (error) {
        throw error.response?.data || error
    }
}

