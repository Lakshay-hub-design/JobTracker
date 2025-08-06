import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import RegisterPage from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoutes'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route 
      path='/dashboard'
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

    </Routes>
  )
}

export default App