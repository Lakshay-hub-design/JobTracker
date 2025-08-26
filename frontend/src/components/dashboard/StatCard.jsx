import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const colorVariants = {
  blue: "border-blue-500 text-blue-500",
  indigo: "border-indigo-500 text-indigo-500",
  green: "border-green-500 text-green-500",
  yellow: "border-yellow-500 text-yellow-500",
  red: "border-red-500 text-red-500",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const StatCard = ({ label, value, icon: Icon, themeColor = "blue" }) => {
  return (
    <motion.div
      variants={cardVariants}
      // --- RESPONSIVE WIDTH CONTROL ---
      // Mobile: Give the card a fixed minimum width so it doesn't get squished.
      // MD & up: Reset the min-width so the grid layout can control its size.
      className="min-w-[160px] md:min-w-0"
    >
      <Card className={cn("border-t-4 shadow-sm h-full", colorVariants[themeColor])}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {label}
          </CardTitle>
          {Icon && <Icon className={cn("h-5 w-5", colorVariants[themeColor])} />}
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
