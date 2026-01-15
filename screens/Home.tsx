import { Text, View, Button } from 'react-native';
import { useUserStore } from '../store/userStore';

export default function Home() {
  const user = useUserStore(state => state.user);
  const logout = useUserStore(state => state.logout);

  return (
    <View className='flex-1 bg-white items-center justify-center'>
      <Text className='text-blue-500 font-bold'>Hello {user?.name}</Text>
      <Text className='text-blue-500 font-bold'>Score : {user?.score}</Text>
      <Button title="Déconnexion" onPress={logout} />
    </View>
  );
}
