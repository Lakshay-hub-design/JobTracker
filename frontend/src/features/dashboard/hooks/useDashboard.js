import { useContext } from "react"
import { DashboardContext } from "../context/DashboardContext"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { getDashboardStats } from "../services/dashBoardApi"
import { useEffect } from "react"
import { AppLoadingContext } from "../../../app/providers/AppLoadingContext"

export const useDashboard = () => {
    
    const context = useContext(DashboardContext)
    const { dashboardData, loading, error, setDashboardData, setLoading, setError } = context

    const axiosPrivate = useAxiosPrivate()

    const fetchDashboardData = async () => {
        try {
            setLoading(true)

            setError(null)

            const data = await getDashboardStats(axiosPrivate)
            setDashboardData(data)
        } catch (err) {
            setError(err.message || 'Failed to load dashboard')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!dashboardData) {
            fetchDashboardData()
        } 
    }, [])
    
    return {
        dashboardData, loading, error, refetch: fetchDashboardData
    }
}