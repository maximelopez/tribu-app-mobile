import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import useFamilyRealtime from '../hooks/useFamilyRealtime';
import DonutScore from '../components/DonutScore';
import JoinRequestItem from '../components/JoinRequestItem';
import FamilyMember from '../components/FamilyMember';
import Button from '../components/Button';
import UsersIcon from '../assets/icons/users.svg';
import AddIcon from '../assets/icons/add.svg';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Home() {
  const user = useUserStore(state => state.user);
  const family = useFamilyStore(state => state.family);
  const setFamily = useFamilyStore(state => state.setFamily);
  const navigation = useNavigation<any>();
  const [isLoadingFamily, setIsLoadingFamily] = useState(false);
  const { theme } = useTheme();

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
  }, [user, setFamily]);

  return (
    <SafeAreaView className='flex-1 bg-[#F7F5F8] '>
      {/* ScrollView pour toute la page */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <View className='flex-1'>
          <View className='bg-white w-full px-4 py-5'>
            <Text className='text-gray-800 font-peachy text-3xl'>
              Bonjour, <Text style={{ color: theme.primary }}>{user?.name}</Text>
            </Text>
          </View>
          
          

          <View className='px-4'>
            <Text className='text-gray-900 font-outfit mb-5 mt-2 text-xl'>Ton score bien-être</Text>
            <DonutScore
              size={180}
              thickness={30}
              progress={user.score / 100}
              score={user.score}
            />

            <View className='items-center mt-8'>
              <Text className='text-gray-800 font-peachy text-3xl'>Tableau de bord</Text>

              {isLoadingFamily ? (
                <View className="mt-6 items-center">
                  <ActivityIndicator size="large" color={theme.primary} />
                </View>
              ) : family ? (
                <View className="mt-2 w-full">
                  <Text className='font-outfit text-xl text-center' style={{ color: theme.primary }}>
                      Tribu {family.name}
                  </Text>

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
                    <Text className="font-outfit text-gray-600 mt-2">Membres de cette Tribu :</Text>
                    
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
                  <Text className='text-gray-900 font-outfit mb-4 text-lg'>Tu n'as pas encore de Tribu</Text>
                  <View className='w-full gap-4'>
                    <Button 
                      title="Rejoindre une Tribu" 
                      onPress={handleJoinFamily}
                      icon={<UsersIcon fill="white" />}
                    />
                    <Button 
                      title="Créer une Tribu" 
                      onPress={handleCreateFamily}
                      icon={<AddIcon fill={theme.primary} />}
                      color={theme.secondary}
                      textColor={theme.primary}
                      borderColor={theme.primary}
                    />
                  </View>
                </>
              )}
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
