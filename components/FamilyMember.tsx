import {View, Text, Image} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Member {
  id: string;
  name: string;
  score: number;
  imageUrl?: string;
}

interface FamilyMemberProps {
  member: Member;
}

const FamilyMember = ({ member }: FamilyMemberProps) => {
  const { primaryColor } = useTheme();

    return(
        <View className="flex-row items-center justify-between h-[100px] bg-white rounded-2xl mt-4 px-4">
            <Text className="ml-2" style={{ color: primaryColor }}>{member.name}</Text>
            <Text className="ml-2 text-gray-500">{member.score} points</Text>
        </View>
    )
};

export default FamilyMember;