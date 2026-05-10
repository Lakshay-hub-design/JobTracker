import { createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../shared/api/axiosPrivate";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light'
    })

    const axiosPrivate = useAxiosPrivate()

    const applyTheme = (newTheme) => {
        if(newTheme === 'dark'){
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    useState(() => {
        applyTheme(theme)
    })

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'

        applyTheme(newTheme)

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