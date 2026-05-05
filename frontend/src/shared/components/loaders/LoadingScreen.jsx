import { useEffect, useState } from "react"

const LoadingScreen = ({progress}) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setDisplayProgress(prev => {
        if (prev < progress) return prev + 1;
        return prev;
        });
    }, 15)

    return () => clearInterval(interval);
    }, [progress]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#0F0C29] via-[#1B1635] to-[#0B0B1F] flex items-center justify-center text-white">
      
      <div className="text-center space-y-6">

        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#E0531F] blur-xl opacity-70 animate-pulse"></div>

          <div className="absolute w-26 h-26 rounded-full border-2 border-[#E0531F] border-t-transparent animate-spin"></div>

          <div className="absolute w-16 h-16 bg-[#E0531F] rounded-full"></div>
        </div>

        <h1 className="text-4xl font-bold tracking-wide">
          JOBTRACKER<span className="text-[#E0531F]">.</span>
        </h1>

        <p className="text-gray-400">
          Loading your career workspace...
        </p>

        <div className="w-64 mx-auto">
          <div className="h-[4px] bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E0531F] transition-all duration-75 ease-linear"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2">
          <span className="bg-[#1f1f2e] px-3 py-1 rounded-full">
            SYNCHRONIZING
          </span>
          <span className="bg-[#1f1f2e] px-3 py-1 rounded-full">
            DECRYPTING PROFILE
          </span>
        </div>

        <div className="flex justify-between text-[10px] text-gray-500 pt-6 w-80 mx-auto">
          <span>🔒 End-to-End Encryption</span>
          <span className="text-green-400">● System Operational</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;