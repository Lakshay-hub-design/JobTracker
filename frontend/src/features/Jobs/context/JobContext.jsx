import { createContext, useEffect, useState, useMemo } from "react";
import useAxiosPrivate from "../../../shared/api/axiosPrivate";
import { getNotifications } from "../service/jobsApi";

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [page, setPage] = useState(1)

    const [pagination, setPagination] = useState({})

    const [status, setStatus] = useState("")
    const [search, setSearch] = useState("")

    const [notifications, setNotifications] = useState([])
    const [jobRefreshKey, setJobRefreshKey] = useState(0)

    const axiosPrivate = useAxiosPrivate()

    const triggerJobRefresh = () => {
        setJobRefreshKey(prev => prev + 1)
    }

    const fetchNotifications = async() => {
        try {
            setError(null)
            const res = await getNotifications(axiosPrivate)
            setNotifications(res.data)
        } catch (err) {
            setError(err.message || 'Failed to fetch notifications')
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    

    const getNotificationType = (dateString) => {

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const date = new Date(dateString)
        date.setHours(0, 0, 0, 0)

        const diff = Math.ceil(
            (date - today) / (1000 * 60 * 60 * 24)
        )

        return diff < 0 ? "overdue" : "upcoming"
    }

    const syncFollowUpNotification = (job) => {

        setNotifications(prev => {

            // remove notification
            if (
                job.isFollowUpDone ||
                !job.followUpDate
            ) {
                return prev.filter(
                    item => item.jobId !== job._id
                )
            }

            const exists = prev.some(
                item => item.jobId === job._id
            )

            // update existing
            if (exists) {
                return prev.map(item =>
                    item.jobId === job._id
                        ? {
                            ...item,
                            followUpDate: job.followUpDate,
                            type: getNotificationType(
                                job.followUpDate
                            )
                        }
                        : item
                )
            }

            // add new
            return [
                ...prev,
                {
                    _id: job._id,
                    jobId: job._id,
                    company: job.company,
                    position: job.position,
                    followUpDate: job.followUpDate,
                    type: getNotificationType(
                        job.followUpDate
                    )
                }
            ]
        })
    }

    const markNotificationDoneLocal = (jobId) => {

        setNotifications(prev =>
            prev.filter(
                item => item.jobId !== jobId
            )
        )
    }

    const value = useMemo(() => ({
        jobs,
        loading,
        error,
        page,
        status,
        search,
        pagination,
        notifications,
        jobRefreshKey,
        triggerJobRefresh,
        setNotifications,
        syncFollowUpNotification,
        markNotificationDoneLocal,
        setPagination,
        setJobs,
        setLoading,
        setError,
        setPage,
        setStatus,
        setSearch
    }), [
        jobs,
        loading,
        error,
        page,
        status,
        search,
        pagination,
        notifications,
        jobRefreshKey
    ])


    return (
        <JobContext.Provider value={value}>
            {children}
        </JobContext.Provider>
    )
}