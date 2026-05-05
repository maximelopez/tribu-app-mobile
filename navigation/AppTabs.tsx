import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import Home from '../screens/Home';
import Activities from '../screens/Activities';
import Map from '../screens/Map';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

import HomeIcon from '../assets/icons/home.svg';
import MapIcon from '../assets/icons/map.svg';
import ActivityIcon from '../assets/icons/activity.svg';
import ChatIcon from '../assets/icons/chat.svg';
import ProfileIcon from '../assets/icons/profile.svg';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: '#161616',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <HomeIcon width={20} height={20} fill={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Carte"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MapIcon width={20} height={20} fill={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Activités"
        component={Activities}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ActivityIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChatIcon width={20} height={20} fill={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon width={20} height={20} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
