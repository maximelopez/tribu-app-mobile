import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from '../store/userStore';

import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Birthdate from '../screens/Birthdate';
import ThemeSelection from '../screens/ThemeSelection';
import AvatarSelection from '../screens/AvatarSelection';
import LoadingScreen from '../screens/LoadingScreen';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    const user = useUserStore(state => state.user);

    // L'onboarding est complet si toutes les infos sont renseignées
    const onboardingCompleted = !!(user?.birthdate && user?.theme && user?.avatar);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!user ? (
                <>
                    <Stack.Screen 
                        name="Signup" 
                        component={Signup} 
                    />
                    <Stack.Screen 
                        name="Login" 
                        component={Login} 
                    />
                </>
            ) : !onboardingCompleted ? (
                <>
                    <Stack.Screen 
                        name='Birthdate' 
                        component={Birthdate} 
                    />
                    <Stack.Screen 
                        name='ThemeSelection' 
                        component={ThemeSelection}
                        options={{
                            headerShown: true,
                            headerTitle: '',
                            headerBackTitle: 'Date de naissance',
                            headerStyle: { backgroundColor: 'transparent' },
                            headerTransparent: true,
                            headerShadowVisible: false,
                            headerTintColor: 'white',
                            headerBackButtonDisplayMode: 'minimal',
                        }}
                    />
                    <Stack.Screen 
                        name='AvatarSelection' 
                        component={AvatarSelection}
                        options={{
                            headerShown: true,
                            headerTitle: '',
                            headerBackTitle: 'Thème',
                            headerStyle: { backgroundColor: 'transparent' },
                            headerTransparent: true,
                            headerShadowVisible: false,
                            headerTintColor: 'white',
                            headerBackButtonDisplayMode: 'minimal',
                        }}
                    />
                    <Stack.Screen 
                        name="LoadingScreen"
                        component={LoadingScreen}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <Stack.Screen name="App" component={AppStack} />
            )}
        </Stack.Navigator>
    );
}
