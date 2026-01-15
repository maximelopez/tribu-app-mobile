import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../store/userStore';

export default function Profile() {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);

  return (
    <SafeAreaView className="flex-1 bg-[#F7F5F8]" edges={['top']}>
      <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-2 items-center pt-20 px-6">
          {/* <Image
            source={require('')}
            className="w-32 h-32 rounded-full mb-5"
          /> */}

          <Text className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</Text>
          <Text className="text-gray-600 text-lg mb-4">{user?.email}</Text>
          <Text className="text-[32px] text-gray-900 font-peachy text-center mb-4"> Mes statistiques</Text>


          <View className="w-full px-4 mt-4 mb-8 items-center">

            {/* Titre */}
            <Text 
              className="text-[32px] font-peachy mb-8 mt-4">
              Mes thématiques
            </Text>

            {/* Ligne 1 */}
            <View className="flex-row gap-4 mb-4">
              <View 
                className="flex-1 h-[30px] rounded-full px-3 justify-center items-center"
                style={{ backgroundColor: "#E6582F" }}
              >
                <Text className="text-white text-[12px] font-medium">
                  Cuisine & Nutrition
                </Text>
              </View>

              <View 
                className="flex-1 h-[30px] rounded-full px-3 justify-center items-center"
                style={{ backgroundColor: "#FFF45E" }}
              >
                <Text className="text-black text-[12px] font-medium">
                  Sport & Activités
                </Text>
              </View>
            </View>

            {/* Ligne 2 */}
            <View className="flex-row gap-4 mb-4">
              <View 
                className="flex-1 h-[30px] rounded-full px-3 justify-center items-center"
                style={{ backgroundColor: "#6F28D9" }}
              >
                <Text className="text-white text-[12px] font-medium">
                  Lecture & Culture
                </Text>
              </View>

              <View 
                className="flex-1 h-[30px] rounded-full px-3 justify-center items-center"
                style={{ backgroundColor: "#5EA1F2" }}
              >
                <Text className="text-white text-[12px] font-medium">
                  Vie sociale
                </Text>
              </View>
            </View>

            {/* Ligne 3 */}
            <View 
              className="h-[30px] rounded-full px-3 justify-center items-center"
              style={{ backgroundColor: "#FFF45E" }}
            >
              <Text className="text-black text-[12px] font-medium">
                Développement personnel
              </Text>
            </View>

          </View>

          <TouchableOpacity
              className="w-full h-[56px] rounded-[12px] bg-[#6C0FF2] items-center justify-center mb-[16px]"
              activeOpacity={0.8}
              >
              <Text className="font-peachy text-center text-[20px] text-white">
                Devenir premium
              </Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={logout}
              className="w-full h-[56px] rounded-[12px] bg-white items-center justify-center mb-[16px] border border-[#6C0FF2]"
              activeOpacity={0.8}
              >
              <Text
                className="font-peachy text-center text-[20px] text-[#6C0FF2]">
                Se déconnecter
              </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      
    </SafeAreaView>
    
  )
}