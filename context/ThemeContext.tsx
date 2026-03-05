import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useUserStore } from '../store/userStore';

export type ThemeColor = 'vert' | 'jaune' | 'orange';

const colorMap: Record<ThemeColor, string> = {
  vert: '#00a16d',
  jaune: '#ff9d00',
  orange: '#ea4a1f',
};

interface ThemeContextProps {
  themeColor: ThemeColor;
  primaryColor: string;
  setThemeColor: (color: ThemeColor) => void;
  nextColor: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeColor: 'vert',
  primaryColor: colorMap['vert'],
  setThemeColor: () => {},
  nextColor: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colors: ThemeColor[] = ['vert', 'jaune', 'orange'];
  const [themeColor, setThemeColor] = useState<ThemeColor>('vert');

  const user = useUserStore(state => state.user);

  // Charger le thème du user au démarrage
  useEffect(() => {
    if (user?.theme && colors.includes(user.theme as ThemeColor)) {
      setThemeColor(user.theme);
    }
  }, [user]);

  const nextColor = () => {
    const currentIndex = colors.indexOf(themeColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setThemeColor(colors[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{ themeColor, primaryColor: colorMap[themeColor], setThemeColor, nextColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
