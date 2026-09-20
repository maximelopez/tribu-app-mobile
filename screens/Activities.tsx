import { useEffect, useState, useMemo } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';

const API_URL = 'https://tribu-app.onrender.com/api/';

interface Activity {
  _id: string;
  name: string;
  description: string;
  city: string;
  members: string[];
  url: string;
  createdAt: string;
  updatedAt: string;
}

// --- Points fictifs temporaires, en dur, en attendant que le backend
// fournisse un vrai système de points par activité ---
const STATIC_POINTS = [25, 50, 30, 15, 40];
// --- Fin des données fictives ---

// Catégories purement visuelles pour l'instant : Activity n'a pas encore
// de champ "categorie" en base, donc ça ne filtre rien.
const STATIC_CATEGORIES = ['Tout', 'Cinéma', 'Sport', 'Culture', 'Parc'];

export default function Activities() {
  const { theme } = useTheme();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tout');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(API_URL + 'activities');
        const data = await response.json();
        if (response.ok) setActivities(data);
      } catch (error) {
        console.log('Erreur fetch activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Le seul filtre réellement actif pour l'instant : la recherche texte
  const filteredActivities = useMemo(() => {
    if (search.trim().length === 0) return activities;
    const query = search.trim().toLowerCase();
    return activities.filter(
      a =>
        a.name.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
    );
  }, [activities, search]);

  const renderItem = ({ item, index }: { item: Activity; index: number }) => {
    const points = STATIC_POINTS[index % STATIC_POINTS.length];

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        className="flex-row items-center bg-white rounded-2xl p-3 mb-3"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        }}
      >
        <View className="w-16 h-16 rounded-xl bg-gray-100 items-center justify-center overflow-hidden">
          <Ionicons name="image-outline" size={24} color="#9CA3AF" />
        </View>

        <View className="flex-1 mx-3">
          <View className="flex-row items-center flex-wrap">
            <Text className="font-outfit-bold text-gray-900 text-base">{item.name}</Text>
            <Text style={{ color: theme.primary }} className="font-outfit-bold text-sm ml-2">
              + {points} pts
            </Text>
          </View>
          <Text className="text-gray-400 font-outfit text-xs mt-1" numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <View className="w-9 h-9 rounded-full bg-gray-200 items-center justify-center">
          <Feather name="arrow-right" size={18} color="#4B5563" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-[#F7F5F8]">
      <View className="mx-4 mt-10 gap-3">
        {/* Barre de recherche */}
        <View
          className="flex-row items-center bg-white rounded-2xl px-4 h-[52px]"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 1 }}
        >
          <Feather name="search" size={18} color="#9CA3AF" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Rechercher une activité"
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

        {/* Onglets Tout / Gratuites / Partenaires — non fonctionnels pour l'instant */}
        <View
          className="flex-row bg-white rounded-2xl p-1"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 }}
        >
          <View
            className="flex-1 items-center py-2 rounded-xl"
            style={{ backgroundColor: theme.primary }}
          >
            <Text className="text-white font-outfit-bold text-sm">Tout</Text>
          </View>
          <View className="flex-1 items-center py-2 opacity-40">
            <Text className="text-gray-500 font-outfit text-sm">Gratuites</Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center py-2 opacity-40">
            <View className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-1" />
            <Text className="text-gray-500 font-outfit text-sm">Partenaires</Text>
          </View>
        </View>

        {/* Toggle offres partenaires — désactivé, pas encore de données */}
        <View
          className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 opacity-50"
          style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 }}
        >
          <Text className="text-gray-700 font-outfit text-sm">Inclure les offres partenaires</Text>
          <Switch value={false} disabled trackColor={{ true: theme.primary }} />
        </View>

        {/* Catégories — purement visuelles, ne filtrent rien pour l'instant */}
        <FlatList
          horizontal
          data={STATIC_CATEGORIES}
          keyExtractor={c => c}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ paddingRight: 16, paddingVertical: 6 }}
          renderItem={({ item: category }) => {
            const isActive = category === selectedCategory;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.85}
                className="rounded-full px-4 py-2 mr-2"
                style={{
                  backgroundColor: isActive ? theme.primary : 'white',
                  shadowColor: '#000',
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <Text
                  className="font-outfit-bold text-sm"
                  style={{ color: isActive ? 'white' : '#374151' }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <Text className="text-gray-700 font-outfit-bold">
          {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''} trouvée
          {filteredActivities.length > 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredActivities}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
      />
    </View>
  );
}
