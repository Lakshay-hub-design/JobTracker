import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart as PieChartIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cell, 
  Legend, 
  Pie, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as RechartsBarChart, 
  PieChart as RechartsPieChart, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300} className="mt-4">
    <RechartsBarChart data={data} margin={{ top: 5, right: 20, bottom: 20, left: -20 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="month" 
        tickLine={false} 
        axisLine={false}
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <YAxis 
        tickLine={false} 
        axisLine={false}
        stroke="hsl(var(--muted-foreground))"
        fontSize={12}
      />
      <Tooltip
         contentStyle={{ 
           background: "hsl(var(--background))", 
           border: "1px solid hsl(var(--border))" 
         }}
      />
      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
    </RechartsBarChart>
  </ResponsiveContainer>
);

const PieChartComponent = ({ data }) => {
    const COLORS = ["#3b82f6", "#16a34a", "#f97316", "#ef4444"];
    return (
      <ResponsiveContainer width="100%" height={300} >
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              background: "hsl(var(--background))", 
              border: "1px solid hsl(var(--border))" 
            }}
          />
          <Legend verticalAlign="bottom" iconSize={12} wrapperStyle={{paddingTop: 20}}/>
        </RechartsPieChart>
      </ResponsiveContainer>
    );
};


const chartVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

const ChartsContainer = ({ barChartData, pieChartData }) => {
  const [activeChart, setActiveChart] = useState('bar');

  return (
    <div className='bg-white p-4 rounded-lg shadow-md z-0 dark:bg-[#171717]'>
      <CardHeader>
        <CardTitle>Application Analytics</CardTitle>
        <CardDescription>A visual overview of your job application activity.</CardDescription>
      </CardHeader>
      <CardContent className="mt-14 ">
        {/* Mobile Segmented Control */}
        <div className="md:hidden mb-4 p-1 rounded-md flex gap-1">
          <Button
            variant={activeChart === 'bar' ? 'default' : 'ghost'}
            onClick={() => setActiveChart('bar')}
            className="w-full h-10 flex items-center gap-2 flex-1 min-w-0"
          >
            <BarChart size={16} /> Monthly
          </Button>
          <Button
            variant={activeChart === 'pie' ? 'default' : 'ghost'}
            onClick={() => setActiveChart('pie')}
            className="w-full h-10 flex items-center gap-2 flex-1 min-w-0"
          >
            <PieChartIcon size={16} /> Status
          </Button>
        </div>


        <div className="mt-4 mb-10">
          {/* Mobile View */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChart}
                variants={chartVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                {activeChart === 'bar' ? <BarChartComponent data={barChartData} /> : <PieChartComponent data={pieChartData} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-center font-semibold mb-2">Monthly Applications</h4>
              <BarChartComponent data={barChartData} />
            </div>
            <div>
              <h4 className="text-center font-semibold mb-2">Status Breakdown</h4>
              <PieChartComponent data={pieChartData} />
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default ChartsContainer;
