import { useContext } from "react"
import { DashboardContext } from "../context/DashboardContext"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { getDashboardStats } from "../services/dashBoardApi"
import { useEffect } from "react"
import { AppLoadingContext } from "../../app/context/AppLoadingContext"

export const useDashboard = () => {
    
    const context = useContext(DashboardContext)
    const { dashboardData, loading, error, setDashboardData, setLoading, setError } = context

    const { setLoading: setAppLoading, setProgress, progress } =
    useContext(AppLoadingContext);

    console.log(progress)
const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const axiosPrivate = useAxiosPrivate()

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)

            setProgress(80)
            await delay(200)


            setProgress(100)
            const data = await getDashboardStats(axiosPrivate)
            setDashboardData(data)

        } catch (err) {
            setError(err.message || 'Failed to load dashboard')
        } finally {
            setLoading(false)
            setTimeout(() => {
                setAppLoading(false);
            }, 300);
        }
    }

    useEffect(() => {
        if (!dashboardData) {
            fetchDashboardData();
        } else {
            setAppLoading(false)
        }
    }, [])
    
    return {
        dashboardData, loading, error, refetch: fetchDashboardData
    }
}