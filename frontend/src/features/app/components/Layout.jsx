import { useContext, useEffect } from 'react'
import BreadCrums from '../../Jobs/components/BreadCrums'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { AuthContext } from '../../auth/context/AuthContext'

const Layout = () => {
  const location = useLocation()

  const getBreadcrumbs = () => {
    const path = location.pathname

    if (path.startsWith("/job/") && path.includes("/report")) {
      return [
        { label: "Applications", link: "/jobs" },
        { label: "Job Details", link: path.split("/report")[0] },
        { label: "AI Report" }
      ]
    }

    if (path.startsWith("/job/") && !path.includes("/new")) {
      return [
        { label: "Applications", link: "/jobs" },
        { label: "Job Details" }
      ]
    }

    if (path === "/jobs") {
      return [{ label: "Applications" }]
    }

    return []
  }
  const context = useContext(AuthContext)
  const { user } = context
  const { setTheme } = useTheme()

  useEffect(() => {
    if(user?.theme) {
      setTheme(user.theme)
      localStorage.setItem('theme', user.theme)
    }
  }, [user])

  return (
    <div className='flex h-screen bg-gray-50 dark:bg-[#121110] dark:text-gray-100  transition-colors duration-300'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>

        <Topbar />

        <div className="px-4 pt-4 dark:bg-[#121110]">
          <BreadCrums items={getBreadcrumbs()} />
        </div>

        <main className='p-4 overflow-y-auto'>
            <Outlet />
        </main>
        
      </div>
    </div>
  )
}

export default Layout
