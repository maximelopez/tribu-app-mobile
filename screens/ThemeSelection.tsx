import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, ThemeColor } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const backgroundMap: Record<string, any> = {
  vert: require('../assets/images/bg-vert.png'),
  jaune: require('../assets/images/bg-jaune.png'),
  orange: require('../assets/images/bg-orange.png'),
};

export default function ThemeSelection() {
    const { themeColor, setThemeColor, primaryColor } = useTheme();
    const backgroundImage = backgroundMap[themeColor];

    const navigation = useNavigation<any>();

    const colors: ThemeColor[] = ['vert', 'jaune', 'orange'];

    const handleStartQuiz = () => {
        navigation.navigate('WelcomeQuiz');
    };

    return (
        <SafeAreaView className="flex-1 it">
            <ImageBackground
                source={backgroundImage}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
            >
                <View className='flex-1 px-4 justify-center'>
                    <Text className="text-3xl text-center text-white font-outfit mb-10">Avant de commencer...</Text>
                    <Text className="text-xl text-white font-outfit mb-10">Choisissez la couleur de thème :</Text>

                    <View className="flex-row gap-[30px] justify-center">
                        {colors.map((color) => {
                        const colorHex = color === 'vert' ? '#00a16d' :
                                        color === 'jaune' ? '#ff9d00' :
                                        '#ea4a1f';
                        return (
                            <TouchableOpacity
                                key={color}
                                onPress={() => setThemeColor(color)}
                                className={`w-[45px] h-[45px] rounded-full ${themeColor === color && 'border-white border-4'}`}
                                style={{ backgroundColor: colorHex }}
                            />
                        );
                        })}
                    </View>

                    <TouchableOpacity
                        onPress={handleStartQuiz}
                        className="mt-10 items-center"
                    >
                        <Text className="text-white font-bold text-lg">Suivant</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}