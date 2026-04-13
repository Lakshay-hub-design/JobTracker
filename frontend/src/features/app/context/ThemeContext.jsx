import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../shared/api/axiosPrivate";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light')

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'

        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)

        try {
            await axiosPrivate.patch('/api/user/theme', {theme: newTheme})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)