import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const backgroundMap: Record<string, any> = {
  vert: require('../assets/images/bg-vert.png'),
  jaune: require('../assets/images/bg-jaune.png'),
  orange: require('../assets/images/bg-orange.png'),
};

export default function LoadingScreen() {
    const { themeColor } = useTheme();
    const backgroundImage = backgroundMap[themeColor];

    return (
        <View className="flex-1">
            <ImageBackground
                source={backgroundImage}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
            >
                <View className='flex-1 justify-center items-center'>
                    <Text className="text-white text-3xl font-outfit-bold">
                        Parfait !
                    </Text>
                    <Text className="text-white text-2xl font-outfit-bold">
                        On prépare ton application...
                    </Text>

                    <ActivityIndicator 
                        size="large" 
                        color="white" 
                        className='mt-12' 
                        style={{ transform: [{ scale: 1.5 }] }} 
                    />
                </View>
            </ImageBackground>
        </View>
    );
}
