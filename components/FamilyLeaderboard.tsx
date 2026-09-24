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
      className="rounded-2xl bg-white"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      {/* overflow-hidden sur une vue interne pour garder l'ombre sur iOS */}
      <View className="rounded-2xl overflow-hidden">
        {/* Header coloré : nom, membres, niveau */}
        <View style={{ backgroundColor: theme.primary }}>
          <View style={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 14, gap: 1 }}>
            <Text className="text-white font-outfit-bold text-base">{familyName}</Text>
            <Text className="text-white font-outfit text-sm">
              {members.length} membre{members.length > 1 ? 's' : ''}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 14, gap: 6 }}>
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-outfit-bold text-base">Niveau {levelInfo.level}</Text>
              <Text className="text-white font-outfit text-base">
                {levelInfo.isMax
                  ? 'Niveau maximum'
                  : `${levelInfo.remaining} pts → Niveau ${levelInfo.level + 1}`}
              </Text>
            </View>
            <View
              className="rounded-full overflow-hidden"
              style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <View
                className="rounded-full bg-white"
                style={{ height: 6, width: `${progressPercent}%` }}
              />
            </View>
          </View>
        </View>

        {/* Classement des membres */}
        <View style={{ paddingVertical: 4 }}>
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
    </View>
  );
}
