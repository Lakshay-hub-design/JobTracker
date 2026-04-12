import BreadCrums from '../../Jobs/components/BreadCrums'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet, useLocation } from 'react-router-dom'

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


  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>

        <Topbar />

        <div className="px-4 pt-4">
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
