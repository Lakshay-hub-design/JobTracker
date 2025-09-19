// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch on mount (in case user already has session cookie)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/me`, {
          withCredentials: true,
        });
        setCurrentUser(res.data?.user || res.data);
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔑 Functions you can call after login/logout
  const login = (userData) => {
    setCurrentUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
