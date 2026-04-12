import React from 'react'

const JobsFooter = ({ currentPage, totalPages, onPageChange }) => {
 if (totalPages <= 1) return null
  return (
    <div className='flex items-center justify-center gap-2 mt-6'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md border disabled:opacity-50"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === page
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default JobsFooter
