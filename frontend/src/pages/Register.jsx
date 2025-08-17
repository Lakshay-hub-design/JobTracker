// src/pages/RegisterPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim() || formData.username.length < 3) newErrors.username = "Username is required and must be at least 3 characters";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required";
    if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:4000/api/auth/register", formData);
        const { token, user } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
        const success = res?.data?.message;
        toast.success(success);
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-purple-700 text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">Create Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.username && <p className="text-yellow-200 text-sm">{errors.username}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.email && <p className="text-yellow-200 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.password && <p className="text-yellow-200 text-sm">{errors.password}</p>}
          </div>
          <div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-300 text-orange-800 font-semibold py-2 rounded-full hover:bg-yellow-400 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 underline hover:text-yellow-200">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default RegisterPage;
