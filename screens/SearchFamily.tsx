import { useEffect, useState } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

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
    const { theme } = useTheme();

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
        <TouchableOpacity
            onPress={() => navigation.navigate('FamilyDetails', { familyId: item.id })}
            activeOpacity={0.8}
            className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between h-[88px]"
        >
            <View>
                <Text className="text-lg font-peachy text-gray-900">{item.name}</Text>
                <Text className="text-gray-600 font-outfit mb-3">{item.city}</Text>
            </View>    
            <Text style={{ color: theme.primary }}>Détails</Text>
        </TouchableOpacity>
    );

    return (
        <View className='flex-1 bg-[#F7F5F8]'>
            
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View className='flex-1 mx-4 mt-4 gap-[10px]'>
                    <Text>Rechercher une Tribu :</Text>
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Saisissez votre recherche"
                        className="border border-gray-300 rounded-xl px-4 font-outfit h-[48px]"
                    />
            
                    <FlatList
                        data={families}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};