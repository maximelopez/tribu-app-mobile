import { View, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Member } from './FamilyLeaderboard';

const avatarMap: Record<number, any> = {
  1: require('../assets/images/avatar1.png'),
  2: require('../assets/images/avatar2.png'),
  3: require('../assets/images/avatar3.png'),
  4: require('../assets/images/avatar4.png'),
};

interface RankedMember extends Member {
  activitiesTotal: number;
  isCurrentUser: boolean;
}

interface Props {
  rank: number;
  member: RankedMember;
  isLast: boolean;
}

export default function LeaderboardRow({ rank, member, isLast }: Props) {
  const { theme } = useTheme();

  return (
    <View className={`flex-row items-center py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <Text className="w-6 text-gray-400 font-outfit-bold text-base">{rank}</Text>

      <Image
        source={avatarMap[member.avatar] ?? avatarMap[1]}
        className="w-12 h-12 rounded-full ml-1"
      />

      <View className="flex-1 ml-3">
        <View className="flex-row items-center">
          <Text className="font-outfit-bold text-gray-800 text-base">{member.name}</Text>
          {member.isCurrentUser && (
            <View
              style={{ backgroundColor: `${theme.primary}20` }}
              className="rounded-full px-2 py-0.5 ml-2"
            >
              <Text style={{ color: theme.primary }} className="text-xs font-outfit-bold">
                Moi
              </Text>
            </View>
          )}
        </View>
        <Text className="text-gray-400 text-xs font-outfit mt-0.5">
          {member.activitiesTotal} activité{member.activitiesTotal > 1 ? 's' : ''} au total
        </Text>
      </View>

      <Text style={{ color: theme.primary }} className="font-outfit-bold text-base">
        {member.points} pts
      </Text>
    </View>
  );
}