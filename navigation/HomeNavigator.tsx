import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CreateFamily from '../screens/CreateFamily';
import JoinFamily from '../screens/JoinFamily';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CreateFamily"
        component={CreateFamily}
        options={{
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="JoinFamily"
        component={JoinFamily}
        options={{
          headerShown: true,
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
