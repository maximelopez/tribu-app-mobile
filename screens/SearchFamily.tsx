import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'https://tribu-app.onrender.com/api/';

interface Family {
  id: string;
  name: string;
  city: string;
}

export default function SearchFamily() {
    const user = useUserStore(state => state.user);
    const navigation = useNavigation<any>();
    const [search, setSearch] = useState('');
    const [families, setFamilies] = useState<Family[]>([]);

    if (!user) return null;

    useEffect(() => {
        if (search.trim().length < 2) {
            setFamilies([]);
            return;
        }

        const fetchFamilies = async () => {
            try {
                const response = await fetch(API_URL + 'families?search=' + search);
                const data = await response.json();

                if (response.ok) {
                    setFamilies(data.families);
                }

            } catch (error) {
                console.error('Erreur recherche familles :', error);
            }
        };

        fetchFamilies();
    }, [search]);

    const renderItem = ({ item }: { item: Family }) => (
        <View className="bg-gray-100 rounded-xl p-4 mb-3">
        <Text className="text-lg font-peachy text-gray-900">{item.name}</Text>
        <Text className="text-gray-600 font-outfit mb-3">{item.city}</Text>

        <TouchableOpacity
            onPress={() => navigation.navigate('FamilyDetails', { familyId: item.id })}
            className="self-start px-4 py-2 rounded-lg bg-[#6C0FF2]"
            activeOpacity={0.8}
        >
            <Text className="text-white font-peachy">Rejoindre</Text>
        </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 mx-4'>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Rechercher une famille"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-4 font-outfit"
                />
                
                <FlatList
                    data={families}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};