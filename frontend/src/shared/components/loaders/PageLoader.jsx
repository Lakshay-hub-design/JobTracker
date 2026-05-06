const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[#212121] transition-colors duration-300">
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-gray-700"></div>

          <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        </div>

        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;