import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import LeaderboardRow from './LeaderboardRow';

export interface Member {
  id: string;
  name: string;
  avatar: number;
  points: number;
}

export interface LevelInfo {
  level: number;
  isMax: boolean;
  remaining: number;
  progress: number; // de 0 à 1
}

interface FamilyLeaderboardProps {
  familyName: string;
  members: Member[];
  currentUserId: string;
  levelInfo: LevelInfo;
}

// --- Données fictives temporaires : nombre d'activités au total ---
// (à remplacer quand le backend fournira cette information)
const STATIC_ACTIVITIES = [24, 17, 14, 6];
// --- Fin des données fictives ---

export default function FamilyLeaderboard({
  familyName,
  members,
  currentUserId,
  levelInfo,
}: FamilyLeaderboardProps) {
  const { theme } = useTheme();

  // Associe chaque membre à un nombre d'activités fictif, puis classe par points réels
  const rankedMembers = members
    .map((member, index) => ({
      ...member,
      activitiesTotal: STATIC_ACTIVITIES[index % STATIC_ACTIVITIES.length],
      isCurrentUser: member.id === currentUserId,
    }))
    .sort((a, b) => b.points - a.points);

  const progressPercent = Math.round(levelInfo.progress * 100);

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
        <Text className="text-white font-outfit-bold text-2xl">{familyName}</Text>
        <Text className="text-white/90 font-outfit mt-1">{members.length} membres</Text>

        <View className="flex-row items-center justify-between mt-5 mb-1">
          <Text className="text-white font-outfit text-sm">Niveau {levelInfo.level}</Text>
          <Text className="text-white font-outfit text-sm">
            {levelInfo.isMax
              ? 'Niveau maximum'
              : `${levelInfo.remaining} pts → Niveau ${levelInfo.level + 1}`}
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