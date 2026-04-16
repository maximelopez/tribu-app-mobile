import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import CreateFamily from '../screens/CreateFamily';
import SearchFamily from '../screens/SearchFamily';
import FamilyDetails from '../screens/FamilyDetails';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreateFamily"
        component={CreateFamily}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Créer une Tribu',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: { backgroundColor: '#F7F5F8' }
        }}
      />

      <Stack.Screen
        name="SearchFamily"
        component={SearchFamily}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Rejoindre une Tribu',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: { backgroundColor: '#F7F5F8' }
        }}
      />

      <Stack.Screen
        name="FamilyDetails"
        component={FamilyDetails}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: 'Détails de la Tribu',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: { backgroundColor: '#F7F5F8' }
        }}
      />
    </Stack.Navigator>
  );
}
