import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/general/Dashboard'
import Jobs from '../pages/general/Jobs'
import Profile from '../pages/general/Profile'
import JobDetails from '../pages/general/JobDetails'
import Landing from '../pages/general/Landing'

import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import ForgotPassword from '../features/auth/pages/ForgotPassword'
import VerifyEmail from '../features/auth/pages/VerifyEmail'

const AppRoutes = () => {
  return (
    <div>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/user/register' element={<Register />} />
                <Route path='/user/verify-email' element={<VerifyEmail />} />
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