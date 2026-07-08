import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import useFamilyRealtime from '../hooks/useFamilyRealtime';
import JoinRequestItem from '../components/JoinRequestItem';
import FamilyMember from '../components/FamilyMember';
import Arrow from '../assets/icons/arrow.svg';
import ArrowGreen from '../assets/icons/arrow-green.svg';
import ArrowOrange from '../assets/icons/arrow-orange.svg';
import ArrowYellow from '../assets/icons/arrow-yellow.svg';
import Family from '../assets/icons/family.svg';
import FamilyGreen from '../assets/icons/family-green.svg';
import FamilyOrange from '../assets/icons/family-orange.svg';
import FamilyYellow from '../assets/icons/family-yellow.svg';
import FamilyLeaderboard from '../components/FamilyLeaderboard';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Home() {
  const user = useUserStore(state => state.user);
  const family = useFamilyStore(state => state.family);
  const setFamily = useFamilyStore(state => state.setFamily);
  const navigation = useNavigation<any>();
  const [isLoadingFamily, setIsLoadingFamily] = useState(false);
  const { theme, themeColor } = useTheme();

  const ArrowIcon = themeColor === 'orange' ? ArrowOrange : themeColor === 'jaune' ? ArrowYellow : ArrowGreen;
  const FamilyIcon = themeColor === 'orange' ? FamilyOrange : themeColor === 'jaune' ? FamilyYellow : FamilyGreen;

  // Active le WebSocket pour le temps réel
  useFamilyRealtime();

  if (!user) return null;

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

  const handleDiscoverActivities = () => {
    navigation.navigate('Activités');
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>

      {/* ScrollView pour toute la page */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <View className='flex-1'>
          <View className='w-full px-4 pt-6'>
            <Text className='text-gray-800 font-peachy text-3xl'>
              Bonjour, <Text style={{ color: theme.primary }}>{user?.name} 👋</Text>
            </Text>
          </View>
          
          <View className="px-4 mt-4">
            <View
              className="rounded-3xl px-5 py-6"
              style={{ backgroundColor: theme.primary }}
            >
              <Text className="text-white/80 font-outfit-bold text-xs tracking-widest">
                TRIBU
              </Text>
              <Text className="text-white font-peachy text-2xl mt-2 leading-tight">
                Crée des moments qui comptent vraiment
              </Text>
              <Text className="text-white/90 font-outfit mt-2">
                Rejoins ou crée une Tribu et vivez des activités ensemble.
              </Text>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleDiscoverActivities}
                className="bg-white rounded-full mt-5 py-4 items-center"
              >
                <Text className="font-outfit-bold text-base" style={{ color: theme.primary }}>
                  →  Découvrir les activités
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='px-4'>
            <View className='items-center mt-8'>
              

              {isLoadingFamily ? (
                <View className="mt-6 items-center">
                  <ActivityIndicator size="large" color={theme.primary} />
                </View>
              ) : family ? (
                <View className="w-full">

                  {/* Demandes en attente */}
                  {user.id === family.creatorId && family.joinRequests.length > 0 && (
                    <View className='mb-4'>
                      {family.joinRequests.map(requestUser => (
                        <JoinRequestItem
                          key={requestUser.id}
                          requestUser={requestUser}
                          familyId={family.id}
                        />
                      ))}
                    </View>
                  )}

                  <Text className='text-gray-800 font-peachy text-2xl mx-2'>Ma tribu</Text>

                  <FamilyLeaderboard
                    familyName={family.name}
                    members={family.members ?? []}
                    currentUserId={user.id}
                  />

                </View>
              ) : (
                <>
                  <Text className='text-gray-900 font-outfit mb-4 text-lg'>Tu n'as pas encore de Tribu</Text>
                  <View className='w-full gap-4'>
                    
                    <TouchableOpacity activeOpacity={0.9} onPress={handleJoinFamily}>
                      <View
                        className='flex-row items-center'
                        style={{ backgroundColor : theme.primary, borderRadius: 20, height: 100, paddingInline: 20 }}
                      >
                        <FamilyIcon />
                        <View className='flex-1 mx-4'>
                          <Text className='text-white font-bold'>Rejoindre une Tribu</Text>
                          <Text className='text-white'>Trouve ta Tribu dans la liste de recherche</Text>
                        </View>
                        <ArrowIcon />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      activeOpacity={0.9} 
                      onPress={handleCreateFamily} 
                      style={{ borderRadius: 20, borderWidth: 1, borderColor: '#CBD5E0', overflow: 'hidden' }}
                    >
                      <View
                        className='flex-row items-center'
                        style={{ height: 100, paddingInline: 20 }}
                      >
                        <Family />
                        <View className='flex-1 mx-4'>
                          <Text className='font-bold'>Créer une Tribu</Text>
                          <Text>Lance ton groupe et invite tes proches</Text>
                        </View>
                        <Arrow />
                      </View>
                    </TouchableOpacity>
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
