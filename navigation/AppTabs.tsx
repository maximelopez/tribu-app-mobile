import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import HomeNavigator from './HomeNavigator';
import Score from '../screens/Score';
import Dashboard from '../screens/Dashboard';
import Challenges from '../screens/Challenges';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    const { primaryColor } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: primaryColor,
            tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            borderRadius: 15,
            },
        }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('HomeTab', { screen: 'Home' });
                    },
                })}
            />
            {/* <Tab.Screen
                name="Score"
                component={Score}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="insights" size={size} color={color} />,
                }}
            /> */}
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="bar-chart" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Challenges"
                component={Challenges}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="emoji-events" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="forum" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profil"
                component={Profile}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="account-circle" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    )
}