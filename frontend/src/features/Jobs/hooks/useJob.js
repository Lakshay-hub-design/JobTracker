import { useContext, useEffect, useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { deleteJob, getJobs } from "../service/jobsApi"
import { JobContext } from "../context/JobContext"
import { toast } from "react-hot-toast"

export const useJobs = (page, filters) => {
    const context = useContext(JobContext)
    const { jobs, setJobs, loading, pagination, setPagination, setLoading, error, setError, status, setStatus, search, setSearch } = context
    const [debouncedSearch, setDebouncedSearch] = useState(search)

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)

        return () => clearTimeout(timer)
    }, [search])

    const fetchJobs = async () => {
        try {
            setLoading(true)
            setError(null)

            const res = await getJobs(axiosPrivate, {
                page,
                status: filters.status,
                jobType: filters.jobType,
                search: debouncedSearch
            })
            setJobs(res.data.jobs)
            setPagination(res.data.pagination)

        } catch (err) {
            setError(err.message || 'Failed to fetch jobs')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [page, filters, debouncedSearch])

    const handleDelete = async (jobId) => {
        try {
            setLoading(true)
            setError(null)

            await deleteJob(axiosPrivate, jobId)

            setJobs(prev => prev.filter(job => job._id !== jobId))
            toast.success('Job Succesfully Deleted')

        } catch (err) {
            setError(err.message || 'Failed to delete job')
            toast.error('Failed to delete job')
        } finally {
            setLoading(false)
        }
    }


    return {
        jobs, loading, error, pagination, status, setStatus, search, setSearch, refetch: fetchJobs, handleDelete, 
    }
}