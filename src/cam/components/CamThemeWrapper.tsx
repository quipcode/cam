import React from 'react'
import { ThemeContextType, Theme } from '../@types/theme'
import { CamThemeContext } from '../context/camThemeContext'

const CamThemeWrapper: React.FC =({children}) => {
    const { theme, changeTheme } = React.useContext(CamThemeContext) as ThemeContextType;

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeTheme(event.target.value as Theme)
    }

    return(

        <div className="Theme-wrapper" data-theme={theme}>
            <select className="Theme-toggler" name="toggleTheme" onChange={handleThemeChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            {children}
        </div>
    )
}

export default CamThemeWrapper;