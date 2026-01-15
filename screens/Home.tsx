import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useUserStore } from '../store/userStore';
import DonutScore from '../components/DonutScore';

export default function Home() {
  const user = useUserStore(state => state.user);

  if (!user) return null;

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 mt-10 mx-4'>
        <Text className='text-gray-800 font-bold text-3xl'>Bonjour, {user?.name}</Text>
        <Text className='text-gray-800 font-bold mb-10'>Ton score bien-être</Text>
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
      </View>
    </SafeAreaView>
  );
}
