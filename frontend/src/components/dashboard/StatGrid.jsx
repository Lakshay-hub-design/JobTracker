import React, { useState } from "react";
import { useJobs } from "../../context/JobContext";
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Send, User, Award, XCircle } from "lucide-react";
import StatsCard from "./StatCard";
import { cn } from "@/lib/utils";

const StatGrid = () => {

  const { jobs } = useJobs();

  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === "applied").length;
  const interview = jobs.filter((job) => job.status === "interview").length;
  const offer = jobs.filter((job) => job.status === "offer").length;
  const rejected = jobs.filter((job) => job.status === "rejected").length;

  const cards = [
    {
      title: "Total Jobs",
      count: total,
      icon: Briefcase,
      color: "border-blue-500 text-blue-500",
    },
    {
      title: "Applied",
      count: applied,
      icon: Send,
      color: "border-indigo-500 text-indigo-500",
    },
    {
      title: "Interview",
      count: interview,
      icon: User,
      color: "border-green-500 text-green-500",
    },
    {
      title: "Offer",
      count: offer,
      icon: Award,
      color: "border-yellow-500 text-yellow-500",
    },
    {
      title: "Rejected",
      count: rejected,
      icon: XCircle,
      color: "border-red-500 text-red-500",
    },
  ];
  const [selectedTab, setSelectedTab] = useState(cards[0]);
  return (
    <div>
<div className="md:hidden">
  {/* The Tabs/Buttons */}
  <div className="flex space-x-1 rounded-lg bg-muted p-1 mb-4 dark:bg-[#262626]">
    {cards.map((item, index) => (
      <button
        key={index}
        onClick={() => setSelectedTab(item)}
        className={cn(
          "w-full rounded-md p-2 text-sm font-medium transition-colors",
          selectedTab.title === item.title
            ? "bg-background text-foreground shadow-sm dark:bg-black dark:text-white"
            : "text-gray-400 hover:bg-background/50"
        )}
      >
        {item.title}
      </button>
    ))}
  </div>

  {/* The Animated Stat Card */}
  <AnimatePresence mode="wait">
    <motion.div
      key={selectedTab.title}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <StatsCard
        title={selectedTab.title}
        count={selectedTab.count}
        icon={selectedTab.icon}
        color={selectedTab.color}
      />
    </motion.div>
  </AnimatePresence>
</div>

      <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            count={item.count}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default StatGrid;
