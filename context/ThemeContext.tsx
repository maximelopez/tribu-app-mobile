import { createContext, useState, useEffect, useContext, useMemo, ReactNode } from 'react';
import { useUserStore } from '../store/userStore';

export type ThemeColor = 'vert' | 'jaune' | 'orange';

type Theme = {
  primary: string;
  secondary: string;
};

const themeMap: Record<ThemeColor, Theme> = {
  vert: {
    primary: '#00a16d',
    secondary: '#00a16d33',
  },
  jaune: {
    primary: '#ff9d00',
    secondary: '#ff9d0033',
  },
  orange: {
    primary: '#ea4a1f',
    secondary: '#ea4a1f33',
  },
};

const colors = Object.keys(themeMap) as ThemeColor[];

const isThemeColor = (value: any): value is ThemeColor =>
  colors.includes(value);

interface ThemeContextProps {
  themeColor: ThemeColor;
  theme: Theme;
  setThemeColor: (color: ThemeColor) => void;
  nextColor: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeColor: 'vert',
  theme: themeMap.vert,
  setThemeColor: () => {},
  nextColor: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const user = useUserStore(state => state.user);

  const [themeColor, setThemeColor] = useState<ThemeColor>(
    isThemeColor(user?.theme) ? user.theme : 'vert'
  );

  useEffect(() => {
    if (isThemeColor(user?.theme)) {
      setThemeColor(user.theme);
    }
  }, [user?.theme]);

  const theme = useMemo(() => themeMap[themeColor], [themeColor]);

  const nextColor = () => {
    const currentIndex = colors.indexOf(themeColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setThemeColor(colors[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        theme,
        setThemeColor,
        nextColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
