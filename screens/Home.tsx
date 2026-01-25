import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import { useNavigation } from '@react-navigation/native';
import useFamilyRealtime from '../hooks/useFamilyRealtime';
import DonutScore from '../components/DonutScore';
import Button from '../components/Button';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Home() {
  const user = useUserStore(state => state.user);
  const family = useFamilyStore(state => state.family);
  const setFamily = useFamilyStore(state => state.setFamily);
  const navigation = useNavigation<any>();

  // Active le WebSocket pour le temps réel
  useFamilyRealtime();

  if (!user || !user.score) return null;

  const handleJoinFamily = () => navigation.navigate('SearchFamily');
  const handleCreateFamily = () => navigation.navigate('CreateFamily');

  useEffect(() => {
    if (!user.familyId) return;

    const fetchFamily = async () => {
      try {
        const response = await fetch(`${API_URL}families/${user.familyId}`);
        const data = await response.json();

        if (response.ok) setFamily(data.family);
      } catch (error) {
        console.error('Erreur fetch famille :', error);
      }
    };

    fetchFamily();
  }, [user.familyId, setFamily]);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 mt-10 mx-4'>
        <Text className='text-gray-800 font-peachy text-3xl'>Bonjour, {user?.name}</Text>
        <Text className='text-gray-900 font-outfit mb-10 text-xl'>Ton score bien-être</Text>
        <DonutScore
          size={220}
          thickness={35}
          progress={user.score / 100}
          score={user.score}
          activities={[
            { label: 'Sport', icon: '🏀', points: 25, position: 'left' },
            { label: 'Cuisine', icon: '🍳', points: 8, position: 'right' },
            { label: 'Lecture', icon: '📘', points: 5, position: 'bottom' },
          ]}
        />

        <View className='items-center mt-10'>
          <Text className='text-gray-800 font-peachy text-3xl'>Ma famille</Text>

          {family ? (
            <View className="mt-2 w-full">
              <Text className='text-gray-900 font-outfit text-lg'>Famille {family.name}</Text>

              {/* Demandes en attente (si créateur) */}
              {user.id === family.creatorId && family.joinRequests.length > 0 && (
  <View className="mt-4">
    <Text className="font-outfit text-gray-600">Demandes en attente :</Text>

    {family.joinRequests.map(requestUserId => (
      <View key={requestUserId} className="flex-row items-center justify-between mt-2 bg-gray-100 p-2 rounded-lg">
        <Text className="ml-2 text-gray-800">{requestUserId}</Text>
        
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={async () => {
              try {
                const response = await fetch(`${API_URL}families/respond-request`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    familyId: family.id,
                    userId: requestUserId,
                    accept: true,
                  }),
                });
                if (response.ok) {
                  // Supprime la demande du store
                  setFamily(prev => prev ? {
                    ...prev,
                    joinRequests: prev.joinRequests.filter(id => id !== requestUserId),
                  } : prev);
                }
              } catch (err) {
                console.error(err);
              }
            }}
            className="px-3 py-1 rounded bg-green-500"
          >
            <Text className="text-white">✅</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              try {
                const response = await fetch(`${API_URL}families/respond-request`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    familyId: family.id,
                    userId: requestUserId,
                    accept: false,
                  }),
                });
                if (response.ok) {
                  // Supprime la demande du store
                  setFamily(prev => prev ? {
                    ...prev,
                    joinRequests: prev.joinRequests.filter(id => id !== requestUserId),
                  } : prev);
                }
              } catch (err) {
                console.error(err);
              }
            }}
            className="px-3 py-1 rounded bg-red-500"
          >
            <Text className="text-white">❌</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
)}

            </View>
          ) : (
            <>
              <Text className='text-gray-900 font-outfit mb-4 text-lg'>Vous ne faites pas encore partie d'une famille</Text>
              <View className='w-full gap-4'>
                <Button title="Rejoindre une famille" onPress={handleJoinFamily} />
                <Button title="Créer une famille" onPress={handleCreateFamily} />
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
