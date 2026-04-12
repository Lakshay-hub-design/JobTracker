import { useEffect, useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { generateAIReport, getJobDetails, updateJob } from "../service/jobsApi"

export const useJobDetails = (jobId) => {
    const [job, setJob] = useState(null)
    const [aiReport, setAIReport] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const axiosPrivate = useAxiosPrivate()

    const fetchJobDetails = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getJobDetails(axiosPrivate, jobId)
            setJob(data.job)
            setAIReport(data.aiReport)
        } catch (err) {
            setError(err.message || 'Failed to fetch job details')
        } finally {
            setLoading(false)   
        }
    }

    useEffect(() => {
        if (jobId) fetchJobDetails()
    }, [jobId])

    const triggerAIReport = async (formData = null) => {
        try {
            setLoading(true)
            setError(null)

            await generateAIReport(axiosPrivate, jobId, formData)
        } catch (err) {
            setError(err.message || 'Failed to fetch job details')
        } finally {
            setLoading(false)
        }
    }

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

    return { job, aiReport, loading, error, refetch: fetchJobDetails, triggerAIReport, handleUpdate }
}