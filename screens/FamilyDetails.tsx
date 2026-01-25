import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

interface Family {
    id: string;
    name: string;
    city: string;
    slogan: string | null;
    themes: string[];
}

export default function FamilyDetails() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const setFamily = useFamilyStore(state => state.setFamily);

    const { familyId } = route.params;

    const [familyDetails, setFamilyDetails] = useState<Family | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFamily = async () => {
            try {
                const response = await fetch(`${API_URL}families/${familyId}`);
                const data = await response.json();

                if (response.ok) {
                setFamilyDetails(data.family);
                }
            } catch (error) {
                console.error('Erreur fetch famille :', error);
            }
        };

        fetchFamily();
    }, [familyId]);

    const handleJoinFamily = async () => {
        if (!user || !familyDetails) return;

        try {
            const response = await fetch(`${API_URL}users/${user.id}/family`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ familyId: familyDetails.id }),
            });

            if (!response.ok) {
                setErrorMessage('Impossible de rejoindre cette famille.');
                return;
            }

            // ✅ Mise à jour stores
            setUser({ ...user, familyId: familyDetails.id });
            setFamily(familyDetails);

            navigation.navigate('Home');
        } catch (error) {
            console.error('Erreur rejoindre famille :', error);
            setErrorMessage('Erreur serveur.');
        }
    };

    if (!familyDetails) return null;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 mx-6 mt-10">
                <Text className="text-3xl font-peachy text-gray-900 mb-2">
                Famille {familyDetails.name}
                </Text>

                <Text className="text-lg text-gray-600 font-outfit mb-8">
                Ville : {familyDetails.city}
                </Text>

                {errorMessage && (
                <Text className="text-red-500 mb-4">{errorMessage}</Text>
                )}

                <TouchableOpacity
                    onPress={handleJoinFamily}
                    className="w-full h-[56px] rounded-[12px] bg-[#6C0FF2] items-center justify-center"
                    activeOpacity={0.8}
                >
                <Text className="font-peachy text-[20px] text-white">
                    Rejoindre la famille
                </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}