import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Protected from '../../features/auth/components/Protected'
import PublicRoute from '../../features/auth/components/PublicRoutes'
import Layout from '../layout/Layout'
import { DashboardProvider } from '../../features/dashboard/context/DashboardContext'
import { JobProvider } from '../../features/Jobs/context/JobContext'
import LoadingScreen from '../../shared/components/loaders/LoadingScreen'
import NotFoundPage from '../pages/NotFoundPage'

const Dashboard = lazy(() => import('../../features/dashboard/pages/DashboardPage'))
const Jobs = lazy(() => import('../../features/Jobs/pages/JobsPage'))
const JobDetails = lazy(() => import('../../features/Jobs/pages/JobDetails'))
const AIReport = lazy(() => import('../../features/Jobs/pages/AIReportPage'))
const AddJob = lazy(() => import('../../features/Jobs/pages/AddJobPage'))
const Profile = lazy(() => import('../../features/profile/pages/ProfilePage'))
const Landing = lazy(() => import('../../features/landing/pages/Landing'))


import Login from '../../features/auth/pages/Login'
import Register from '../../features/auth/pages/Register'
import VerifyEmail from '../../features/auth/pages/VerifyEmail'
import ForgotPassword from '../../features/auth/pages/ForgotPassword'
import ResetPassword from '../../features/auth/pages/ResetPassword'
import PageLoader from '../../shared/components/loaders/PageLoader'

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
            <DashboardProvider>
              <JobProvider>
                <Layout />
              </JobProvider>
            </DashboardProvider>
            } >
          
            <Route path='/dashboard' element={
                <Dashboard />              
            } />

            <Route path='/jobs' element={
              
                <Jobs />
              
            } />

            <Route path='/job/new' element={
              <AddJob />
            } />

            <Route path='/job/:jobId' element={
              <JobDetails />
            } />

            <Route path='/job/:jobId/report' element={
              <AIReport />
            } />

            <Route path='/settings' element={
                <Profile />
            } />

          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Suspense>
  )
}

export default AppRoutes