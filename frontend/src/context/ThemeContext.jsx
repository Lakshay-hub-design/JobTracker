import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../features/auth/context/AuthContext";


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || user?.user?.email;
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (!userEmail) return;
    const savedTheme = localStorage.getItem(`theme-${userEmail}`);
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(savedTheme);
    }
  }, [userEmail]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (userEmail) {
      localStorage.setItem(`theme-${userEmail}`, newTheme);
    }

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
