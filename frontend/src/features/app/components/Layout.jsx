import React from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>

        <Topbar />

        <main className='p-4 overflow-y-auto'>
            <Outlet />
        </main>
        
      </div>
    </div>
  )
}

export default Layout
