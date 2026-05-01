import React, { useCallback, useState } from 'react'
import JobsHeader from '../components/JobsHeader'
import JobCards from '../components/JobCards'
import { useJobs } from '../hooks/useJob'
import JobsFooter from '../components/JobsFooter'
import DeleteModal from '../components/DeleteModal'

const JobsPage = () => {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState({
        status: "",
        jobType: ""
    })
    const [showModal, setShowModal] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState(null)

    const { jobs, search, setSearch, pagination, handleDelete, loading, error } = useJobs(page, filters)

    const openDeleteModal = useCallback((id) => {
        setSelectedJobId(id)
        setShowModal(true)
    }, [])

    if(loading) return <p>Loading jobs...</p>
    if(error) return <p className='text-red-500'>Error: {error}</p>

    const handleConfirmDelete = async () => {
        await handleDelete(selectedJobId)
        setShowModal(false)
    }

  return (
    <div className=''>

        <JobsHeader 
            jobs={jobs}
            filters={filters}
            setFilters={setFilters}
            search={search}
            setSearch={setSearch}
         />

        <div className='grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {jobs.map(job => (
                <JobCards 
                    key={job._id} 
                    job={job}
                    onDelete={openDeleteModal}
                />
            ))}
        </div>
            
        <JobsFooter 
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
        />

        <DeleteModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmDelete}
            loading={loading}
        />
    </div>
  )
}

export default JobsPage
