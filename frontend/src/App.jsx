import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import RegisterPage from './pages/authPages/Register'
import Login from './pages/authPages/Login'
import Dashboard from './pages/appPages/Dashboard'
import PrivateRoute from './components/PrivateRoutes'
import ForgotPassword from './pages/authPages/ForgotPassword'
import ResetPasswordPage from './pages/authPages/ResetPasswordPage'
import AddJob from './features/dashboard/AddJob'
import Jobs from './pages/appPages/Jobs'
import EditJob from './pages/appPages/EditJob'
import JobDetail from './pages/appPages/JobDetail'
import {Toaster} from 'sonner'
import Profile from './pages/appPages/Profile'


const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route path="/add-job" element={<AddJob />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/edit-job/:id" element={<EditJob />} />

      <Route 
      path='/dashboard'
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
    <Toaster richColors position="top-right" />
    </>
  )
}

export default App