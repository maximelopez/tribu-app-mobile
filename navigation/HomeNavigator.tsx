import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import CreateFamily from '../screens/CreateFamily';
import SearchFamily from '../screens/SearchFamily';
import FamilyDetails from '../screens/FamilyDetails';

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
          headerTitle: 'Créer une famille',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SearchFamily"
        component={SearchFamily}
        options={{
          headerShown: true,
          headerTitle: 'Rejoindre une famille',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="FamilyDetails" 
        component={FamilyDetails}
        options={{
          headerShown: true,
          headerTitle: 'Rejoindre une famille',
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
