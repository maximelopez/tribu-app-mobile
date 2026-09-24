import { View, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Member } from './FamilyLeaderboard';

const avatarMap: Record<number, any> = {
  1: require('../assets/images/avatar1.png'),
  2: require('../assets/images/avatar2.png'),
  3: require('../assets/images/avatar3.png'),
  4: require('../assets/images/avatar4.png'),
};

// Couleurs Figma
const TEXT_DARK = '#111111';
const TEXT_GREY = '#969696'; // Gris foncé
const BORDER = '#F5F5F3';

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

  // Le podium (1 à 3) prend la couleur du thème, les suivants en gris
  const rankColor = rank <= 3 ? theme.primary : TEXT_GREY;

  return (
    <View
      className="flex-row items-center"
      style={{
        gap: 12,
        paddingHorizontal: 18,
        paddingVertical: 11,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: BORDER,
      }}
    >
      <Text className="font-outfit text-base text-center" style={{ width: 20, color: rankColor }}>
        {rank}
      </Text>

      <Image
        source={avatarMap[member.avatar] ?? avatarMap[1]}
        style={{ width: 36, height: 36, borderRadius: 18, borderWidth: 3, borderColor: '#FFFFFF' }}
      />

      <View className="flex-1" style={{ gap: 1 }}>
        <View className="flex-row items-center" style={{ gap: 6 }}>
          <Text className="font-outfit text-base" style={{ color: TEXT_DARK }}>{member.name}</Text>
          {member.isCurrentUser && (
            <View className="rounded-full" style={{ backgroundColor: theme.transparent, paddingHorizontal: 7, paddingVertical: 1 }}>
              <Text className="font-outfit text-sm" style={{ color: theme.primary }}>Moi</Text>
            </View>
          )}
        </View>
        <Text className="font-outfit text-sm" style={{ color: TEXT_GREY }}>
          {member.activitiesTotal} activité{member.activitiesTotal > 1 ? 's' : ''}
        </Text>
      </View>

      <Text className="font-outfit text-sm text-right" style={{ color: TEXT_GREY }}>
        {member.points} pts
      </Text>
    </View>
  );
}
