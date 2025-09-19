import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const StatsCard = ({ title, count, icon: Icon, color }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="min-w-[160px] md:min-w-0"
    >
      <Card className={(`border-t-4 shadow-sm h-full ${color} dark:bg-[#171717]`)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium ">
            {title}
          </CardTitle>
          {Icon && <Icon className={(`h-5 w-5 ${color}`)} />}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground dark:text-white">{count}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
