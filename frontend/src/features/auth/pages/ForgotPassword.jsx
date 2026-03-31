import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const ForgotPassword = () => {
  const { handleForgotPassword, error, loading} = useAuth()
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(false)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleForgotPassword(email);

    if(res.success){
        setSuccess(true)
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
          Enter your email and we’ll send you a link to get back into your
          account.
        </p>
        {!success ? (
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
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-green-300">
              📩 Check your email
            </h3>
            <p className="text-sm text-white/80">
              If an account exists for{" "}
              <span className="font-medium">{email}</span>, we’ve sent a
              password reset link.
            </p>
            <p className="text-xs text-white/60">
              Don’t forget to check your spam folder.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="text-sm underline text-yellow-300"
            >
              Try another email
            </button>
          </div>
        )}

        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}

        <Link
          to="/user/login"
          className="mt-6 inline-block text-sm text-white/80 hover:underline"
        >
          Back to login
        </Link>
      </motion.div>
    </section>
  );
};

export default ForgotPassword;
