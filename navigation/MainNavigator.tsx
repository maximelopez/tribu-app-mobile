import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../context/UserContext';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    const { user } = useUser();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="AppTabs" component={AppTabs} />
            ): (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                </>
            )}
        </Stack.Navigator>
    )
}
