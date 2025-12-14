import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { UserProvider } from './context/UserContext';
import "./global.css"

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
