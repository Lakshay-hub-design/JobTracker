const JobDetailsSkeleton = () => {
    const SkeletonBlock = ({ className }) => {
        return (
            <div className={`bg-gray-300 dark:bg-[#2e2d2b] animate-pulse rounded ${className}`} />
        )
    }

    const JobDetailsHeaderSkeleton = () => {
        return (
            <div>

            {/* Desktop */}
            <div className="hidden md:grid grid-cols-4 gap-4 animate-pulse">

                {/* Left Main Card */}
                <div className="col-span-3 bg-white dark:bg-[#221F1E] p-6 px-10 rounded-xl shadow-sm flex justify-between">

                <div className="space-y-3">
                    <SkeletonBlock className="h-6 w-64" />
                    <SkeletonBlock className="h-5 w-48" />

                    <div className="flex gap-4 mt-2">
                    <SkeletonBlock className="h-4 w-28" />
                    <SkeletonBlock className="h-4 w-28" />
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                    <SkeletonBlock className="h-6 w-24 rounded-full" />

                    <div className="flex gap-2">
                    <SkeletonBlock className="h-10 w-40 rounded-full" />
                    <SkeletonBlock className="h-10 w-32 rounded-full" />
                    </div>
                </div>

                </div>

                {/* Right Date Card */}
                <div className="bg-gray-100 dark:bg-[#33302f] p-6 rounded-xl shadow-sm space-y-3">
                <SkeletonBlock className="h-4 w-28" />
                <SkeletonBlock className="h-6 w-20" />
                </div>

            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3 animate-pulse">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-6 w-64" />

                <div className="flex gap-2 flex-wrap">
                <SkeletonBlock className="h-6 w-24 rounded-md" />
                <SkeletonBlock className="h-6 w-24 rounded-md" />
                <SkeletonBlock className="h-6 w-20 rounded-md" />
                </div>

                <SkeletonBlock className="h-4 w-40" />

                <div className="flex gap-3">
                <SkeletonBlock className="h-10 flex-1 rounded-full" />
                <SkeletonBlock className="h-10 flex-1 rounded-full" />
                </div>
            </div>

            </div>
        )
    }

    const JobSummarySkeleton = () => {
        return (
            <div className="bg-white dark:bg-[#221F1E] p-5 rounded-xl shadow-sm animate-pulse">
                <SkeletonBlock className="h-4 w-32 mb-3" />
                <SkeletonBlock className="h-3 w-full mb-2" />
                <SkeletonBlock className="h-3 w-5/6 mb-2" />
                <SkeletonBlock className="h-3 w-4/6" />
            </div>
        )
    }

    const JobDetailsMainSkeleton = () => {
        return (
            <div className="grid md:grid-cols-3 gap-6 animate-pulse">

            {/* LEFT */}
            <div className="md:col-span-2 space-y-6">

                {/* Description */}
                <SkeletonBlock className="h-40 w-full rounded-2xl" />

                {/* Cover Letter */}
                <SkeletonBlock className="h-32 w-full rounded-xl" />

                {/* Notes */}
                <SkeletonBlock className="h-28 w-full rounded-xl" />

            </div>

            {/* RIGHT */}
            <div className="space-y-6">

                {/* Attachments */}
                <div className="bg-gray-100 dark:bg-[#33302f] p-5 rounded-2xl">
                <SkeletonBlock className="h-5 w-40 mb-4" />

                <SkeletonBlock className="h-16 w-full rounded-xl mb-3" />

                <SkeletonBlock className="h-20 w-full rounded-xl" />
                </div>

                {/* FollowUp Card */}
                <SkeletonBlock className="h-28 w-full rounded-xl" />

                {/* Quick Actions */}
                <div className="p-5 rounded-xl border space-y-3">
                <SkeletonBlock className="h-5 w-32" />
                <SkeletonBlock className="h-10 w-full rounded-lg" />
                <SkeletonBlock className="h-10 w-full rounded-lg" />
                </div>

            </div>

            </div>
        )
    }

  return (
    <div className="space-y-6">

      <JobDetailsHeaderSkeleton />

      <JobSummarySkeleton />

      <JobDetailsMainSkeleton />

    </div>
  );
};

export default JobDetailsSkeleton;