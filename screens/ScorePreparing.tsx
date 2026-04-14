import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';
import { useTheme } from '../context/ThemeContext';

const backgroundMap: Record<string, any> = {
  vert: require('../assets/images/bg-vert.png'),
  jaune: require('../assets/images/bg-jaune.png'),
  orange: require('../assets/images/bg-orange.png'),
};

export default function ScorePreparing() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const setUser = useUserStore(state => state.setUser);
    const user = useUserStore(state => state.user);

    const score = route.params?.score ?? 0;

    const { themeColor } = useTheme();
    const backgroundImage = backgroundMap[themeColor];

    useEffect(() => {
        const timer = setTimeout(() => {

            if (user) setUser({ ...user, score: score });

            const parent = navigation.getParent();

            parent?.reset({
                index: 0,
                routes: [{ name: 'App' }],
            });

        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation, user, score, setUser]);

    return (
        <View className="flex-1">
            <ImageBackground
                source={backgroundImage}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
            >

                <View className='flex-1 justify-center items-center'>
                    <Text className="text-white text-3xl font-outfit-bold">
                        Parfait ! On prépare ton
                    </Text>
                    <Text className="text-white text-3xl font-outfit-bold">
                        score bien-être...
                    </Text>

                    <ActivityIndicator 
                        size="large" 
                        color="white" 
                        className='mt-12' 
                        style={{
                            transform: [{ scale: 1.5 }]
                        }} 
                    />
                </View>
                
            </ImageBackground>
        </View>
    );
}
