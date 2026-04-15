import AIInsights from '../components/AIInsights'
import Charts from '../components/Charts'
import RecentJobs from '../components/RecentJobs'
import SummaryCards from '../components/SummaryCards'
import { useDashboard } from '../hooks/useDashboard'

const DashboardPage = () => {
    const { dashboardData, loading, error } = useDashboard()

    if(loading) return <p>Loading dashboard...</p>
    if(error) return <p className='text-red-500'>Error: {error}</p>

  return (
    <div className='-mt-6'>
        <h1 className='text-2xl font-semibold'>Overview</h1>
        <p className="text-gray-500 mb-6">
          Welcome back. Here’s your job search progress.
        </p>

        <SummaryCards data={dashboardData} />

        <Charts data={dashboardData} />

        <AIInsights insights={dashboardData?.aiInsight} />

        <RecentJobs jobs={dashboardData?.recentJobs} />
    </div>
  )
}

export default DashboardPage
