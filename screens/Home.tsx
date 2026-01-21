import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';
import DonutScore from '../components/DonutScore';
import Button from '../components/Button';

export default function Home() {
  const user = useUserStore(state => state.user);
  const navigation = useNavigation<any>();

  if (!user || !user.score) return null;

  const handleJoinFamily = () => {
    navigation.navigate('JoinFamily');
  };

  const handleCreateFamily = () => {
    navigation.navigate('CreateFamily');
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 mt-10 mx-4'>
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
          {user.familyId ? (
            <Text className='text-gray-900 font-outfit mt-2 text-lg'>Vous faites partie de la famille {user.familyId}</Text>
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
    </SafeAreaView>
  );
}
