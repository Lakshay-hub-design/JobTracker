// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
        console.log("Sending reset link to:", email);

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/forgot-password`, { email });
        setMessage(res.data.message);
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-purple-700 text-white px-4">
      <div className="absolute top-8 left-8 text-3xl font-lobster text-white drop-shadow-lg">
        JobTracker
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md shadow-xl space-y-6 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center border-2 border-white rounded-full">
            <Lock size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold">Trouble logging in?</h2>
        <p className="text-sm text-white/80">
          Enter your email and we’ll send you a link to get back into your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded"
          >
            Send reset link
          </button>
        </form>
        {message && <p className="text-green-300 text-sm mt-2">{message}</p>}
        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        
        <Link to="/user/login" className="mt-6 inline-block text-sm text-white/80 hover:underline">
          Back to login
        </Link>
      </motion.div>
    </section>
  );
};

export default ForgotPassword;
