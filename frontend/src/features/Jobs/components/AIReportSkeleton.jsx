const AIReportSkeleton = () => {

    const SkeletonBlock = ({ className }) => {
        return (
            <div className={`bg-gray-300 dark:bg-[#2e2d2b] animate-pulse rounded ${className}`} />
        )
    }

    const AIReportNavSkeleton = () => {
        return (
            <nav className="hidden md:flex w-[220px] py-4 flex-col gap-3 px-4 animate-pulse">
            {[1,2,3,4,5].map((_, i) => (
                <SkeletonBlock key={i} className="h-10 w-full rounded-full" />
            ))}
            </nav>
        )
    }

    const AIReportContentSkeleton = () => {
        return (
            <main className="flex-1 p-4 animate-pulse">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <SkeletonBlock className="h-6 w-48" />
                <SkeletonBlock className="h-6 w-24 rounded-full" />
            </div>

            {/* Question Cards */}
            <div className="flex flex-col gap-3">
                {[1,2,3,4,5].map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#221F1E] p-4 rounded-xl">
                    <SkeletonBlock className="h-4 w-3/4 mb-2" />
                    <SkeletonBlock className="h-3 w-full mb-1" />
                    <SkeletonBlock className="h-3 w-5/6" />
                </div>
                ))}
            </div>

            </main>
        )
    }

    const AIReportAsideSkeleton = () => {
        return (
            <aside className="md:w-[280px] p-4 flex flex-col gap-6 animate-pulse">

            {/* Match Score */}
            <div className="bg-white dark:bg-[#221F1E] rounded-3xl p-4 flex flex-col items-center gap-3">
                <SkeletonBlock className="h-3 w-20" />

                <SkeletonBlock className="h-[100px] w-[100px] rounded-full" />

                <SkeletonBlock className="h-4 w-24" />
            </div>

            {/* Skill Analysis */}
            <div className="bg-[#F5F3F2] dark:bg-[#221F1E] rounded-3xl p-5 flex flex-col gap-4">

                <SkeletonBlock className="h-3 w-32" />

                {/* Desktop bars */}
                <div className="hidden lg:flex flex-col gap-4">
                {[1,2,3,4].map((_, i) => (
                    <div key={i} className="space-y-2">
                    <div className="flex justify-between">
                        <SkeletonBlock className="h-4 w-24" />
                        <SkeletonBlock className="h-4 w-16 rounded-full" />
                    </div>
                    <SkeletonBlock className="h-2 w-full rounded-full" />
                    </div>
                ))}
                </div>

                {/* Mobile chips */}
                <div className="flex flex-wrap gap-2 lg:hidden">
                {[1,2,3,4].map((_, i) => (
                    <SkeletonBlock key={i} className="h-8 w-24 rounded-xl" />
                ))}
                </div>

            </div>

            {/* Mobile Tabs */}
            <div className="md:hidden flex gap-2">
                {[1,2,3].map((_, i) => (
                <SkeletonBlock key={i} className="h-10 flex-1 rounded-full" />
                ))}
            </div>

            </aside>
        )
    }
  return (
    <div className="space-y-6">

      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-screen bg-[#FBF9F8] dark:bg-[#121110]">

        <AIReportNavSkeleton />

        <AIReportContentSkeleton />

        <AIReportAsideSkeleton />

      </div>

    </div>
  );
};

export default AIReportSkeleton;