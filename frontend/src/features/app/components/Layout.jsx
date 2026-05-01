import { useContext, useEffect } from 'react'
import BreadCrums from '../../Jobs/components/BreadCrums'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { AuthContext } from '../../auth/context/AuthContext'
import BottomNav from './BottomNav'
import { Plus } from 'lucide-react'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

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
    <div className='flex h-screen bg-gray-50 dark:bg-[#121110] overflow-x-hidden dark:text-gray-100  transition-colors duration-300'>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className='flex-1 flex flex-col'>

        <Topbar />

        <div className="px-4 pt-4 dark:bg-[#121110]">
          <BreadCrums items={getBreadcrumbs()} />
        </div>

        <main className='flex-1 overflow-y-auto custom-app-scrollbar pb-22 md:pb-4'>
          <div className="p-4">
            <Outlet />
          </div>
        </main>
        
      </div>

      <button
        onClick={() => navigate('/job/new')}
        className="
          fixed bottom-22 right-4 
          md:hidden 
          z-50 
          h-14 w-14 
          rounded-full 
          bg-[#FF8563]
          text-black
          flex items-center justify-center 
          shadow-lg 
          active:scale-95 
          transition
        "
      >
        <Plus size={26} />
      </button>

      <div className="fixed bottom-0 left-0 w-full md:hidden z-50">
        <BottomNav />
      </div>

    </div>
  )
}

export default Layout
