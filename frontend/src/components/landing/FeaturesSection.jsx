import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Upload, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: <Briefcase />, title: "Track Jobs", desc: "Organize your job applications." },
  { icon: <Upload />, title: "Upload Resume", desc: "Store and update your resumes." },
  { icon: <BarChart />, title: "Smart Dashboard", desc: "Visualize progress and metrics." }
];

const Features = () => {
  return (
    <section className="bg-white py-16 px-4">
      <h2 className="text-3xl text-center font-bold mb-10 text-gray-800">Features</h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg w-72 p-4 rounded-xl">
              <CardContent className="flex flex-col items-center text-center gap-4">
                <div className="text-orange-600 text-4xl">{feature.icon}</div>
                <h3 className="font-bold text-xl">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
