import React from 'react'
import Navbar from '../components/Navbar'
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContex';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const { darkMode, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();
  return (
    <div>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} logout={logout} />
        <div>
            Profile
        </div>
    </div>
  )
}

export default Profile