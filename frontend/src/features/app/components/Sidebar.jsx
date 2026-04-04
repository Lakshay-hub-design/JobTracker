import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  LogOutIcon,
  Plus,
} from "lucide-react";

const sidebarMenu = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Jobs",
        icon: BriefcaseBusiness,
        path: "/jobs",
    },
    {
        name: "Analytics",
        icon: ChartNoAxesCombined,
        path: "/analytics",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

const Sidebar = () => {
    
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
                        className={({isActive}) => 
                            `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 font-semibold transition
                                ${
                                    isActive
                                    ? 'bg-white text-orange-600 backdrop-blur-2xl font-bold shadow-sm'
                                    : 'hover:bg-orange-100'
                                }
                            `
                        }
                    >
                        <Icon size={18} />
                        <span className='text-sm'>{item.name}</span>
                    </NavLink>
                )
            })}
        </nav>
        <button className='mt-6 w-full bg-orange-700 text-white px-4 py-3 rounded-full flex justify-center gap-2 shadow-lg hover:bg-orange-600 transition active:scale-95'>
            <Plus size={18} />
            <span className='text-sm'>Add New Job</span>
        </button>
      </div>

      <button className='text-red-500 flex items-center gap-3'>
        <LogOutIcon  size={18}/>
        <span>Logout</span>
        </button>
    </div>
  )
}

export default Sidebar
