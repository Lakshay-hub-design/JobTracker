import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatCard from '../../components/StatCard';
import { Briefcase, Send, UserCheck, Award, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils"; // Make sure you have this utility from shadcn/ui

const statItems = [
  { id: 'total', label: "Total Jobs", icon: Briefcase, themeColor: "blue" },
  { id: 'applied', label: "Applied", icon: Send, themeColor: "indigo" },
  { id: 'interview', label: "Interview", icon: UserCheck, themeColor: "green" },
  { id: 'offer', label: "Offer", icon: Award, themeColor: "yellow" },
  { id: 'rejected', label: "Rejected", icon: XCircle, themeColor: "red" },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const StatsGrid = ({ stats }) => {
  // State to track the currently selected stat tab on mobile
  const [selectedTab, setSelectedTab] = useState(statItems[0]);

  return (
    <div>
      {/* --- MOBILE VIEW: Segmented Control (Visible on screens smaller than md) --- */}
      <div className="md:hidden">
        {/* The Tabs/Buttons */}
        <div className="flex space-x-1 rounded-lg bg-muted p-1 mb-4">
          {statItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item)}
              className={cn(
                "w-full rounded-md p-2 text-sm font-medium transition-colors",
                selectedTab.id === item.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/50"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* The Animated Stat Card that responds to tab clicks */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <StatCard
              label={selectedTab.label}
              value={stats[selectedTab.id]}
              icon={selectedTab.icon}
              themeColor={selectedTab.themeColor}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- DESKTOP VIEW: Grid Layout (Visible on md screens and up) --- */}
      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:grid md:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        {statItems.map((item) => (
          <StatCard
            key={item.id}
            label={item.label}
            value={stats[item.id]}
            icon={item.icon}
            themeColor={item.themeColor}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default StatsGrid;
