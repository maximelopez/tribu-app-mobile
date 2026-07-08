import { useEffect, useState } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { Feather } from '@expo/vector-icons';

const API_URL = 'https://tribu-app.onrender.com/api/';

const avatarMap: Record<number, any> = {
  1: require('../assets/images/avatar1.png'),
  2: require('../assets/images/avatar2.png'),
  3: require('../assets/images/avatar3.png'),
  4: require('../assets/images/avatar4.png'),
};

interface FamilyMemberPreview {
  id: string;
  avatar: number;
}

interface Family {
  id: string;
  name: string;
  city: string;
  members?: FamilyMemberPreview[];
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

        if (!response.ok) return;

        // Récupère les membres de chaque famille pour afficher les avatars + le nombre
        const familiesWithMembers = await Promise.all(
          data.families.map(async (family: Family) => {
            try {
              const res = await fetch(`${API_URL}users?familyId=${family.id}`);
              const d = await res.json();
              return { ...family, members: res.ok ? d.users : [] };
            } catch {
              return { ...family, members: [] };
            }
          })
        );

        setFamilies(familiesWithMembers);
      } catch (error) {
        console.error('Erreur recherche familles :', error);
      }
    };

    fetchFamilies();
  }, [search]);

  const renderItem = ({ item }: { item: Family }) => {
    const members = item.members ?? [];
    const visibleAvatars = members.slice(0, 3);
    const extraCount = members.length - visibleAvatars.length;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FamilyDetails', { familyId: item.id })}
        activeOpacity={0.85}
        className="bg-white rounded-2xl px-4 pt-4 pb-3 mb-3"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {/* Stack d'avatars */}
            <View className="flex-row" style={{ marginRight: 12 }}>
              {visibleAvatars.map((member, index) => (
                <Image
                  key={member.id}
                  source={avatarMap[member.avatar] ?? avatarMap[1]}
                  className="w-9 h-9 rounded-full border-2 border-white"
                  style={{ marginLeft: index === 0 ? 0 : -12 }}
                />
              ))}
              {extraCount > 0 && (
                <View
                  className="w-9 h-9 rounded-full bg-gray-200 items-center justify-center border-2 border-white"
                  style={{ marginLeft: -12 }}
                >
                  <Text className="text-gray-600 font-outfit-bold text-xs">+{extraCount}</Text>
                </View>
              )}
            </View>

            <View className="flex-1">
              <Text className="text-lg font-peachy text-gray-900">{item.name}</Text>
              <Text className="text-gray-500 font-outfit text-sm">
                {members.length} membre{members.length > 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <View className="w-9 h-9 rounded-full bg-gray-200 items-center justify-center">
            <Feather name="arrow-right" size={18} color="#4B5563" />
          </View>
        </View>

        <View className="h-[1px] bg-gray-100 my-3" />

        {/* Placeholders statiques niveau + badge (à brancher sur la vraie donnée plus tard) */}
        <View className="flex-row items-center gap-2">
          <View className="rounded-full px-3 py-1" style={{ backgroundColor: `${theme.primary}20` }}>
            <Text style={{ color: theme.primary }} className="text-xs font-outfit-bold">
              Niveau 3
            </Text>
          </View>
          <View className="rounded-full px-3 py-1 bg-gray-100">
            <Text className="text-xs text-gray-500 font-outfit">Aucun badge</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#F7F5F8]">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >

        <View className="mx-4 gap-3">
          {/* Barre de recherche */}
          <View
            className="flex-row items-center bg-white rounded-2xl px-4 h-[52px]"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 1 }}
          >
            <Feather name="search" size={18} color="#9CA3AF" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Rechercher une Tribu"
              placeholderTextColor="#9CA3AF"
              className="flex-1 font-outfit ml-2 text-base"
            />
            <View
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{ backgroundColor: `${theme.primary}25` }}
            >
              <Feather name="sliders" size={16} color={theme.primary} />
            </View>
          </View>

          {families.length > 0 && (
            <Text className="font-outfit-bold text-gray-800 mt-1">Résultats :</Text>
          )}
        </View>

        <View className="flex-1 mx-4 mt-2">
          <FlatList
            data={families}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}