import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

const backgroundMap: Record<string, any> = {
  vert: require('../assets/images/bg-vert.png'),
  jaune: require('../assets/images/bg-jaune.png'),
  orange: require('../assets/images/bg-orange.png'),
};

const avatarMap: Record<number, any> = {
  1: require('../assets/images/avatar1.png'),
  2: require('../assets/images/avatar2.png'),
  3: require('../assets/images/avatar3.png'),
  4: require('../assets/images/avatar4.png'),
};

const avatars = [1, 2, 3, 4];

export default function AvatarSelection() {
    const { themeColor } = useTheme();
    const backgroundImage = backgroundMap[themeColor];

    const user = useUserStore(state => state.user);
    const navigation = useNavigation<any>();

    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(
        user?.avatar ?? null
    );

    const changeAvatar = async (avatar: number) => {
        setSelectedAvatar(avatar);

        if (!user?.id) return;

        try {
            await fetch(`${API_URL}users/${user.id}/avatar`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatar }),
            });

            useUserStore.getState().setUser(prev => prev ? { ...prev, avatar } : prev);

        } catch (error) {
            console.log('Erreur sauvegarde avatar:', error);
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
                    <Text className="text-3xl text-center text-white font-outfit-bold mb-24">
                        Avant de commencer...
                    </Text>
                    <Text className="text-xl text-white font-outfit mb-6 mx-auto">
                        Choisissez votre avatar :
                    </Text>

                    <View className="flex-row gap-[20px] justify-center flex-wrap">
                        {avatars.map((avatar) => (
                            <TouchableOpacity
                                key={avatar}
                                onPress={() => changeAvatar(avatar)}
                                className={`rounded-full overflow-hidden ${
                                    selectedAvatar === avatar ? 'border-white border-4' : ''
                                }`}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={avatarMap[avatar]}
                                    className="w-[70px] h-[70px]"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoadingScreen')}
                        className="mt-24 items-center"
                        activeOpacity={0.8}
                        disabled={!selectedAvatar}
                    >
                        <Text className={`font-outfit-bold text-2xl underline ${
                            selectedAvatar ? 'text-white' : 'text-white/40'
                        }`}>
                            Suivant
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}