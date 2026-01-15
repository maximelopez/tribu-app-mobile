import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity } from 'react-native';
import { useUserStore } from '../store/userStore';

export default function Profile() {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);

  return (
    <SafeAreaView className='flex-1 bg-white items-center'>
      <Text className='text-3xl mb-10'>Profil</Text>
      <Text className='mb-4'>{user?.name}</Text>
      <Text className='mb-4'>{user?.email}</Text>
      <TouchableOpacity
        className='bg-[#6C0FF2] rounded-xl'
        onPress={logout} 
        activeOpacity={0.8}
      >
        <Text className='px-10 py-4 text-white'>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
