import React, { useEffect, useState } from 'react'
import { useJobDetails } from '../hooks/useJobDetails'
import { useNavigate, useParams } from 'react-router-dom'
import BreadCrums from '../components/BreadCrums'
import JobDetailsHeader from '../components/JobDetailsHeader'
import JobDetailsMain from '../components/JobDetailsMain'

const JobDetails = () => {
  const [showAIModal, setShowAIModal] = useState(false)
  const [modalData, setModalData] = useState({
    description: "",
  })

  const [modalFile, setModalFile] = useState(null)

  const navigate = useNavigate()
  const { jobId } = useParams()
  const { job, aiReport, triggerAIReport, refetch, loading, error } = useJobDetails(jobId)

  useEffect(() => {
    if (aiReport?.status !== "pending") return

    const interval = setInterval(() => {
      refetch()
    }, 4000)

    return () => clearInterval(interval)
  }, [aiReport?.status])

  
    if(loading) return <p>Loading job details...</p>
    if(error) return <p className='text-red-500'>Error: {error}</p>

    if(!job) return <p className='text-gray-500'>No job details found.</p>

  const handleAIAction = async () => {

    if (!job.description || !job.resume?.url) {
      setShowAIModal(true)
      return
    }

    if (aiReport?.status === "pending") return

    try {
      if (aiReport?.status === "failed") {
        await triggerAIReport()
        await refetch()
        return
      }

      if (!aiReport || aiReport?.status === "not_ready") {
        await triggerAIReport()
        await refetch()
        return
      }

      if (aiReport?.status === "completed") {
        navigate(`/job/${job._id}/report`)
      }
    } catch (err) {
      console.error(err.mesaage)
    }

  }

  const handleModalChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.name]: e.target.value
    })
  }

  const handleModalFile = (e) => {
    setModalFile(e.target.files[0])
  }

  const handleGenerateFromModal = async () => {
    try {
      const form = new FormData()

      if (modalData.description) {
        form.append("description", modalData.description)
      }

      if (modalFile) {
        form.append("resume", modalFile)
      }

      await triggerAIReport(form)
      await refetch()

      setShowAIModal(false)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <BreadCrums
        items={[
          { label: "Applications", link: "/jobs" },
          { label: "Job Details" },
        ]}
      />

      <JobDetailsHeader
        job={job}
        aiReport={aiReport}
        onAIAction={handleAIAction}
      />

      <div className="bg-white p-5 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500 mb-2">Quick Summary</p>
        <p className="text-sm text-gray-700">
          {job.description?.slice(0, 150) || "No summary available..."}...
        </p>
      </div>

      <JobDetailsMain job={job} />

      {showAIModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[450px] shadow-lg">

            <h3 className="text-lg font-semibold mb-3">
              🤖 Generate AI Report
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Add missing details to generate AI insights
            </p>

            {/* Description */}
            {!job.description && (
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <textarea
                  name="description"
                  value={modalData.description}
                  onChange={handleModalChange}
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  placeholder="Paste job description..."
                />
              </div>
            )}

            {/* Resume Upload */}
            {!job.resume?.url && (
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700">
                  Upload Resume
                </label>

                <input
                  type="file"
                  onChange={handleModalFile}
                  className="mt-2 text-sm"
                />

                {modalFile && (
                  <p className="text-sm text-green-600 mt-1">
                    {modalFile.name}
                  </p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setShowAIModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleGenerateFromModal}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg"
              >
                Generate Report
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetails