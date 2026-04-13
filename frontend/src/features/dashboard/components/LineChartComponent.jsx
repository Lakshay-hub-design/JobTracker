import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

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
    <div className='bg-orange-100/40 dark:bg-[#221F1E] p-5 rounded-4xl shadow-sm col-span-2'>
        <h2 className='text-lg font-semibold dark:text-[#D2CBC9] mb-4'>Application Over Time</h2>

        <ResponsiveContainer width="100%" height={200} >
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />

                <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#9A3412"
                    strokeWidth={4}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent
