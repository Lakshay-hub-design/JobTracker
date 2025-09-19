import React, { useState } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  function validate(values) {
    const errs = {}
    if (!values.username.trim()) errs.username = 'Username is required'
    if (!values.email) errs.email = 'Email is required'
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) errs.email = 'Enter a valid email'
    if (!values.password) errs.password = 'Password is required'
    else if (values.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/user/register",
          form,
          { withCredentials: true }
        );
        navigate("/dashboard");
      } catch (err) {
        if (err.response.data.message) {
          setErrors({ general: err.response.data.message }); // set custom error
        } else {
          setErrors({ general: "Something went wrong. Try again." });
        }
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 to-purple-700 text-white px-4">
      <div className="absolute top-8 left-8 text-3xl font-lobster text-white drop-shadow-lg">
        JobTracker
      </div>

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
              value={form.username}
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
              value={form.email}
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
              value={form.password}
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
          <Link to="/user/login" className="text-yellow-300 underline hover:text-yellow-200">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
