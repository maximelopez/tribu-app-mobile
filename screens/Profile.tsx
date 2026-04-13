import { View, Image, ScrollView, Text, Modal, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Button from '../components/Button';
import { useState } from "react";
import { useTheme } from '../context/ThemeContext';

const API_URL = 'https://tribu-app.onrender.com/api/';

type Avatar = {
  id: number;
  src: any;
};

export default function Profile() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser)
  const logout = useUserStore(state => state.logout);
  const clearFamily = useFamilyStore(state => state.clearFamily);
  const { theme } = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutUser = () => {
    logout();
    clearFamily();
  };

  const avatars = [
    { id: 1, src: require('../assets/images/avatar1.png') },
    { id: 2, src: require('../assets/images/avatar2.png') },
    { id: 3, src: require('../assets/images/avatar3.png') },
    { id: 4, src: require('../assets/images/avatar4.png') },
  ];

  const currentAvatar =
    user?.avatar
      ? avatars.find(a => a.id === user.avatar) || avatars[0]
      : avatars[0];

  const handleSelectAvatar = async (avatar: Avatar) => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await fetch(`${API_URL}users/${user?.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar: avatar.id }),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
          setShowModal(false);
        }

      } catch (error) {
        console.error('Erreur avatar:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F5F8]" edges={['top']}>
      <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text className="text-[32px] font-peachy mt-10 text-center">Profil</Text>

        <View className="flex-2 items-center px-4">
          <Pressable onPress={() => setShowModal(true)}>
            <Image
              source={currentAvatar.src}
              className="w-[164px] h-[164px] mb-5"
            />
          </Pressable>

          <Text className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</Text>
          <Text className="text-gray-600 text-lg mb-4">{user?.email}</Text>
          <ThemeSwitcher />

          {/* <Text className="text-[32px] text-gray-900 font-peachy text-center mb-4 mt-10"> Mes statistiques</Text> */}


          <View className="w-full px-4 mt-4 mb-8 items-center">
            <Text className="text-[32px] font-peachy mb-8 mt-4">Mes thématiques</Text>

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1 h-[30px] rounded-[15px] px-3 justify-center items-center" style={{ backgroundColor: theme.secondary }}>
                <Text className="font-outfit" style={{ color: theme.primary}}>
                  Cuisine & Nutrition
                </Text>
              </View>

              <View className="flex-1 h-[30px] rounded-[15px] px-3 justify-center items-center" style={{ backgroundColor: theme.secondary }}>
                <Text className="font-outfit" style={{ color: theme.primary}}>
                  Sport & Activités
                </Text>
              </View>
            </View>

            <View className="flex-row gap-4 mb-4">
              <View className="flex-1 h-[30px] rounded-[15px] px-3 justify-center items-center" style={{ backgroundColor: theme.secondary }}>
                <Text className="font-outfit" style={{ color: theme.primary}}>
                  Lecture & Culture
                </Text>
              </View>

              <View className="flex-1 h-[30px] rounded-[15px] px-3 justify-center items-center" style={{ backgroundColor: theme.secondary }}>
                <Text className="font-outfit" style={{ color: theme.primary}}>
                  Vie sociale
                </Text>
              </View>
            </View>

            <View className="flex-1 h-[30px] rounded-[15px] px-3 justify-center items-center" style={{ backgroundColor: theme.secondary }}>
              <Text className="font-outfit" style={{ color: theme.primary}}>
                Développement personnel
              </Text>
            </View>

          </View>
          
          <Button title="Se déconnecter" onPress={logoutUser} />

        </View>
      </ScrollView>

      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">

          <View className="bg-white p-6 rounded-2xl w-[260px]">

            <View className="flex-row flex-wrap justify-center gap-4">

              {avatars.map((avatar) => {
                const isSelected = user?.avatar === avatar.id;

                return (
                  <Pressable
                    key={avatar.id}
                    disabled={loading}
                    onPress={() => handleSelectAvatar(avatar)}
                    className={`p-1 rounded-full ${
                      isSelected
                        ? 'border-4 border-black'
                        : 'border border-transparent'
                    }`}
                  >
                    <Image
                      source={avatar.src}
                      className="w-24 h-24 rounded-full"
                      resizeMode="cover"
                    />
                  </Pressable>
                );
              })}

            </View>

          </View>

        </View>
      </Modal>
      
    </SafeAreaView>
    
  )
}