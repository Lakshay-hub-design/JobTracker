import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '',  
    password: '' 
  })


  const { handleRegister, error, loading } = useAuth()

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)
    handleRegister(formData)
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
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            
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
            {error && <p className="text-yellow-200 text-sm">{error}</p>}
          </div>
          <div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-yellow-300 text-orange-800 font-semibold py-2 rounded-full hover:bg-yellow-400 transition"
          >
            {loading ? "Creating...": "Register"}
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
