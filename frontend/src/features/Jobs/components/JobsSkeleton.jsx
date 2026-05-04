const JobsSkeleton = () => {
  const JobCardSkeleton = () => {
    return (
      <div className="rounded-2xl p-4 bg-white/5 dark:bg-white/5 shadow-md flex flex-col justify-between space-y-4 animate-pulse">

        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-[#2e2d2b]" />
          <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-[#2e2d2b]" />
        </div>

        {/* Title + Company */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
        </div>

        {/* Date + Location */}
        <div className="flex gap-4">
          <div className="h-4 w-24 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
          <div className="h-4 w-24 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-10 w-28 rounded-full bg-gray-300 dark:bg-[#2e2d2b]" />
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-[#2e2d2b]" />
        </div>

      </div>
    )
  }

  return (
    <div>

      <div className="space-y-3 mb-6 animate-pulse">
        <div className="h-8 w-40 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
        <div className="h-4 w-72 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
      </div>

      <div className="grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4,5,6,7,8].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2 animate-pulse">
        <div className="h-8 w-20 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
        <div className="h-8 w-8 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
        <div className="h-8 w-8 bg-gray-300 dark:bg-[#2e2d2b] rounded" />
      </div>

    </div>
  );
};

export default JobsSkeleton;