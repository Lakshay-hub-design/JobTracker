import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Protected from '../features/auth/components/Protected'
import PublicRoute from '../features/auth/components/PublicRoutes'
import Layout from '../features/app/components/Layout'
import { DashboardProvider } from '../features/dashboard/context/DashBoardContext'
import { JobProvider } from '../features/Jobs/context/JobContext'

const Dashboard = lazy(() => import('../features/dashboard/pages/DashboardPage'))
const Jobs = lazy(() => import('../features/Jobs/pages/JobsPage'))
const Profile = lazy(() => import('../pages/general/Profile'))
const JobDetails = lazy(() => import('../features/Jobs/pages/JobDetails'))
const AIReport = lazy(() => import('../features/Jobs/pages/AIReportPage'))
const Landing = lazy(() => import('../pages/general/Landing'))


const Register = lazy(() => import('../features/auth/pages/Register'))
const Login = lazy(() => import('../features/auth/pages/Login'))
const VerifyEmail = lazy(() => import('../features/auth/pages/VerifyEmail'))
const ForgotPassword = lazy(() => import('../features/auth/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('../features/auth/pages/ResetPassword'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path='/' element={<Landing />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/verify-email' element={<VerifyEmail />} />
          <Route path='/user/login' element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        
        <Route element={<Protected />}>
          <Route element={
            <Layout />}  
          >
          
            <Route path='/dashboard' element={
              <DashboardProvider>
                <Dashboard />
              </DashboardProvider>
            } />

            <Route path='/jobs' element={
              <JobProvider>
                <Jobs />
              </JobProvider>
            } />

            <Route path='/job/:jobId' element={
              <JobDetails />
            } />

            <Route path='/job/:jobId/report' element={
              <AIReport />
            } />

            <Route path='/profile' element={
                <Profile />
            } />

          </Route>
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </Suspense>
  )
}

export default AppRoutes