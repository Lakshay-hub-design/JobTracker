import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative flex w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="absolute w-1/2 h-full bg-white animate-[loadingbar_1.5s_linear_infinite]"></div>
      </div>
      <style>{`
        @keyframes loadingbar {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};





export default Loading;
