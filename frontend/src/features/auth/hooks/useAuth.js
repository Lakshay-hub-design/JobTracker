import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { forgotPassword, getMe, login, logout, register, resendOtp, resetPassword, verifyEmail } from "../services/authApi"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { AppLoadingContext } from "../../../app/providers/AppLoadingContext"


export const useAuth = () => {

    const context = useContext(AuthContext)

    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const { user, setUser, accessToken, setAccessToken, loading, setLoading, error, setError } = context

    const handleRegister = async({name, email, password}) => {
        try {
            setLoading(true)
            setError(null)

            const data = await register({name, email, password})

            setUser(data.user)
            navigate('/user/verify-email', {
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
            setLoading(true)
            setError(null)

            const data = await verifyEmail({ email, otp }) 
            setAccessToken(data.accessToken)
            setUser(data.user)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async(email) => {
        try {
            setLoading(true)
            setError(null)

            await resendOtp(email)

        } catch (err) {
            setError(err.message || 'something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async({email, password}) => {

        try {
            setLoading(true)
            setError(null)

            const data = await login({email, password})
            setAccessToken(data.accessToken)
            setUser(data.user)

            navigate('/dashboard')

        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = async(email) => {
        try {
            setLoading(true)
            setError(null)

            await forgotPassword(email)
            return { success: true }
        } catch (err) {
            const message = err.message || 'Something went wrong'
            setError(message)
            return { success: false, error: message }
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async(token, password) => {
        try {
            setLoading(true)
            setError(null)

            await resetPassword(token, password)
            navigate('/user/login')
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async() => {
        try {
            setLoading(true)
            setError(null)
            await logout(axiosPrivate)
            setUser(null)
            setAccessToken(null)
            navigate('/user/login')
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(!accessToken) return;
      const getAndSetUser = async () => {
        try {
            const data = await getMe(axiosPrivate)
            
            setUser(data.user)
        } catch (error) {
            console.log("Error fetching user data:", error)
        }
      }

      getAndSetUser()
    }, [accessToken])
    

    return { user, loading, error, handleRegister, handleVerifyEmail, handleResendOtp, handleLogin, handleLogout, handleForgotPassword, handleResetPassword }
}