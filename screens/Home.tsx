import { Text, View } from 'react-native';
import { useUser } from '../context/UserContext';

export default function Home() {
  const { user } = useUser();

  return (
    <View className='flex-1 bg-white items-center justify-center'>
      <Text className='text-blue-500 font-bold'>Hello, {user?.name}</Text>
      <Text className='text-blue-500 font-bold'>Score : {user?.score}</Text>
    </View>
  );
}
