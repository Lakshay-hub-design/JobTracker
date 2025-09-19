import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from "framer-motion";
import axios from 'axios'
import { useJobs } from '../../context/JobContext'
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { login } = useContext(AuthContext);
  const {fetchJobs} = useJobs();
  const navigate = useNavigate();

  function validate(values) {
    const errs = {}
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
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length === 0) {
    }
    try{
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/login`,
            form
        , {withCredentials:true})
        login(res.data?.user || res.data);
        fetchJobs()
        navigate('/dashboard')
    }catch(err){
        if(err.response.data.message){
          setErrors({general: err.response.data.message})
        }else{
          setErrors({general: "Something went wrong try again"})
        }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-orange-500 text-white px-4">
      <div className="absolute top-8 left-8 text-3xl font-lobster text-white drop-shadow-lg">
        JobTracker
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
            {errors.general && (
              <p className="text-red-400 text-sm text-center mb-2">
                {errors.general}
              </p>
            )}
            <p className="text-right text-sm mt-2">
              <Link
                to="/forgot-password"
                className="text-white/70 hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-yellow-300 text-black font-semibold hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/user/register" className="text-yellow-300 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
