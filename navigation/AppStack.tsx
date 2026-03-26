import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import CreateFamily from '../screens/CreateFamily';
import SearchFamily from '../screens/SearchFamily';
import FamilyDetails from '../screens/FamilyDetails';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { primaryColor } = useTheme();

  return (
    <Stack.Navigator>
      {/* Tabs : header vert sans titre */}
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{
          headerShown: false,
        }}
      />

      {/* Écrans enfants : header vert avec titre blanc */}
      <Stack.Screen
        name="CreateFamily"
        component={CreateFamily}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: primaryColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Créer une Tribu',
          headerTitleStyle: { color: 'white', fontWeight: 'bold' },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="SearchFamily"
        component={SearchFamily}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: primaryColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Rejoindre une Tribu',
          headerTitleStyle: { color: 'white', fontWeight: 'bold' },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="FamilyDetails"
        component={FamilyDetails}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: primaryColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Détails de la Tribu',
          headerTitleStyle: { color: 'white', fontWeight: 'bold' },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}
