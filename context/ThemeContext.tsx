import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ThemeColor = 'bleu' | 'jaune' | 'orange' | 'vert';

const colorMap: Record<ThemeColor, string> = {
  bleu: '#20c1b1',
  jaune: '#ff9d00',
  orange: '#ea4a1f',
  vert: '#00a16d',
};

interface ThemeContextProps {
  themeColor: ThemeColor;
  primaryColor: string;
  setThemeColor: (color: ThemeColor) => void;
  nextColor: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeColor: 'bleu',
  primaryColor: colorMap['bleu'],
  setThemeColor: () => {},
  nextColor: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colors: ThemeColor[] = ['bleu', 'jaune', 'orange', 'vert'];
  const [themeColor, setThemeColor] = useState<ThemeColor>('bleu');

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
