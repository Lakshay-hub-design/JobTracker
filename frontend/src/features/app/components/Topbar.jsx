import React from 'react'
import { Search } from 'lucide-react'

const Topbar = () => {
  return (
    <div className="bg-white border-b px-6 py-2 flex items-center justify-between">
      <div className='flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full w-xl'>
            <Search size={16} className="text-gray-500" />
            <input 
                type="text" 
                placeholder='Search applications...'
                className='bg-transparent outline-none text-sm ml-2 w-full'
            />
        </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
          + Add Job
        </button>

        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}

export default Topbar
