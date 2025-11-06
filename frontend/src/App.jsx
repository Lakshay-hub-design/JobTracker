import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import './App.css'
import { useTheme } from './context/ThemeContext';

const App = () => {
  const {theme} = useTheme();

  return (
    <div>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        icon={false}
        theme={theme === "dark" ? "dark" : "light"}
        toastStyle={{
          background: theme === "dark" ? "#222831" : "#fefefe",
          color: theme === "dark" ? "#ffffff" : "#000000",
          border: theme === "dark" ? "1px solid #444" : "1px solid #ddd",
        }}
      />
    </div>
  )
}

export default App