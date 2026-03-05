import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import { useNavigation } from '@react-navigation/native';
import useFamilyRealtime from '../hooks/useFamilyRealtime';
import DonutScore from '../components/DonutScore';
import JoinRequestItem from '../components/JoinRequestItem';
import FamilyMember from '../components/FamilyMember';
import Button from '../components/Button';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Home() {
  const user = useUserStore(state => state.user);
  const family = useFamilyStore(state => state.family);
  const setFamily = useFamilyStore(state => state.setFamily);
  const navigation = useNavigation<any>();
  const [isLoadingFamily, setIsLoadingFamily] = useState(false);

  // Active le WebSocket pour le temps réel
  useFamilyRealtime();

  if (!user || !user.score) return null;

  const handleJoinFamily = () => navigation.navigate('SearchFamily');
  const handleCreateFamily = () => navigation.navigate('CreateFamily');

  useEffect(() => {
    if (!user.familyId) return;

    const fetchFamily = async () => {
      setIsLoadingFamily(true);

      // Récupérer les infos de la famille
      try {
        const responseFamily = await fetch(`${API_URL}families/${user.familyId}`);
        const dataFamily = await responseFamily.json();

        if (!responseFamily.ok) return;

        // Récupérer les membres
        const responseMembers = await fetch(`${API_URL}users?familyId=${user.familyId}`);
        const dataMembers = await responseMembers.json();
 
        const familyWithMembers = {
          ...dataFamily.family,
          joinRequests: dataFamily.family.joinRequests.map((user: any) =>
            typeof user === 'string' ? { id: user, name: 'Utilisateur inconnu' } : user
          ),
          members: dataMembers.users,
        };

        setFamily(familyWithMembers);   
      } catch (error) {
        console.error('Erreur fetch famille :', error);
      } finally {
        setIsLoadingFamily(false);
      }
    };

    fetchFamily();
  }, [user.familyId, setFamily]);

  return (
    <SafeAreaView className='flex-1 bg-[#F7F5F8] '>
      {/* ScrollView pour toute la page */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <View className='flex-1 mt-10'>
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

            {isLoadingFamily ? (
              <View className="mt-6 items-center">
                <ActivityIndicator size="large" color="#00a16d" />
              </View>
            ) : family ? (
              <View className="mt-2 w-full">
                <Text className='text-gray-900 font-outfit text-lg'>Famille {family.name}</Text>

                {/* Demandes en attente */}
                {user.id === family.creatorId && family.joinRequests.length > 0 && (
                  <View>
                    {family.joinRequests.map(requestUser => (
                      <JoinRequestItem
                        key={requestUser.id}
                        requestUser={requestUser}
                        familyId={family.id}
                      />
                    ))}
                  </View>
                )}
                
                {/* Membres de la famille */}
                <View className="mt-2">
                  <Text className="font-outfit text-gray-600 mt-2">Membres :</Text>
                  
                  {family.members && family.members.length > 0 ? (
                    family.members.map(member => (
                      <FamilyMember key={member.id} member={member} />
                    ))
                  ) : (
                    <Text className="ml-2 text-gray-500 mt-2">Aucun membre pour le moment</Text>
                  )}
                </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
