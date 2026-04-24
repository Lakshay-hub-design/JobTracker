const AIInsightCard = ({ data }) => {
  if (!data) return null

  return (
    <div className="relative rounded-4xl">

  {/* 🔥 OUTER GLOW */}
  <div className="absolute -inset-1 rounded-4xl 
    bg-orange-500/20 dark:bg-orange-500/20 
    blur-lg opacity-40 dark:opacity-60">
  </div>

  {/* 🧩 CARD */}
  <div className="
    relative rounded-4xl p-6 shadow-lg
    bg-white dark:bg-[#1A1A1B]
    border border-gray-200 dark:border-white/5
  ">

    {/* ✨ Inner Gradient Glow */}
    <div className="absolute inset-0 rounded-4xl 
      bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.15),transparent_50%)]
      dark:bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.25),transparent_50%)]
      blur-4xl opacity-40 dark:opacity-50">
    </div>

    {/* HEADER */}
    <div className="flex items-center gap-4 mb-4 relative z-10">

      <div className="
        p-2 rounded-full
        bg-orange-100 dark:bg-[#312A27]
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="#FFB694"
        >
          <path d="M440-360h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm-2.5-117.5Q420-495 420-520t17.5-42.5Q455-580 480-580t42.5 17.5Q540-545 540-520t-17.5 42.5Q505-460 480-460t-42.5-17.5ZM240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80H240Z"/>
        </svg>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider 
          text-orange-400 dark:text-[#fde2d7]">
          AI Intelligence
        </p>

        <h2 className="text-lg font-semibold 
          text-gray-900 dark:text-white">
          Smart Insights Summary
        </h2>
      </div>
    </div>

    {/* SUMMARY */}
    <p className="leading-relaxed mb-6 line-clamp-3 relative z-10
      text-gray-700 dark:text-gray-300">
      "{data.summary}"
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">

      {/* LEFT */}
      <div>
        <p className="text-xs uppercase mb-3
          text-orange-500 dark:text-[#FFDBCC]">
          Growth Opportunities
        </p>

        <ul className="space-y-2">
          {data.weakAreas?.map((item, index) => (
            <li
              key={index}
              className="text-sm flex items-start gap-2
              text-gray-700 dark:text-gray-300"
            >
              <span className="text-orange-400 dark:text-[#FFB4AB] mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT BOX */}
      <div className="
        rounded-4xl p-4 border
        bg-orange-50 dark:bg-black/40
        border-orange-200 dark:border-white/5
      ">
        <p className="text-xs uppercase mb-2
          text-orange-500 dark:text-[#C99076]">
          Next Best Action
        </p>

        <p className="text-sm leading-relaxed line-clamp-4
          text-gray-700 dark:text-[#D3B2A4]">
          {data.nextBestAction}
        </p>
      </div>

    </div>
  </div>
</div>
  );
}

export default AIInsightCard