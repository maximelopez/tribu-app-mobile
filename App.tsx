import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import "./global.css";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
