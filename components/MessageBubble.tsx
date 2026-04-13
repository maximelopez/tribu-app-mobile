import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface MessageBubbleProps {
  content: string;
  senderName?: string;
  createdAt: string;
  isMe: boolean;
}

export default function MessageBubble({ content, senderName, createdAt, isMe }: MessageBubbleProps) {
    const { theme } = useTheme();

    return (
        <View
            style={{
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                backgroundColor: isMe ? theme.primary : '#E5E5EA',
                paddingInline: 16,
                paddingVertical: 12,
                borderRadius: 16,
                borderBottomRightRadius: isMe ? 0 : 16,
                borderBottomLeftRadius: isMe ? 16 : 0,
                marginVertical: 4,
                maxWidth: '85%',
            }}
        >
            {!isMe && <Text>{senderName || 'Utilisateur inconnu'}</Text>}
            <Text style={{ color: isMe ? '#fff' : '#000', fontWeight: '500' }}>{content}</Text>
            <Text
                style={{
                    fontSize: 10,
                    marginTop: 4,
                    color: isMe ? '#ddd' : '#555',
                    alignSelf: isMe ? 'flex-end': 'flex-start',
                }}
            >
                {new Date(createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </View>
    )
}