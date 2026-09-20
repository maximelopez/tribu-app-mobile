import { useEffect, useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'https://tribu-app.onrender.com/api/';

interface Place {
  _id: string;
  categorie: string;
  nom: string;
  adresse: string;
  ville: string;
  latitude: number;
  longitude: number;
}

// --- Stats fictives temporaires (points/distance), en attendant que
// le backend les fournisse ---
const STATIC_PLACE_STATS = [
  { points: 30, distance: '8,2 km' },
  { points: 25, distance: '3,4 km' },
  { points: 15, distance: '5,1 km' },
  { points: 20, distance: '1,8 km' },
];
// --- Fin des données fictives ---

export default function Map() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch(API_URL + 'places?city=Angers');
        const data = await response.json();
        if (response.ok) setPlaces(data);
      } catch (error) {
        console.log('Erreur fetch places:', error);
      }
    };

    fetchPlaces();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(places.map(p => p.categorie)));
    return ['Tout', ...unique];
  }, [places]);

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === 'Tout') return places;
    return places.filter(p => p.categorie === selectedCategory);
  }, [places, selectedCategory]);

  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: 47.46,
          longitude: -0.55,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        style={styles.map}
      >
        {filteredPlaces.map(place => (
          <Marker
            key={place._id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            pinColor={theme.primary}
          />
        ))}
      </MapView>

      {/* Overlay haut : recherche + catégories */}
      <SafeAreaView style={styles.topOverlay} edges={['top']}>
        <View className="mx-4">
          <View
            className="flex-row items-center bg-white rounded-2xl px-4 h-[52px]"
            style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
          >
            <Feather name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Activités près de chez moi..."
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {categories.map(category => {
              const isActive = category === selectedCategory;
              return (
                <TouchableOpacity
                  key={category}
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
            })}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Overlay bas : offre partenaire + liste des lieux */}
      <View style={styles.bottomPanel}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Offre partenaire (placeholder statique) */}
          <View
            className="flex-row items-center rounded-2xl p-3 mb-3"
            style={{ backgroundColor: theme.primary }}
          >
            <View className="w-16 h-16 rounded-xl bg-white/20 items-center justify-center overflow-hidden">
              <Ionicons name="image-outline" size={24} color="white" />
            </View>
            <View className="flex-1 mx-3">
              <Text className="text-white font-outfit-bold text-xs">⭐ OFFRE PARTENAIRE</Text>
              <Text className="text-white font-peachy text-base mt-0.5">Terra Botanica</Text>
              <Text className="text-white/90 font-outfit text-xs mt-0.5">
                1 billet acheté = 1 offert jusqu'au 31 mai
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              className="bg-white rounded-full px-4 py-2"
            >
              <Text style={{ color: theme.primary }} className="font-outfit-bold text-xs">
                Réserver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Liste des lieux */}
          {filteredPlaces.map((place, index) => {
            const stats = STATIC_PLACE_STATS[index % STATIC_PLACE_STATS.length];
            return (
              <TouchableOpacity
                key={place._id}
                activeOpacity={0.85}
                className="flex-row items-center bg-white rounded-2xl p-3 mb-3"
                style={{
                  shadowColor: '#000',
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View className="w-16 h-16 rounded-xl bg-gray-100 items-center justify-center overflow-hidden">
                  <Ionicons name="image-outline" size={24} color="#9CA3AF" />
                </View>
                <View className="flex-1 mx-3">
                  <View className="flex-row items-center">
                    <Text className="font-outfit-bold text-gray-900 text-base">{place.nom}</Text>
                    <Text style={{ color: theme.primary }} className="font-outfit-bold text-sm ml-2">
                      +{stats.points} pts
                    </Text>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Feather name="map-pin" size={12} color="#9CA3AF" />
                    <Text className="text-gray-400 font-outfit text-xs ml-1">{stats.distance}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {filteredPlaces.length === 0 && (
            <Text className="text-gray-400 font-outfit text-center mt-4">
              Aucune activité trouvée dans cette catégorie.
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: Dimensions.get('window').height * 0.35,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 6,
  },
});