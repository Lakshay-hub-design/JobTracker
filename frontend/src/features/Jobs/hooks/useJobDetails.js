import { useEffect, useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { generateAIReport, getJobDetails, updateJob } from "../service/jobsApi"
import {toast} from "react-hot-toast"

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
            setError(null)

            await generateAIReport(axiosPrivate, jobId, formData)
            toast.success('AI report generation started. It may take a few moments.')
        } catch (err) {
            if(err.response.status === 403){
                toast.error('Daily AI report generation limit reached. Please try again tomorrow.')
            } else {
                toast.error('Failed to generate AI report. Please try again.')
            }
            setError(err.message || 'Failed to generate AI report')
        }
    }

    const handleUpdate = async (updatedData, type) => {
        try {
            setError(null)
            setJob(prev => {
                const updated = {
                    ...prev,
                    ...updatedData
                }


                return updated
            })

            await updateJob(axiosPrivate, jobId, updatedData)
           
            if (type === "status") {
                toast.success("Status Updated")
            } else if (type === "followup") {
                toast.success("Follow-up rescheduled")
            } else {
                toast.success("Job Application Updated")
            }
        } catch (err) {
            setError(err.message || 'Failed to update job')
        }
    }

    return { job, aiReport, loading, error, refetch: fetchJobDetails, triggerAIReport, handleUpdate }
}