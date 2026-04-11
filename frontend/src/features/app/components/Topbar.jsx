import React, { useContext } from 'react'
import { Search } from 'lucide-react'
import { BiSolidBell } from "react-icons/bi";
import { AuthContext } from '../../auth/context/AuthContext'

const Topbar = () => {
  const context = useContext(AuthContext)
  const {user} = context
  return (
    <div className="bg-white border-b px-6 py-2 flex  items-center justify-end">
      <div className="flex items-center gap-4">
        <button className="bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg">
          + Add Job
        </button>
        <button>
          <BiSolidBell className='text-gray-600' size={22} />
        </button>
        <div className='border h-8'></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
          <img src={user.personalInfo.profileImage.url} className='object-cover w-full h-full' alt="" />
        </div>
        <h3 className='font-medium text-sm'>{user.username}</h3>
      </div>
    </div>
  )
}

export default Topbar
