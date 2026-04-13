import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const config = {
    applied: { label: "Applied", color: "#ea580c" },
    interviewing: { label: "Interviewing", color: "#9a3412" },
    offered: { label: "Offered", color: "#2563eb" },
    rejected: { label: "Rejected", color: "#78716c" },
};

const DonutChart = ({ statusStats }) => {
    if (!statusStats) {
        return <div>Loading chart...</div>
    }

    const formattedStatusData = Object.entries(statusStats).map(
    ([key, value]) => ({
        name: config[key].label,
        value,
        color: config[key].color,
    })
    );
    const total = Object.values(statusStats).reduce((acc, value) => acc + value, 0)
  return (
    <div className="bg-orange-100/40 dark:bg-[#221F1E] p-5 rounded-4xl shadow-sm w-full">
        
        <h2 className="font-semibold text-gray-700 dark:text-[#D2CBC9] mb-4">
            Status Breakdown
        </h2>

        <div className="relative flex justify-center items-center">
            
            <ResponsiveContainer width={200} height={200}>
            <PieChart>
                <Pie
                data={formattedStatusData}
                dataKey="value"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                cornerRadius={10}
                stroke="none"
                >
                {formattedStatusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                ))}
                </Pie>
            </PieChart>
            </ResponsiveContainer>

            <div className="absolute text-center">
            <h2 className="text-xl  font-bold">{total}</h2>
            <p className="text-xs text-gray-500 dark:text-[#D2CBC9]">TOTAL</p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            {formattedStatusData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
                <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
                />
                {item.name}
            </div>
            ))}
        </div>
    </div>
  )
}

export default DonutChart
