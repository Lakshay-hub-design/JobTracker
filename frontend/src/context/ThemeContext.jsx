// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
// Import your authentication context to get the current user
import { useAuth } from './AuthContex'; // Make sure the path is correct

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get the current user from your AuthContext
  const { user } = useAuth() || {};    
  const [darkMode, setDarkMode] = useState(false);

  // Create a dynamic key for localStorage.
  // If a user is logged in, the key will be unique (e.g., "theme_user123").
  // If no user is logged in, it falls back to a generic key.
  const themeKey = user ? `theme_${user.id}` : "theme_default";

  // Effect to load and apply the theme when the component mounts or the user changes
  useEffect(() => {
    const savedTheme = localStorage.getItem(themeKey);
    
    // Check the saved theme or fall back to the system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, [themeKey]); // Re-run this effect whenever the themeKey changes (i.e., user logs in/out)

  // Function to toggle the theme
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(themeKey, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(themeKey, "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
