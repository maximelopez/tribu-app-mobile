import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import HomeNavigator from './HomeNavigator';
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
            borderRadius: 15,
            },
        }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('HomeTab', { screen: 'Home' });
                    },
                })}
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