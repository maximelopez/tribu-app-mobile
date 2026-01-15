import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from '../store/userStore';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import AppTabs from './AppTabs';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    const user = useUserStore(state => state.user);

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
