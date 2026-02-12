import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ThemeColor = 'violet' | 'jaune' | 'rouge' | 'bleu';

const colorMap: Record<ThemeColor, string> = {
  violet: '#6C0FF2',
  jaune: '#FFCF06',
  rouge: '#E64A19',
  bleu: '#448AFF',
};

interface ThemeContextProps {
  themeColor: ThemeColor;
  primaryColor: string;
  setThemeColor: (color: ThemeColor) => void;
  nextColor: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themeColor: 'violet',
  primaryColor: colorMap['violet'],
  setThemeColor: () => {},
  nextColor: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colors: ThemeColor[] = ['violet', 'jaune', 'rouge', 'bleu'];
  const [themeColor, setThemeColor] = useState<ThemeColor>('violet');

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
