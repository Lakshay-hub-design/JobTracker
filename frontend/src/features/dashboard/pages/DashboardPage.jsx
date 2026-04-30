import AIInsightCard from '../components/AIInsightCard'
import AIInsights from '../components/AIInsights'
import Charts from '../components/Charts'
import EmptyDashboard from '../components/EmptyDashboard'
import RecentJobs from '../components/RecentJobs'
import SummaryCards from '../components/SummaryCards'
import WeeklyGoals from '../components/WeeklyGoals'
import { useDashboard } from '../hooks/useDashboard'
import { useObjective } from '../hooks/useObjectives'

const DashboardPage = () => {
    const { dashboardData, refetch, error } = useDashboard()
    const { handleIncrement, handleDelete } = useObjective(refetch)
    if(error) return <p className='text-red-500'>Error: {error}</p>

    if (!dashboardData) {
      return null; 
    }

    const isEmpty = !dashboardData.recentJobs || dashboardData.recentJobs.length === 0

    // 👉 SHOW EMPTY UI
    if (isEmpty) {
      return <EmptyDashboard />
    }


  return (
    <div className="-mt-6">
      <div className="mt:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl  font-bold text-[#333232] dark:text-[#eeeded]">
            Welcome back, Lakshay 👋
          </h1>
          <p className="dark:text-gray-400 mt-1">Here’s your job search progress.</p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:p-6">
          {/* LEFT: AI INSIGHT */}
          <div className="lg:col-span-2">
            <AIInsightCard data={dashboardData.aiInsight} />
          </div>

          {/* RIGHT: WEEKLY GOALS */}
          <WeeklyGoals 
            objectives={dashboardData.objectives} 
            handleIncrement={handleIncrement}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      <SummaryCards data={dashboardData} />

      <Charts data={dashboardData} />

      <RecentJobs jobs={dashboardData?.recentJobs} />
    </div>
  );
}

export default DashboardPage
