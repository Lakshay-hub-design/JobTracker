const DashboardSkeleton = () => {

    const SkeletonBlock = ({ className }) => {
        return (
                <div className={`bg-gray-300 dark:bg-[#1A1A1B] animate-pulse rounded ${className}`} />
            )
    }

  return (
    <div className="-mt-6">

      <div className="mt:p-6 space-y-6">

        {/* Heading Section */}
        <div>
          <SkeletonBlock className="h-8 w-64 mb-2" />
          <SkeletonBlock className="h-4 w-80" />
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:p-6">

          {/* AI Insight (2 columns on lg) */}
          <div className="lg:col-span-2">
            <SkeletonBlock className="h-80 w-full rounded-xl" />
          </div>

          {/* Weekly Goals */}
          <div>
            <SkeletonBlock className="h-80 w-full rounded-xl" />
          </div>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="px-4 md:px-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map((_, i) => (
            <SkeletonBlock key={i} className="h-44 w-full rounded-xl" />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="px-4 md:px-6 mt-6">
        <SkeletonBlock className="h-[300px] w-full rounded-xl" />
      </div>

      {/* Recent Jobs */}
      <div className="px-4 md:px-6 mt-6 space-y-3">
        {[1,2,3,4,5].map((_, i) => (
          <SkeletonBlock key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>

    </div>
  );
};

export default DashboardSkeleton