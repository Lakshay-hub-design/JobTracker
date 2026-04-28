import { useContext, useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { changePassword, getProfile, getStats, logoutAllDevices, updateProfile } from "../services/profileApi"
import { useEffect } from "react"
import { AuthContext } from "../../auth/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

export const useProfile = () => {
    const axiosPrivate = useAxiosPrivate()

    const [profile, setProfile] = useState(null)
    const [stats, setStats] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const context = useContext(AuthContext)
    const { setUser, setAccessToken } = context

    const navigate = useNavigate()

    const fetchProfile = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getProfile(axiosPrivate)
            setProfile(data)
            
        } catch (err) {
            setError(err.message || "Failed to fetch profile")
        } finally{
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            const data = await getStats(axiosPrivate)
            setStats(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProfile()
        fetchStats()
    }, [])

    const handleUpdateProfile = async (data, file) => {
        try {
            setError(null)

            const updated = await updateProfile(axiosPrivate, data, file)

            setProfile(updated) 
            toast.success('Profile Updated Succesfully')

        } catch (err) {
            setError(err.message || "Failed to update profile")
            toast.error('Failed to update profile')
        }
    }

    const handleChangePassword = async (data) => {
        try {
            setLoading(true)
            setError(null)

            await changePassword(axiosPrivate, data)
            toast.success('Password Updated Succesfully')
            return { success: true }

        } catch (err) {
            const message = err.message || "Failed to change password"
            setError(message)
            toast.error('Failed to change password')
            return { success: false, error: message }
        } finally {
            setLoading(false)
        }
    }

    const handleLogoutAll = async () => {
        try {
            setLoading(true)
            setError(null)
            
            await logoutAllDevices(axiosPrivate)
            
            setUser(null)
            setAccessToken(null)
            navigate('/user/login')
            
        } catch (err) {
            setError(err.message || "Failed to logout from all devices")
        } finally {
            setLoading(false)
        }
    }

    return { profile, stats, loading, error, fetchProfile, handleUpdateProfile, handleChangePassword, handleLogoutAll }
}