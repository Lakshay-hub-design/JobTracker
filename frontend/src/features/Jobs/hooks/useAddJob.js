import { useState } from "react"
import useAxiosPrivate from "../../../shared/api/axiosPrivate"
import { useNavigate } from "react-router-dom"
import { addJob } from "../service/jobsApi"

export const useAddJob = (refetchDashboard) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const handleAddApplication = async (formData) => {
    try {
        setLoading(true)
        setError(null)
        
        await addJob(axiosPrivate, formData)

        if (refetchDashboard) {
          await refetchDashboard()
        }

        navigate('/jobs')
    } catch (err) {
        setError(err.message || "Failed to add job")
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