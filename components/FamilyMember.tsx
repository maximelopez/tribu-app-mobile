import {View, Text, Image, ImageBackground} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Member {
  id: string;
  name: string;
  score: number;
  imageUrl?: string;
  avatar?: string;
}

interface FamilyMemberProps {
  member: Member;
}

const backgroundImages = {
  vert: require('../assets/images/bg-card-vert.png'),
  jaune: require('../assets/images/bg-card-jaune.png'),
  orange: require('../assets/images/bg-card-orange.png'),
};

const FamilyMember = ({ member }: FamilyMemberProps) => {
  const { theme, themeColor } = useTheme();

    return(
        <ImageBackground 
          source={backgroundImages[themeColor]}
          imageStyle={{ borderRadius: 16 }}
          className="flex-row items-center justify-between h-[100px] bg-white rounded-2xl mt-4 px-6"
        >
            <View className='flex flex-row items-center justify-center'>
              <Image
                source={member.avatar ? { uri: member.avatar } : require('../assets/images/avatar4.png')}
                className="w-16 h-16"
              />
              <Text className="ml-2 text-white">{member.name}</Text>
            </View>
            
            <View className='flex items-center justify-center'>
              <Text className="ml-2 text-white">{member.score}</Text>
              <Text className="ml-2 text-white">points</Text>
            </View>
        </ImageBackground>
    )
};

export default FamilyMember;