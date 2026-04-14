import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context/ThemeContext';
import Home from '../screens/Home';
import Dashboard from '../screens/Dashboard';
import Challenges from '../screens/Challenges';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';
import { View } from 'react-native';

import HomeIcon from '../assets/icons/home.svg';
import ChatIcon from '../assets/icons/chat.svg';
import BadgesIcon from '../assets/icons/badges.svg';
import DashboardIcon from '../assets/icons/dashboard.svg';
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
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
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
        name="Badges"
        component={Challenges}
        options={{
          tabBarIcon: ({ color, size }) => (
            <BadgesIcon width={20} height={20} fill={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: theme.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 18 ,
                borderColor: 'white',
                borderWidth: 4,
              }}
            >
              <DashboardIcon width={20} height={20} fill='white' />
            </View>
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
