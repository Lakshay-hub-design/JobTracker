import { useEffect, useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { getJobDetails, updateJob } from "../service/jobsApi"

export const useJobDetails = (jobId) => {
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const axiosPrivate = useAxiosPrivate()

    const fetchJobDetails = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getJobDetails(axiosPrivate, jobId)
            
            setJob(data)
        } catch (err) {
            setError(err.message || 'Failed to fetch job details')
        } finally {
            setLoading(false)   
        }
    }

    useEffect(() => {
        if (jobId) fetchJobDetails()
    }, [jobId])

    const handleUpdate = async (updatedData) => {
        try {
            setLoading(true)
            setError(null)

            await updateJob(axiosPrivate, jobId, updatedData)
            fetchJobDetails()
        } catch (err) {
            setError(err.message || 'Failed to update job')
        } finally {
            setLoading(false)
        }
    }

    return { job, loading, error, refetch: fetchJobDetails, handleUpdate }
}