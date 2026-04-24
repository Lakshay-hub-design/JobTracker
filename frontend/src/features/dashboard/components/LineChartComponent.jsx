import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const LineChartComponent = ({ monthlyStats }) => {

const formattedData = Array.from({ length: 6 }, (_, i) => {
  const found = monthlyStats.find(item => item._id.month === i + 1);

  return {
    month: monthNames[i],
    count: found ? found.count : 0
  };
});

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white text-xs px-3 py-1 rounded-full">
        {label}: {payload[0].value} Apps
      </div>
    );
  }
  return null;
};

  return (
    <div className='bg-orange-100/40 dark:bg-[#221F1E] p-5 rounded-4xl shadow-sm md:col-span-2'>
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-semibold">
          Applications Over Time
        </h2>

        <div className="bg-black/40 rounded-full p-1 flex gap-1">
          <button className="px-3 py-1 text-xs bg-[#2A2A2D] rounded-full text-white">
            MONTHLY
          </button>
        </div>
      </div>

        <div className="h-62 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ left: 10, right: 10, top: 2 }}>

          <Tooltip content={<CustomTooltip />} />

            {/* Gradient */}
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6A00" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FF6A00" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* X Axis */}
            <XAxis
              dataKey="month"
              stroke="#B99D91"
              tick={{ fontSize: 15 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="count"
              stroke="#FF6A00"
              strokeWidth={2}
              fill="url(#color)"
              dot={false}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default LineChartComponent
