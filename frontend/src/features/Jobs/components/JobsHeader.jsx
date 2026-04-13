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
        <p className='text-gray-700 dark:text-[#9B837C] mt-2'>You have <span className='text-orange-700 font-semibold'>{jobs.length} active applications</span> in your pipeline.</p>
      </div>
      <div className='flex gap-3'>
        <select
        id='status'
        value={filters.status}
        onChange={handleChange}
        className='px-4 py-2 rounded-full bg-orange-100/40 text-sm shadow-sm checked:bg-orange-500'>
            <option className="dark:bg-[#585454] dark:text-white" value="">Status: All</option>
            <option className="dark:bg-[#585454] dark:text-white" value="applied">Status: Applied</option>
            <option className="dark:bg-[#585454] dark:text-white" value="interviewing">Status: Interviewing</option>
            <option className="dark:bg-[#585454] dark:text-white" value="offered">Status: Offered</option>
            <option className="dark:bg-[#585454] dark:text-white" value="rejected">Status: Rejected</option>
        </select>
        <select
        id='jobType'
        value={filters.jobType}
        onChange={handleChange}
        className="px-4 py-2 rounded-full bg-orange-100/40 text-sm shadow-sm">
          <option className="dark:bg-[#585454] dark:text-white" value="">Type: All</option>
          <option className="dark:bg-[#585454] dark:text-white" value='full-time'>Type: Full-time</option>
          <option className="dark:bg-[#585454] dark:text-white" value='part-time'>Type: Part-time</option>
          <option className="dark:bg-[#585454] dark:text-white" value='internship'>Type: Internship</option>
        </select>
      </div>
    </div>
  )
}

export default JobsHeader
