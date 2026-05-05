import React, { useContext } from 'react'
import AppRoutes from './app/routes/AppRoutes'
import { Toaster } from "react-hot-toast";
import './App.css'
import { AppLoadingContext } from './app/providers/AppLoadingContext';
import LoadingScreen from './shared/components/loaders/LoadingScreen';

const App = () => {
const { loading, progress } = useContext(AppLoadingContext);
  return (
    <div>
      {loading && <LoadingScreen progress={progress} />}
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            marginTop: '10px',
            background: "rgba(26, 26, 27, 0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "14px",
            padding: "12px 16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          },
        }}
      />
    </div>
  )
}

export default App