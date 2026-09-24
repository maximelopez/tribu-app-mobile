import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  House as HomeIcon,
  Trophy as RewardsIcon,
  TicketCheck as ActivityIcon,
  MessagesCircle as ChatIcon,
  User as ProfileIcon,
} from 'lucide-react-native';
import TabBar, { TAB_ICON_SIZE } from '../components/TabBar';
import Home from '../screens/Home';
import Activities from '../screens/Activities';
import Rewards from '../screens/Rewards';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

// Icônes Lucide de la maquette, trait de 2
const ICON_SIZE = TAB_ICON_SIZE;
const STROKE = 2;

export default function AppTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#F3F3F8' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <HomeIcon size={ICON_SIZE} color={color} strokeWidth={STROKE} />,
        }}
      />

      <Tab.Screen
        name="Récompenses"
        component={Rewards}
        options={{
          tabBarIcon: ({ color }) => <RewardsIcon size={ICON_SIZE} color={color} strokeWidth={STROKE} />,
        }}
      />

      <Tab.Screen
        name="Activités"
        component={Activities}
        options={{
          tabBarIcon: ({ color }) => <ActivityIcon size={ICON_SIZE} color={color} strokeWidth={STROKE} />,
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color }) => <ChatIcon size={ICON_SIZE} color={color} strokeWidth={STROKE} />,
        }}
      />

      <Tab.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon size={ICON_SIZE} color={color} strokeWidth={STROKE} />,
        }}
      />
    </Tab.Navigator>
  );
}
