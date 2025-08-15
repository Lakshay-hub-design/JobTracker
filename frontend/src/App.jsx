import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import RegisterPage from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoutes'
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AddJob from './pages/AddJob'
import Jobs from './pages/Jobs'
import EditJob from './pages/EditJob'
import JobDetail from './pages/JobDetail'


const App = () => {
  return (
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

    </Routes>
    
  )
}

export default App