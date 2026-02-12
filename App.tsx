import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { ThemeProvider } from './context/ThemeContext';
import { useFonts } from 'expo-font';
import "./global.css";

export default function App() {
  const [fontsLoaded] = useFonts({
    'peachy-keen': require('./assets/fonts/peachy-keen-jf.otf'),
    'outfit': require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
