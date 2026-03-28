import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { login, register, resendOtp, verifyEmail } from "../services/authApi"
import { useNavigate } from "react-router-dom"


export const useAuth = () => {
    const context = useContext(AuthContext)
    const navigate = useNavigate()

    const { user, setUser, loading, setLoading, error, setError } = context

    const handleRegister = async({name, email, password}) => {
        try {
            setLoading(true)
            setError(null)

            const data = await register({name, email, password})

            setUser(data.user)
            navigate('/verify-email', {
                state: {email: email}
            })
        } catch (err) {
            setError(err.message || 'Something went worng')
        } finally{
            setLoading(false)
        }
    }

    const handleVerifyEmail = async({ email, otp }) => {
        try {
            setLoading(false)
            setError(null)

            await verifyEmail({ email, otp }) 

            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async(email) => {
        try {
            setLoading(false)
            setError(null)

            await resendOtp(email)

        } catch (err) {
            setError(err.message || 'something went wrong')
        } finally {
            setLoading(true)
        }
    }

    const handleLogin = async({email, password}) => {
        try {
            setLoading(true)
            setError(null)

            const data = await login({email, password})
            setUser(data.user)

            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, error, handleRegister, handleVerifyEmail, handleResendOtp, handleLogin }
}