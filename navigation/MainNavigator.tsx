import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from '../store/userStore';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Birthdate from '../screens/Birthdate';
import ThemeSelection from '../screens/ThemeSelection';
import WelcomeQuiz from '../screens/WelcomeQuiz';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    const user = useUserStore(state => state.user);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                <>
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Login" component={Login} />
                </>
            ) : user.score == null ? (
                <>
                    <Stack.Screen name='Birthdate' component={Birthdate} />
                    <Stack.Screen name='ThemeSelection' component={ThemeSelection} />
                    <Stack.Screen name="WelcomeQuiz" component={WelcomeQuiz} />
                </>
            ) : (
                <Stack.Screen name="App" component={AppStack} />
            )}
        </Stack.Navigator>
    );
}
