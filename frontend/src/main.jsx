import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const userEmail = localStorage.getItem("userEmail");

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <JobProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </JobProvider>
  </BrowserRouter>
);
