import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import LeaderboardRow from './LeaderboardRow';

export interface Member {
  id: string;
  name: string;
  avatar: number;
}

interface FamilyLeaderboardProps {
  familyName: string;
  members: Member[];
  currentUserId: string;
}

// Stats fictives temporaires en attendant que le backend
const STATIC_STATS = [
  { points: 93, activitiesThisMonth: 12 },
  { points: 55, activitiesThisMonth: 9 },
  { points: 85, activitiesThisMonth: 7 },
  { points: 25, activitiesThisMonth: 3 },
];

const LEVEL = 3;
const NEXT_LEVEL_THRESHOLD = 242;
// --- Fin des données fictives ---

export default function FamilyLeaderboard({ familyName, members, currentUserId }: FamilyLeaderboardProps) {
  const { theme } = useTheme();

  // Associe chaque vrai membre à des stats fictives (cycle si + de 4 membres)
  const membersWithStats = members.map((member, index) => ({
    ...member,
    ...STATIC_STATS[index % STATIC_STATS.length],
    isCurrentUser: member.id === currentUserId,
  }));

  const totalPoints = membersWithStats.reduce((sum, m) => sum + m.points, 0);
  const progressPercent = Math.min((totalPoints / NEXT_LEVEL_THRESHOLD) * 100, 100);

  // Classe par nombre d'activités ce mois-ci (ordre du rang affiché)
  const rankedMembers = [...membersWithStats].sort(
    (a, b) => b.activitiesThisMonth - a.activitiesThisMonth
  );

  return (
    <View
      className="rounded-3xl overflow-hidden bg-white"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* Header coloré */}
      <View style={{ backgroundColor: theme.primary }} className="px-5 pt-5 pb-6">
        <View className="flex-row items-center justify-between">
          <Text className="text-white font-outfit-bold text-2xl">{familyName}</Text>
          <View className="bg-white/25 rounded-full px-3 py-1">
            <Text className="text-white font-outfit-bold">{totalPoints} pts</Text>
          </View>
        </View>
        <Text className="text-white/90 font-outfit mt-1">{members.length} membres</Text>

        <View className="flex-row items-center justify-between mt-5 mb-1">
          <Text className="text-white font-outfit text-sm">Niveau {LEVEL}</Text>
          <Text className="text-white font-outfit text-sm">
            {NEXT_LEVEL_THRESHOLD} pts → Niveau {LEVEL + 1}
          </Text>
        </View>
        <View className="h-2 bg-white/30 rounded-full overflow-hidden">
          <View className="h-2 bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
        </View>
      </View>

      {/* Liste des membres */}
      <View className="px-5 py-2">
        {rankedMembers.map((member, index) => (
          <LeaderboardRow
            key={member.id}
            rank={index + 1}
            member={member}
            isLast={index === rankedMembers.length - 1}
          />
        ))}
      </View>
    </View>
  );
}