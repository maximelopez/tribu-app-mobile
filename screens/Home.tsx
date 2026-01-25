import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
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

  // ✅ Active le WebSocket pour le temps réel
  useFamilyRealtime();

  if (!user || !user.score) return null;

  const handleJoinFamily = () => navigation.navigate('SearchFamily');
  const handleCreateFamily = () => navigation.navigate('CreateFamily');

  useEffect(() => {
    if (!user.familyId || family) return;

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
  }, [user.familyId, family]);

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
            <Text className='text-gray-900 font-outfit mt-2 text-lg'>Famille {family.name}</Text>
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
