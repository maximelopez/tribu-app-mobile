import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function JoinFamily() {
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 mx-4'>
                <Text>Rejoindre une famille</Text>
            </View>
        </SafeAreaView>
    );
};