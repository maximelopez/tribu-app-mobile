import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import { useTheme } from '../context/ThemeContext';
import Topic from '../components/Topic';

const API_URL = 'https://tribu-app.onrender.com/api/';

interface Family {
    id: string;
    name: string;
    city: string;
    slogan: string | null;
    topics: string[];
    creatorId: string;
    joinRequests: string[];
}

export default function FamilyDetails() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { theme } = useTheme();

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
            const response = await fetch(`${API_URL}families/${familyDetails.id}/join-requests`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: user.id,
                }),
            });

            if (!response.ok) {
                setErrorMessage('Impossible de rejoindre cette famille.');
                return;
            }

            navigation.navigate('Tabs');
        } catch (error) {
            console.error('Erreur rejoindre famille :', error);
            setErrorMessage('Erreur serveur.');
        }
    };

    if (!familyDetails) return null;

    return (
        <View className="flex-1 bg-[#F7F5F8]">
            <View className="flex-1 mx-6 mt-10">
                <Text className="text-xl text-center font-outfit-bold mb-2" style={{ color: theme.primary }}>
                    {familyDetails.name}
                </Text>

                <Text className="text-xl text-center font-outfit mb-2" style={{ color: theme.primary }}>
                    {familyDetails.slogan}
                </Text>

                <Text className="text-lg text-center text-gray-600 font-outfit mb-8">
                    Ville : {familyDetails.city}
                </Text>

                <Text className="text-lg text-center text-gray-600 font-outfit mb-8">Thématiques :</Text>
                <View className='flex-row flex-wrap gap-2 mb-6'>
                    {familyDetails.topics.map((topic) => {
                        return (
                            <Topic key={topic} label={topic} />
                        )
                    })}
                </View>

                {errorMessage && (
                <Text className="text-red-500 mb-4">{errorMessage}</Text>
                )}

                <TouchableOpacity
                    onPress={handleJoinFamily}
                    className="w-full h-[48px] rounded-[16px] items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                    activeOpacity={0.8}
                >
                <Text className="font-outfit text-[20px] text-white">
                    Envoyer une demande
                </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}