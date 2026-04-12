import { createContext, useEffect, useState } from "react";
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

    const [notifications, setNotifications] = useState({})

    const axiosPrivate = useAxiosPrivate()

    const fetchNotifications = async() => {
        try {
            setError(null)
            const res = await getNotifications(axiosPrivate)
            console.log(res.data)
            setNotifications(res.data)
        } catch (err) {
            setError(err.message || 'Failed to fetch notifications')
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])


    return (
        <JobContext.Provider value={{ jobs, loading, error, page, status, search, pagination, notifications, setNotifications, setPagination, setJobs, setLoading, setError, setPage, setStatus, setSearch}}>
            {children}
        </JobContext.Provider>
    )
}