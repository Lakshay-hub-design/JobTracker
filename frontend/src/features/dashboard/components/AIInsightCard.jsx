const AIInsightCard = ({ data }) => {
  if (!data) return null

  return (
    <div className="bg-[#1A1A1D] rounded-4xl p-6 border border-white/5 shadow-lg">

      <p className="text-xs text-[#fde2d7] mb-2 uppercase tracking-wider">
        AI Intelligence
      </p>

      <h2 className="text-lg font-semibold text-white mb-4">
        Smart Insights Summary
      </h2>

      {/* Summary */}
      <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
        "{data.summary}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Growth Opportunities */}
        <div>
          <p className="text-xs text-gray-400 uppercase mb-3">
            Growth Opportunities
          </p>

          <ul className="space-y-2">
            {data.weakAreas?.map((item, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Next Best Action */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
          <p className="text-xs text-gray-400 uppercase mb-2">
            Next Best Action
          </p>

          <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
            {data.nextBestAction}
          </p>
        </div>

      </div>
    </div>
  )
}

export default AIInsightCard