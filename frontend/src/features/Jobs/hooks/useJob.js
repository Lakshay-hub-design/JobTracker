import { useContext, useEffect } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { deleteJob, getJobs } from "../service/jobsApi"
import { JobContext } from "../context/JobContext"

export const useJobs = () => {
    const context = useContext(JobContext)
    const { jobs, setJobs, loading, setLoading, error, setError, page, setPage, totalPages, setTotalPages, status, setStatus, search, setSearch } = context

    const axiosPrivate = useAxiosPrivate()

    const fetchJobs = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getJobs(axiosPrivate, {
                page,
                status,
                search
            })
            console.log("Fetched jobs data:", data)
            setJobs(data.jobs)
            setTotalPages(data.totalPages)

        } catch (err) {
            setError(err.message || 'Failed to fetch jobs')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [page, status, search])

    useEffect(() => {
        setPage(1)
    }, [status, search])

    const handleDelete = async (jobId) => {
        try {
            setLoading(true)
            setError(null)

            await deleteJob(axiosPrivate, jobId)
            fetchJobs()

        } catch (err) {
            setError(err.message || 'Failed to delete job')
        } finally {
            setLoading(false)
        }
    }

    return {
        jobs, loading, error, page, totalPages, status, setStatus, search, setSearch, refetch: fetchJobs, handleDelete
    }
}