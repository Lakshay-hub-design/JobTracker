import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/user/register");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-purple-600 text-white relative overflow-hidden px-6">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="font-bebas-neue text-6xl md:text-8xl tracking-wider leading-tight">
            Land Your Dream Job Faster
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-lg mx-auto lg:mx-0">
            Stop juggling spreadsheets. JobTracker helps you organize
            applications, track progress, and manage your job search all in one
            place.
          </p>
          <div className="mt-8 flex justify-center lg:justify-start space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleGetStarted}
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-md"
            >
              Get Started for free
            </motion.button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <img
            src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/82a034ed-8e93-46d7-b76b-a87180422e28.png"
            alt="JobTracker Dashboard"
            className="rounded-2xl shadow-2xl transform rotate-3"
          />
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="text-center space-y-6 z-10 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
        >
          Track Your Career <span className="text-yellow-300">Smartly</span>
        </motion.h1> */}

      {/* <motion.p
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
        </motion.button> */}
      {/* </div> */}
    </section>
  );
};

export default HeroSection;
