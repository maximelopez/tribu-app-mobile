import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Score from '../screens/Score';
import Dashboard from '../screens/Dashboard';
import Challenges from '../screens/Challenges';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#6C0FF2",
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
                tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Score"
                component={Score}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="insights" size={size} color={color} />,
                }}
            />
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
                name="Profile"
                component={Profile}
                options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="account-circle" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    )
}