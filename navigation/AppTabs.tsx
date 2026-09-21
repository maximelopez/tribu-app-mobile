import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import {
  House as HomeIcon,
  PartyPopper as ActivityIcon,
  Trophy as RewardsIcon,
  MessageCircle as ChatIcon,
  User as ProfileIcon,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import Home from '../screens/Home';
import Activities from '../screens/Activities';
import Rewards from '../screens/Rewards';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

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
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            android_ripple={{ color: 'transparent' }}
            pressColor="transparent"
            pressOpacity={1}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      <Tab.Screen
        name="Activités"
        component={Activities}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ActivityIcon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      <Tab.Screen
        name="Récompenses"
        component={Rewards}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <RewardsIcon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ChatIcon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
