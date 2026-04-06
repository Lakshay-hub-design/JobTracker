import React from 'react'

const JobsHeader = () => {
  return (
    <div className='flex justify-between items-center mb-8'>
      <div>
        <h2 className='text-3xl font-bold'>My Jobs</h2>
        <p className='text-gray-700 mt-2'>You have <span className='text-orange-700 font-semibold'>10 active applications</span> in your pipeline.</p>
      </div>
      <div className='flex gap-3'>
        <select className='px-4 py-2 rounded-full bg-orange-100/40 text-sm shadow-sm'>
            <option value="">Status: All</option>
            <option value="">Status: Applied</option>
            <option value="">Status: Interview</option>
            <option value="">Status: Offer</option>
            <option value="">Status: Rejected</option>
        </select>
        <select className="px-4 py-2 rounded-full bg-orange-100/40 text-sm shadow-sm">
          <option>Type: Full-time</option>
          <option>Type: Part-time</option>
          <option>Type: Remote</option>
        </select>
      </div>
    </div>
  )
}

export default JobsHeader
