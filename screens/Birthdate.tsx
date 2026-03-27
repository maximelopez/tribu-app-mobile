import { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Birthdate() {
    const user = useUserStore(state => state.user);
    const navigation = useNavigation<any>();
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const handleNext = async () => {
        setError('');

        if (!day || !month || !year) {
            setError('Merci de remplir tous les champs.');
            return;
        }
        
        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (
            isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) ||
            dayNum < 1 || dayNum > 31 ||
            monthNum < 1 || monthNum > 12 ||
            yearNum < 1900 || yearNum > new Date().getFullYear()
        ) {
            setError('Date invalide.');
            return;
        }

        // Formater en ISO string YYYY-MM-DD
        const birthdate = `${yearNum.toString().padStart(4, '0')}-${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;

        if (!user?.id) return;

        try {
            const response = await fetch(`${API_URL}users/${user.id}/birthdate`, {
                 method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ birthdate }),
            });

            if (!response.ok) {
                setError('Erreur lors de la mise à jour');
                return;
            }

            const updatedUser = await response.json();
            console.log('Utilisateur mis à jour:', updatedUser);

            // Navigation vers la page suivante
            navigation.navigate('ThemeSelection');

        } catch (error) {
            console.log('Erreur sauvegarde date de naissance :', error);
            setError('Impossible de se connecter au serveur.');
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ImageBackground
                source={ require('../assets/images/bg-vert.png')}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
            >
                <View className='flex-1 px-4 justify-center'>
                    <Text className="text-3xl text-center text-white font-outfit mb-10">Avant de commencer...</Text>
                    <Text className="text-xl text-white font-outfit mb-10">Quelle est ta date de naissance :</Text>

                    <View className="flex-row justify-center gap-2 mb-10">
                        <TextInput
                            value={day}
                            onChangeText={setDay}
                            placeholder="DD"
                            keyboardType="numeric"
                            maxLength={2}
                            className="bg-white w-[115px] h-[40px] text-center rounded-2xl"
                        />
                        <TextInput
                            value={month}
                            onChangeText={setMonth}
                            placeholder="MM"
                            keyboardType="numeric"
                            maxLength={2}
                            className="bg-white w-[110px] h-[40px] text-center rounded-2xl"
                        />
                        <TextInput
                            value={year}
                            onChangeText={setYear}
                            placeholder="YYYY"
                            keyboardType="numeric"
                            maxLength={4}
                            className="bg-white w-[115px] h-[40px] text-center rounded-2xl"
                        />
                    </View>

                    {error ? (
                        <Text className="text-white text-center mb-4">{error}</Text>
                    ) : null}

                    <TouchableOpacity
                        onPress={handleNext}
                        className="mt-10 items-center"
                    >
                        <Text className="text-white font-bold text-lg">Suivant</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}