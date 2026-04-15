import { createContext, useState } from "react";

export const AppLoadingContext = createContext();

export const AppLoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <AppLoadingContext.Provider value={{
      loading,
      progress,
      setLoading,
      setProgress
    }}>
      {children}
    </AppLoadingContext.Provider>
  );
};