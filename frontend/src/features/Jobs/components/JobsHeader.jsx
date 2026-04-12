const JobsHeader = ({jobs, filters, setFilters}) => {


  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <h2 className='text-3xl font-bold'>My Jobs</h2>
        <p className='text-gray-700 mt-2'>You have <span className='text-orange-700 font-semibold'>{jobs.length} active applications</span> in your pipeline.</p>
      </div>
      <div className='flex gap-3'>
        <select
        id='status'
        value={filters.status}
        onChange={handleChange}
        className='px-4 py-2 rounded-full bg-orange-100/40 text-sm shadow-sm'>
            <option value="">Status: All</option>
            <option value="applied">Status: Applied</option>
            <option value="interviewing">Status: Interviewing</option>
            <option value="offered">Status: Offered</option>
            <option value="rejected">Status: Rejected</option>
        </select>
        <select
        id='jobType'
        value={filters.jobType}
        onChange={handleChange}
        className="px-4 py-2 rounded-full bg-orange-100/40 text-sm shadow-sm">
          <option value="">Type: All</option>
          <option value='full-time'>Type: Full-time</option>
          <option value='part-time'>Type: Part-time</option>
          <option value='internship'>Type: Internship</option>
        </select>
      </div>
    </div>
  )
}

export default JobsHeader
