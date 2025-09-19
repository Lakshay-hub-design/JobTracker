import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/general/Dashboard'
import Jobs from '../pages/general/Jobs'
import Profile from '../pages/general/Profile'
import JobDetails from '../pages/general/JobDetails'
import Landing from '../pages/general/Landing'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'

const AppRoutes = () => {
  return (
    <div>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/user/register' element={<Register />} />
                <Route path='/user/login' element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/jobs' element={<Jobs />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/jobs/:id' element={<JobDetails />} />
            </Routes>
    </div>
  )
}

export default AppRoutes