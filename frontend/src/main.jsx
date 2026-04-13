import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";
import { ThemeProvider } from "./features/app/context/ThemeContext.jsx";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
  </BrowserRouter>
);
