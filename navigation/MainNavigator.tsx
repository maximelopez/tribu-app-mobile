import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    const isLoggedIn = true;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                </>
            ) : (
                <Stack.Screen name="AppTabs" component={AppTabs} />
            )}
        </Stack.Navigator>
    )
}
