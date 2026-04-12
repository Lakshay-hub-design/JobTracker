import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  LogOutIcon,
  Plus,
} from "lucide-react";
import { useAuth } from '../../auth/hooks/useAuth';

const sidebarMenu = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Applications",
        icon: BriefcaseBusiness,
        path: "/jobs",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

const Sidebar = () => {

    const location = useLocation()
    const { handleLogout } = useAuth()
    
  return (
    <div className='w-64 bg-gray-100 border-r border-orange-300 p-5 flex flex-col justify-between'>
      <div>
        <h1 className='text-xl font-bold text-orange-600 mb-10'>
            JobTracker
        </h1>

        <nav className='space-y-3'>
            {sidebarMenu.map((item, index) => {
                const Icon = item.icon

                return (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({isActive}) => {
                            const path = location.pathname
                            let active = isActive

                            if (item.path === "/jobs") {
                            active = path === "/jobs" || path.startsWith("/job")
                            }
                            return `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 font-semibold transition
                                ${
                                    active
                                    ? 'bg-white text-orange-600 backdrop-blur-2xl font-bold shadow-sm'
                                    : 'hover:bg-orange-100'
                                }
                            `
                        }}
                    >
                        <Icon size={18} />
                        <span className='text-sm'>{item.name}</span>
                    </NavLink>
                )
            })}
        </nav>
      </div>

      <button className='text-red-500 flex items-center gap-3 cursor-pointer hover:text-red-700' onClick={handleLogout}>
        <LogOutIcon  size={18}/>
        <span>Logout</span>
        </button>
    </div>
  )
}

export default Sidebar
