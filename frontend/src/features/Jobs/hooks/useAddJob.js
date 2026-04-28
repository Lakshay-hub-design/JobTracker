import { useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { useNavigate } from "react-router-dom"
import { addJob } from "../service/jobsApi"
import toast from "react-hot-toast"

export const useAddJob = (refetchDashboard) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const handleAddApplication = async (formData) => {
    const toastId = toast.loading("Adding job application...");
    try {
        setLoading(true)
        setError(null)
        
        await addJob(axiosPrivate, formData)

        if (refetchDashboard) {
          await refetchDashboard()
        }

        toast.success("Job successfully added 🎉", {
          id: toastId,
        });

        navigate('/jobs')
    } catch (err) {
        setError(err.message || "Failed to add job")
        toast.error("Failed to add job ❌", {
          id: toastId,
        });
    } finally{
        setLoading(false)
    }
  }

  return {
    handleAddApplication,
    loading,
    error
  }
}