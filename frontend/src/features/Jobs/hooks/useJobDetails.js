import { useContext, useEffect, useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { generateAIReport, getJobDetails, markFollowUpDone, updateJob } from "../service/jobsApi"
import {toast} from "react-hot-toast"
import { JobContext } from "../context/JobContext"

export const useJobDetails = (jobId) => {
    const [job, setJob] = useState(null)
    const [aiReport, setAIReport] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [aiLimitReached, setAILimitReached] = useState(false)
    const {
        syncFollowUpNotification,
        jobRefreshKey
    } = useContext(JobContext)

    const axiosPrivate = useAxiosPrivate()

    const fetchJobDetails = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await getJobDetails(axiosPrivate, jobId)
            setJob(data.job)
            setAIReport(data.aiReport)
            setAILimitReached(data.aiLimitReached)
        } catch (err) {
            setError(err.message || 'Failed to fetch job details')
        } finally {
            setLoading(false)   
        }
    }

    useEffect(() => {
        if (jobId) fetchJobDetails()
    }, [jobId, jobRefreshKey])

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

            const updatedJob = {
                ...job,
                ...updatedData
            }

            syncFollowUpNotification(updatedJob)

            await updateJob(axiosPrivate, jobId, updatedData)
           
            if (type === "status") {
                toast.success("Status Updated")
            } else if (type === "followup-updated") {
                toast.success("Follow-up rescheduled")
            } else if (type === "followup-added") {
                toast.success("Follow-up added")
            } else {
                toast.success("Job Application Updated")
            }
        } catch (err) {
            setError(err.message || 'Failed to update job')
        }
    }

    const handleMarkDone = async () => {

        try {

            const updatedJob = {
                ...job,
                isFollowUpDone: true
            }

            setJob(updatedJob)

            syncFollowUpNotification(updatedJob)

            await markFollowUpDone(
                axiosPrivate,
                jobId
            )

            toast.success(
                "Follow-up marked as done"
            )

        } catch (err) {

            setError(
                err.message ||
                "Failed to mark follow-up"
            )
        }
    }

    return { job, aiReport, loading, error, aiLimitReached, refetch: fetchJobDetails, triggerAIReport, handleUpdate, handleMarkDone }
}