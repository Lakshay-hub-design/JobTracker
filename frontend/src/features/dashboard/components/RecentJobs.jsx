import { ArrowRight } from 'lucide-react'
import React from 'react'

const getStatusStyle = (status) => {
    switch(status){
        case 'interviewing':
            return 'bg-orange-400/20 text-orange-600'
        case 'offered':
            return 'bg-green-400/20 text-green-600'
        case 'applied':
            return 'bg-blue-400/20 text-blue-600'
        default:
            return 'bg-gray-400/20 text-gray-600'
    }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const RecentJobs = ({jobs}) => {
    if (!jobs || jobs.length === 0) {
        return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">No recent jobs found</p>
        </div>
        )
    }
  return (
    <div className='bg-white rounded-3xl p-5 shadow-md'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-lg font-semibold text-gray-800'>
            Recent Applications
        </h2>
        <button className='text-orange-600 font-medium hover:underline'>
            View All
        </button>
      </div>

      <div className='grid grid-cols-4 text-sm bg-gray-100 text-gray-500 px-4 py-2 border-b font-semibold'>
        <span>COMPANY</span>
        <span>POSITION</span>
        <span>STATUS</span>
        <span>APPLIED DATE</span>
      </div>

      <div className='mt-2'>
        {jobs.map((job, index) => (
            <div
            key={index}
            className='grid grid-cols-4 items-center px-4 py-2 hover:bg-gray-50 transition'
            >
                <div className='flex items-center gap-3'>
                    <img 
                        alt={job.company}
                        className='w-10 h-10 rounded-lg bg-black p-2'
                    />
                    <span className='font-medium capitalize text-gray-800'>
                        {job.company}
                    </span>
                </div>

                <div className='text-gray-700'>
                    {job.position}
                </div>

                <div>
                    <span className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${getStatusStyle(
                        job.status
                    )}`}>
                        {job.status}
                    </span>
                </div>

                <div className='text-gray-500 flex justify-between'>
                    {formatDate(job.appliedDate)}

                    <div className='text-gray-400 text-right text-lg'>
                        <ArrowRight />
                    </div>
                </div>

                
            </div>
        ))}
      </div>

    </div>
  )
}

export default RecentJobs
