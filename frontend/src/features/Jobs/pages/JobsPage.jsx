import React from 'react'
import JobsHeader from '../components/JobsHeader'
import JobCards from '../components/JobCards'
import { useJobs } from '../hooks/useJob'

const JobsPage = () => {
    const { jobs, loading, error } = useJobs()

    if(loading) return <p>Loading jobs...</p>
    if(error) return <p className='text-red-500'>Error: {error}</p>

  return (
    <div className='h'>

        <JobsHeader jobs={jobs} />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {jobs.map(job => (
                <JobCards key={job._id} job={job } />
            ))}
        </div>
      
    </div>
  )
}

export default JobsPage
