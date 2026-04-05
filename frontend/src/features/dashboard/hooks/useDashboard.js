import { useContext } from "react"
import { DashboardContext } from "../context/DashBoardContext"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { getDashboardStats } from "../services/dashBoardApi"
import { useEffect } from "react"

export const useDashboard = () => {
    const { dashboardData, loading, error, setDashboardData, setLoading, setError } = useContext(DashboardContext)
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
        console.log("Fetching dashboard data on mount...")
      fetchDashboardData()
    }, [])
    
    return {
        dashboardData, loading, error, refetch: fetchDashboardData
    }
}