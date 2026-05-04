const ProfileSkeleton = () => {
    const SkeletonBlock = ({ className }) => {
    return (
        <div className={`bg-gray-300 dark:bg-[#2e2d2b] animate-pulse rounded ${className}`} />
    );
    };

    const ProfileHeaderSkeleton = () => {
    return (
        <div className="bg-white dark:bg-[#1D1B1A] p-4 md:p-6 rounded-2xl shadow-sm animate-pulse">

        {/* Mobile */}
        <div className="flex flex-col items-center text-center md:hidden space-y-3">
            <SkeletonBlock className="h-24 w-24 rounded-full" />
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="h-4 w-52" />
            <SkeletonBlock className="h-5 w-28 rounded-full" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">

            <div className="flex items-center gap-5">
            <SkeletonBlock className="h-24 w-24 rounded-full" />

            <div className="space-y-2">
                <SkeletonBlock className="h-6 w-40" />
                <SkeletonBlock className="h-4 w-60" />
                <SkeletonBlock className="h-4 w-48" />
            </div>
            </div>

            <SkeletonBlock className="h-12 w-36 rounded-full" />
        </div>

        </div>
    );
    };

    const ProfileStatsSkeleton = () => {
    return (
        <div className="animate-pulse">

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-5 gap-4">
            {[1,2,3,4,5].map((_, i) => (
            <SkeletonBlock key={i} className="h-24 w-full rounded-xl" />
            ))}
        </div>

        {/* Mobile */}
        <div className="grid md:hidden grid-cols-2 gap-4">

            <div className="flex flex-col gap-4">
            <SkeletonBlock className="h-[118px] rounded-2xl" />
            <SkeletonBlock className="h-[118px] rounded-2xl" />
            </div>

            <div className="flex flex-col gap-3">
            {[1,2,3].map((_, i) => (
                <SkeletonBlock key={i} className="h-[60px] rounded-2xl" />
            ))}
            </div>

        </div>

        </div>
    );
    };

    const ProfileTabsSkeleton = () => {
    return (
        <div className="bg-[#F5F3F2] dark:bg-[#292423] p-4 md:p-10 rounded-2xl shadow-sm animate-pulse">

        {/* Tabs */}
        <div className="flex gap-3 border-b pb-3 mb-6 overflow-x-auto">
            {[1,2,3].map((_, i) => (
            <SkeletonBlock key={i} className="h-8 w-28 rounded-full" />
            ))}
        </div>

        {/* Content (simulate form) */}
        <div className="space-y-4">

            {/* Input fields */}
            {[1,2,3,4].map((_, i) => (
            <SkeletonBlock key={i} className="h-12 w-full rounded-lg" />
            ))}

            {/* Textarea */}
            <SkeletonBlock className="h-24 w-full rounded-lg" />

            {/* Button */}
            <div className="flex justify-end">
            <SkeletonBlock className="h-10 w-32 rounded-full" />
            </div>

        </div>

        </div>
    );
    };

  return (
    <div className="space-y-6">

      <ProfileHeaderSkeleton />

      <ProfileStatsSkeleton />

      <ProfileTabsSkeleton />

    </div>
  );
};

export default ProfileSkeleton;