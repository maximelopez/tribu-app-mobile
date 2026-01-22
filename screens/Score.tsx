import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DonutScore from '../components/DonutScore';
import { useUserStore } from '../store/userStore';
//import { shadows } from "../utils/shadows";

export default function Score() {
    const user = useUserStore(state => state.user);

    if (!user || !user.score) return null;

    return (
        <SafeAreaView className="flex-1" edges={['top']}>
            <ScrollView 
                className="flex-1 bg-[#F7F6F3]"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >

                <View className='mx-4'>
                    <Text className="text-center text-[32px] font-peachy mt-4 mb-4">
                        Ton score bien-être
                    </Text>
                    <Text className='text-center font-outfit text-[12px] mb-10'>
                        Les scores sont calculés à partir de tes activités et ressentis. Tu peux les ajuster dans ton profil.
                    </Text>
                    <View className='flex-row gap-4'>
                        <DonutScore
                          size={150}
                          thickness={25}
                          progress={user.score / 100}
                          score={user.score}
                        />
                        <View className='mt-4'>
                            <Text className='font-peachy mb-2'>Ce qui t’a fait du bien :</Text>
                            <Text className='mb-2'>🍳 Cuisine → +8 pts</Text>
                            <Text className='mb-2'>🚶‍ Balade en famille → +10 pts</Text>
                            <Text className='mb-2'>📚 Lecture → +6 pts</Text>
                            <Text className='mb-2'>🎮 Jeu en ligne → +4 pt</Text>
                        </View>
                    </View>
                </View>

                <View className="mx-6">
                    <Text className="text-center text-[32px] font-peachy mb-4">
                        Tableau de bord
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}