import React, { useContext } from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import './App.css'
import { AppLoadingContext } from './features/app/context/AppLoadingContext';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
const { loading, progress } = useContext(AppLoadingContext);
  return (
    <div>
      {loading && <LoadingScreen progress={progress} />}
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        icon={false}
      />
    </div>
  )
}

export default App