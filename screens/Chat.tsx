import { useRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useUserStore } from '../store/userStore';
import useFamilyChat from '../hooks/useFamilyChat';
import { useTheme } from '../context/ThemeContext';
import MessageBubble from '../components/MessageBubble';
import SendIcon from '../assets/icons/sendBtn.svg';
import { useFamilyStore } from '../store/familyStore';

// Couleurs Figma (écran chat)
const CHAT_BG = '#F7F5F8';     // Neutral-elements
const TEXT_GREY = '#969696';   // Gris foncé
const INPUT_TEXT = '#0D1217';

export default function Chat() {
  const { theme } = useTheme();
  const { messages, sendMessage } = useFamilyChat();
  const user = useUserStore(state => state.user);
  const family = useFamilyStore(state => state.family);

  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  // La liste est inversée : on affiche du plus récent (en bas) au plus ancien
  const reversedMessages = [...messages].reverse();

  const renderItem = ({ item, index }: any) => {
    const isMe = item.sender?._id === user?.id;
    // Dans la liste inversée : index + 1 = message précédent, index - 1 = message suivant
    const previous = reversedMessages[index + 1];
    const next = reversedMessages[index - 1];
    const isFirstOfGroup = previous?.sender?._id !== item.sender?._id;
    const isLastOfGroup = next?.sender?._id !== item.sender?._id;

    return (
      // Espace plus grand entre deux auteurs différents
      <View style={{ marginTop: isFirstOfGroup ? 16 : 4 }}>
        <MessageBubble
          content={item.content}
          createdAt={item.createdAt}
          isMe={isMe}
          senderName={item.sender?.name}
          senderAvatar={item.sender?.avatar}
          showName={isFirstOfGroup}
          showAvatar={isLastOfGroup}
        />
      </View>
    );
  };

  if (!user?.familyId) {
    return (
      <SafeAreaView className='flex-1 justify-center items-center' edges={['top']}>
        <Text className='mx-4 font-outfit'>
          Vous devez rejoindre une famille pour accéder au chat.
        </Text>
      </SafeAreaView>
    );
  }

  const membersCount = family?.members?.length ?? 0;

  return (
    <SafeAreaView className='flex-1 bg-white' edges={['top']}>
      {/* En-tête */}
      <View className='bg-white' style={{ paddingHorizontal: 17, paddingTop: 16, paddingBottom: 8, gap: 4 }}>
        <Text className='font-outfit-bold text-base' style={{ color: theme.primary }}>
          Famille {family?.name}
        </Text>
        <Text className='font-outfit text-base' style={{ color: TEXT_GREY }}>
          {membersCount} membre{membersCount > 1 ? 's' : ''}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: CHAT_BG }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={35}
      >
        <FlatList
          inverted
          ref={flatListRef}
          data={reversedMessages}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: CHAT_BG }}
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 16 }}
        />

        {/* Zone de saisie */}
        <View
          className='flex-row items-center'
          style={{ backgroundColor: CHAT_BG, paddingHorizontal: 16, paddingVertical: 7, gap: 12 }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Écris un message..."
            placeholderTextColor={TEXT_GREY}
            selectionColor={theme.primary}
            multiline
            className='font-outfit text-base'
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 16,
              minHeight: 56,
              maxHeight: 120,
              color: INPUT_TEXT,
            }}
          />

          <TouchableOpacity
            onPress={handleSend}
            activeOpacity={0.8}
            style={{
              backgroundColor: theme.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 21,
              width: 42,
              height: 42,
              shadowColor: '#0D0A2C',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <SendIcon width={26} height={26} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
