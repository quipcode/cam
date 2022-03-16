import * as React from 'react';
import { Theme, ThemeContextType } from '../@types/theme';

export const CamThemeContext = React.createContext<ThemeContextType | null>(null);

const CamThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [themeMode, setThemeMode] = React.useState<Theme>('light');
    return <CamThemeContext.Provider value={{ theme: themeMode, changeTheme: setThemeMode }}>{children}</CamThemeContext.Provider>;
};

export default CamThemeProvider;