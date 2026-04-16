import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, ThemeColor } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

const backgroundMap: Record<string, any> = {
  vert: require('../assets/images/bg-vert.png'),
  jaune: require('../assets/images/bg-jaune.png'),
  orange: require('../assets/images/bg-orange.png'),
};

export default function ThemeSelection() {
    const { themeColor, setThemeColor } = useTheme();
    const backgroundImage = backgroundMap[themeColor];

    const user = useUserStore(state => state.user);
    const navigation = useNavigation<any>();

    const colors: ThemeColor[] = ['vert', 'jaune', 'orange'];

    const changeTheme = async (color: ThemeColor) => {
        // 1 - mise à jour immédiate de l'UI
        setThemeColor(color);

        if (!user?.id) return;

        try {
            // 2 - sauvegarde dans le backend
            await fetch(`${API_URL}users/${user.id}/theme`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ theme: color }),
            });

            // 3 - mise à jour dans le store
            useUserStore.getState().setUser(prev => prev ? { ...prev, theme: color } : prev);

        } catch (error) {
            console.log('Erreur sauvegarde thème:', error);
        }

    };

    return (
        <View className="flex-1">
            <ImageBackground
                source={backgroundImage}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
            >
                <View className='flex-1 px-4 mt-24'>
                    <Image
                        source={require('../assets/images/logo-tribu.png')}
                        className="w-[179px] h-[179px] mx-auto mt-5"
                    />

                    <Text className="text-3xl text-center text-white font-outfit-bold mb-24">Avant de commencer...</Text>
                    <Text className="text-xl text-white font-outfit mb-2 mx-auto">Choisissez la couleur de thème :</Text>

                    <View className="flex-row gap-[30px] justify-center">
                        {colors.map((color) => {
                        const colorHex = color === 'vert' ? '#00a16d' :
                                        color === 'jaune' ? '#ff9d00' :
                                        '#ea4a1f';
                        return (
                            <TouchableOpacity
                                key={color}
                                onPress={() => changeTheme(color)}
                                className={`w-[45px] h-[45px] rounded-full ${themeColor === color && 'border-white border-4'}`}
                                style={{ backgroundColor: colorHex }}
                            />
                        );
                        })}
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('WelcomeQuiz')}
                        className="mt-24 items-center"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-outfit-bold text-2xl underline">Suivant</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}