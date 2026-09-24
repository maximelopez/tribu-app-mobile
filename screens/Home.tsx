import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import useFamilyRealtime from '../hooks/useFamilyRealtime';
import JoinRequestItem from '../components/JoinRequestItem';
import FamilyLeaderboard from '../components/FamilyLeaderboard';
import UsersGroup from '../assets/icons/users-group.svg';
import ChevronRightWhite from '../assets/icons/chevron-right-white.svg';
import ChevronRightGrey from '../assets/icons/chevron-right-grey.svg';

const API_URL = 'https://tribu-app.onrender.com/api/';

const CARD_SHADOW = {
  shadowColor: '#161616',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
};

export default function Home() {
  const user = useUserStore(state => state.user);
  const family = useFamilyStore(state => state.family);
  const setFamily = useFamilyStore(state => state.setFamily);
  const navigation = useNavigation<any>();
  const [isLoadingFamily, setIsLoadingFamily] = useState(false);
  const { theme } = useTheme();

  // Active le WebSocket pour le temps réel
  useFamilyRealtime();

  // Les hooks doivent toujours être appelés avant un return conditionnel
  useEffect(() => {
    if (!user?.familyId) return;

    const fetchFamily = async () => {
      setIsLoadingFamily(true);

      try {
        // Récupérer les infos de la famille
        const responseFamily = await fetch(`${API_URL}families/${user.familyId}`);
        const dataFamily = await responseFamily.json();

        if (!responseFamily.ok) return;

        // Récupérer les membres
        const responseMembers = await fetch(`${API_URL}users?familyId=${user.familyId}`);
        const dataMembers = await responseMembers.json();

        const familyWithMembers = {
          ...dataFamily.family,
          joinRequests: dataFamily.family.joinRequests.map((u: any) =>
            typeof u === 'string' ? { id: u, name: 'Utilisateur inconnu' } : u
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

  if (!user) return null;

  const handleJoinFamily = () => navigation.navigate('SearchFamily');
  const handleCreateFamily = () => navigation.navigate('CreateFamily');
  const handleFindActivity = () => navigation.navigate('Activités');

  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: '#F3F3F8' }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className='flex-1'>
          {/* Bonjour, Prénom */}
          <View className='w-full px-4 pt-6'>
            <Text className='font-outfit-bold text-2xl' style={{ color: '#161616' }}>
              Bonjour, <Text style={{ color: theme.primary }}>{user.name}</Text>
            </Text>
          </View>

          <View className='px-4'>
            <View className='items-center mt-4'>
              {isLoadingFamily ? (
                <View className='mt-6 items-center'>
                  <ActivityIndicator size='large' color={theme.primary} />
                </View>
              ) : family ? (
                <View className='w-full gap-3'>
                  {/* Demandes en attente (écran homepage-demande, à reprendre ensuite) */}
                  {user.id === family.creatorId && family.joinRequests.length > 0 && (
                    <View className='gap-3'>
                      {family.joinRequests.map(requestUser => (
                        <JoinRequestItem
                          key={requestUser.id}
                          requestUser={requestUser}
                          familyId={family.id}
                        />
                      ))}
                    </View>
                  )}

                  {/* Carte tribu : nom, niveau, classement */}
                  <FamilyLeaderboard
                    familyName={family.name}
                    members={family.members ?? []}
                    currentUserId={user.id}
                    levelInfo={family.levelInfo}
                  />

                  {/* Rien de prévu cette semaine */}
                  <View
                    className='flex-row items-center bg-white rounded-2xl p-5'
                    style={{ ...CARD_SHADOW, gap: 10 }}
                  >
                    <View
                      className='items-center justify-center rounded-full'
                      style={{ width: 65, height: 65, backgroundColor: theme.transparent }}
                    >
                      <Image
                        source={require('../assets/images/mascotte-activity.png')}
                        style={{ width: 40, height: 40 }}
                        resizeMode='contain'
                      />
                    </View>
                    <View className='flex-1 items-start' style={{ gap: 10 }}>
                      <Text className='font-outfit-bold text-base' style={{ color: '#161616' }}>
                        Rien de prévu cette semaine
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleFindActivity}
                        className='rounded-2xl items-center justify-center px-3'
                        style={{ height: 30, backgroundColor: theme.primary }}
                      >
                        <Text className='font-outfit-bold text-base text-white'>Trouver une activité</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  {/* Carte illustration */}
                  <View
                    className='w-full bg-white items-center p-4 gap-3 mb-4'
                    style={{
                      borderRadius: 24,
                      shadowColor: '#161616',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.04,
                      shadowRadius: 6,
                      elevation: 2,
                    }}
                  >
                    <View className='w-full items-center justify-center' style={{ height: 160 }}>
                      <View
                        className='items-center justify-center rounded-full'
                        style={{ width: 135, height: 135, backgroundColor: 'rgba(32, 193, 177, 0.1)' }}
                      >
                        <Image
                          source={require('../assets/images/mascotte-1.png')}
                          style={{ width: 115, height: 115 }}
                          resizeMode='contain'
                        />
                      </View>
                    </View>
                    <Text className='font-outfit text-base text-center' style={{ color: '#161616' }}>
                      Commencez par rejoindre ou créer votre Tribu pour vivre des activités en famille
                    </Text>
                  </View>

                  {/* Boutons Rejoindre / Créer */}
                  <View className='w-full gap-3'>
                    <TouchableOpacity activeOpacity={0.9} onPress={handleJoinFamily}
                      // fond + radius nécessaires pour que l'ombre s'affiche sur Android
                      style={{ ...CARD_SHADOW, borderRadius: 16, backgroundColor: theme.primary }}
                    >
                      {/* Dégradé Figma : Color -> Color-Gradient, de gauche à droite */}
                      <LinearGradient
                        colors={[theme.primary, theme.gradient]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 16,
                          borderRadius: 16,
                          height: 101,
                          paddingHorizontal: 21,
                        }}
                      >
                        <View
                          className='items-center justify-center'
                          style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <UsersGroup width={24} height={24} />
                        </View>
                        <View className='flex-1 gap-0.5'>
                          <Text className='font-outfit-bold text-base text-white'>Rejoindre une Tribu</Text>
                          <Text className='font-outfit text-sm' style={{ color: 'rgba(255,255,255,0.88)' }}>
                            Trouve ta Tribu dans la liste de recherche
                          </Text>
                        </View>
                        <ChevronRightWhite width={24} height={24} />
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} onPress={handleCreateFamily}>
                      <View
                        className='flex-row items-center gap-4 bg-white'
                        style={{
                          ...CARD_SHADOW,
                          borderRadius: 20,
                          height: 101,
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          className='items-center justify-center'
                          style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#CBD5E0' }}
                        >
                          <Text style={{ fontSize: 24, color: '#000' }}>＋</Text>
                        </View>
                        <View className='flex-1 gap-0.5'>
                          <Text className='font-outfit-bold text-base' style={{ color: '#111' }}>
                            Créer une Tribu
                          </Text>
                          <Text className='font-outfit text-sm' style={{ color: '#888' }}>
                            Lance ton groupe et invite tes proches
                          </Text>
                        </View>
                        <ChevronRightGrey width={24} height={24} />
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
