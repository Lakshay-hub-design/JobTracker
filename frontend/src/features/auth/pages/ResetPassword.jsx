import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
    const { handleResetPassword, error, loading} = useAuth()
  const { token } = useParams()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    })

const validatePasswords = (password, confirmPassword) => {
    const errors = {};

    if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ password: "", confirmPassword: "" })
    const validationErrors = validatePasswords(password, confirmPassword)

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    handleResetPassword(token, password)
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

        <h2 className="text-2xl font-semibold">Reset your password</h2>
        <p className="text-sm text-white/80">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">

          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
            {errors.password && <p className="text-red-300">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
            {errors.confirmPassword && <p className="text-red-300">{errors.confirmPassword}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}

        {/* Back */}
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

export default ResetPassword;