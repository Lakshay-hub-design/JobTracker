import AIInsightCard from '../components/AIInsightCard'
import AIInsights from '../components/AIInsights'
import Charts from '../components/Charts'
import RecentJobs from '../components/RecentJobs'
import SummaryCards from '../components/SummaryCards'
import WeeklyGoals from '../components/WeeklyGoals'
import { useDashboard } from '../hooks/useDashboard'

const DashboardPage = () => {
    const { dashboardData, error } = useDashboard()

    if(error) return <p className='text-red-500'>Error: {error}</p>

    if (!dashboardData) {
      return null; 
    }


  return (
    <div className="-mt-6">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, Lakshay 👋
          </h1>
          <p className="text-gray-400 mt-1">Here’s your job search progress.</p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: AI INSIGHT */}
          <div className="lg:col-span-2">
            <AIInsightCard data={dashboardData.aiInsight} />
          </div>

          {/* RIGHT: WEEKLY GOALS */}
          <WeeklyGoals data={dashboardData.weeklyGoal} />
        </div>
      </div>

      <SummaryCards data={dashboardData} />

      <Charts data={dashboardData} />

      <AIInsights insights={dashboardData?.aiInsight} />

      <RecentJobs jobs={dashboardData?.recentJobs} />
    </div>
  );
}

export default DashboardPage
