import { createContext, useRef, useState } from "react";

export const AppLoadingContext = createContext();

export const AppLoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0)

  const startProgress = () => {
    let current = 0

    const interval = setInterval(() => {
        current += Math.random() * 10

        if (current >= 90) {
            current = 90
            clearInterval(interval)
        }

        progressRef.current = current
        setProgress(current)
    }, 200)

    return interval
}

  const completeProgress = (interval) => {
    clearInterval(interval)

    let current = progressRef.current

    const finishInterval = setInterval(() => {
        current += 15

        if (current >= 100) {
            current = 100
            clearInterval(finishInterval)
        }

        setProgress(current)
    }, 50)
}

  return (
    <AppLoadingContext.Provider value={{
      loading,
      progress,
      setLoading,
      setProgress,
      startProgress,
      completeProgress
    }}>
      {children}
    </AppLoadingContext.Provider>
  );
};