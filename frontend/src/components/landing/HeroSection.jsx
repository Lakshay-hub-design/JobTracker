import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import svg1 from "@/assets/svg1.svg";
import svg2 from "@/assets/svg2.svg";   
import svg3 from "@/assets/svg3.svg";

const HeroSection = () => {

      const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-purple-600 text-white relative overflow-hidden px-6">
      {/* Decorative SVG Graphics */}
      <img
        src={svg1}
        alt="hiring"
        className="hidden md:block w-40 absolute top-10 left-10 opacity-40 rotate-[-10deg]"
      />
      <img
        src={svg2}
        alt="resume"
        className="hidden md:block w-44 absolute bottom-1/2 right-16 opacity-50 rotate-[12deg]"
      />
      <img
        src={svg3}
        alt="work"
        className="hidden md:block w-38 absolute bottom-[20%] left-[20%] transform -translate-x-1/2 opacity-50"
      />

      {/* Main Content */}
      <div className="text-center space-y-6 z-10 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
        >
          Track Your Career <span className="text-yellow-300">Smartly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl max-w-xl mx-auto"
        >
          Manage job applications, resumes, interviews — all in one dashboard.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleGetStarted}
          className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-md"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
