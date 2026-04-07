import React from 'react'
import { useJobDetails } from '../hooks/useJobDetails'
import { useParams } from 'react-router-dom'
import BreadCrums from '../components/BreadCrums'
import JobDetailsHeader from '../components/JobDetailsHeader'
import JobDetailsMain from '../components/JobDetailsMain'

const JobDetails = () => {
    const { jobId } = useParams()
    const { job, loading, error } = useJobDetails(jobId)
    console.log("Job details:", job)
  
    if(loading) return <p>Loading job details...</p>
    if(error) return <p className='text-red-500'>Error: {error}</p>

    if(!job) return <p className='text-gray-500'>No job details found.</p>

  return (
    <div className='space-y-6'>
      <BreadCrums items={[
        { label: 'Applications', link: '/jobs' },
        { label: 'Job Details' }
      ]} />

    <JobDetailsHeader job={job} />

      <div className="bg-white p-5 rounded-xl shadow-sm">
        <p className="text-sm text-gray-500 mb-2">Quick Summary</p>
          <p className="text-sm text-gray-700">
            {job.description?.slice(0, 150) || "No summary available..."}...
        </p>
      </div>

      <JobDetailsMain job={job} />

    </div>
  )
}

export default JobDetails