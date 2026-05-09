import { useAuth } from '../../auth/hooks/useAuth'
import AIInsightCard from '../components/AIInsightCard'
import AIInsights from '../components/AIInsights'
import Charts from '../components/Charts'
import DashboardSkeleton from '../components/DashboardSkelton'
import EmptyDashboard from '../components/EmptyDashboard'
import RecentJobs from '../components/RecentJobs'
import SummaryCards from '../components/SummaryCards'
import WeeklyGoals from '../components/WeeklyGoals'
import { useDashboard } from '../hooks/useDashboard'
import { useObjective } from '../hooks/useObjectives'
import { IoIosWarning } from "react-icons/io";

const DashboardPage = () => {
    const { dashboardData, loading, refetch, error } = useDashboard()
    const { handleIncrement, handleDelete } = useObjective(refetch)
    const { user } = useAuth()
    if(error) return <p className='text-red-500'>Error: {error}</p>

    if (loading || !dashboardData) {
      return <DashboardSkeleton />
    }

    const isEmpty = !dashboardData.recentJobs || dashboardData.recentJobs.length === 0

    if (isEmpty) {
      return <EmptyDashboard />
    }


  return (
      <div className="-mt-6">
          <div className="mt:p-6 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl  font-bold text-[#333232] dark:text-[#eeeded]">
                Welcome back, {user?.name} 👋
            </h1>
            <p className="dark:text-gray-400 mt-1">Here’s your job search progress.</p>
          </div>

          <div className='md:px-6'>
            {dashboardData.aiInsight.aiLimitReached && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent backdrop-blur-sm">

                <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-2xl border border-amber-400/20">
                      <IoIosWarning className='text-yellow-400' />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-base font-semibold text-amber-300">
                          Daily AI Report Limit Reached
                        </h3>

                        <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 dark:text-amber-200">
                          {dashboardData.aiInsight.aiUsageToday}/{dashboardData.aiInsight.aiLimit} Used
                        </span>

                      </div>

                      <p className="mt-1 text-sm leading-relaxed text-[#333232] dark:text-zinc-300">
                        You’ve used all AI reports available for today.
                        You can still continue adding and managing job applications normally —
                        AI insights will become available again tomorrow.
                      </p>

                    </div>
                  </div>

                  <div className="hidden md:flex shrink-0 items-center">

                    <div className="rounded-xl border dark:border-zinc-700/50 bg-[#F9F1E6] dark:bg-black/20 px-4 py-3 text-center">

                      <p className="text-xs uppercase tracking-wide dark:text-zinc-400">
                        AI Access Resets In
                      </p>

                      <p className="mt-1 text-lg font-semibold text-gray-500 dark:text-white">
                        Tomorrow
                      </p>

                    </div>

                  </div>

                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:p-6">
            <div className="lg:col-span-2">
              <AIInsightCard data={dashboardData.aiInsight} />
            </div>

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
