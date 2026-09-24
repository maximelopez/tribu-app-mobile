import { View, Text, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const avatarMap: Record<number, any> = {
  1: require('../assets/images/avatar1.png'),
  2: require('../assets/images/avatar2.png'),
  3: require('../assets/images/avatar3.png'),
  4: require('../assets/images/avatar4.png'),
};

// Couleurs Figma (écran chat)
const SENDER_NAME = '#7D7D7D';  // Gris 500
const TEXT_OTHER = '#2C2D3A';   // Neutral 900
const TIME_OTHER = '#D0D1DB';   // Neutral 100
const TIME_ME = '#F0F0F3';      // Neutral 50

const AVATAR_SIZE = 40;
const AVATAR_GAP = 11;

interface MessageBubbleProps {
  content: string;
  createdAt: string;
  isMe: boolean;
  senderName?: string;
  senderAvatar?: number | null;
  showName?: boolean;   // 1er message d'une série du même auteur
  showAvatar?: boolean; // dernier message d'une série du même auteur
}

// "10:15" (format fixe, toLocaleTimeString n'est pas fiable sur Android)
const formatTime = (date: string) => {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export default function MessageBubble({
  content,
  createdAt,
  isMe,
  senderName,
  senderAvatar,
  showName = true,
  showAvatar = true,
}: MessageBubbleProps) {
  const { theme } = useTheme();

  // Mes messages : bulle couleur du thème, à droite
  if (isMe) {
    return (
      <View
        style={{
          alignSelf: 'flex-end',
          maxWidth: '80%',
          backgroundColor: theme.primary,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 16,
          borderBottomRightRadius: 0,
          gap: 8,
          alignItems: 'flex-end',
        }}
      >
        <Text className="font-outfit text-base text-white">{content}</Text>
        <Text className="font-outfit text-xs" style={{ color: TIME_ME }}>
          {formatTime(createdAt)}
        </Text>
      </View>
    );
  }

  // Messages des autres : nom au-dessus, avatar à gauche, bulle blanche
  return (
    <View style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
      {showName && (
        <Text
          className="font-outfit text-base"
          style={{ color: SENDER_NAME, marginLeft: AVATAR_SIZE + AVATAR_GAP, marginBottom: 13 }}
        >
          {senderName || 'Utilisateur inconnu'}
        </Text>
      )}

      <View className="flex-row items-end" style={{ gap: AVATAR_GAP }}>
        {showAvatar ? (
          <Image
            source={avatarMap[senderAvatar ?? 1] ?? avatarMap[1]}
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 }}
          />
        ) : (
          // Garde l'alignement des bulles d'une même série
          <View style={{ width: AVATAR_SIZE }} />
        )}

        <View
          className="bg-white"
          style={{
            flexShrink: 1,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 16,
            borderBottomLeftRadius: 0,
            gap: 8,
          }}
        >
          <Text className="font-outfit text-base" style={{ color: TEXT_OTHER }}>{content}</Text>
          <Text className="font-outfit text-xs" style={{ color: TIME_OTHER }}>
            {formatTime(createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}
