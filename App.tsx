import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { useFonts } from 'expo-font';
import "./global.css";

export default function App() {
  const [fontsLoaded] = useFonts({
    'peachy-keen': require('./assets/fonts/peachy-keen-jf.otf'),
    'outfit': require('./assets/fonts/Outfit-VariableFont_wght.ttf'),
  });

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
