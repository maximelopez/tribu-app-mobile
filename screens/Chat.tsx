import React, { useRef, useEffect, useState } from 'react';
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

export default function Chat() {
  const { theme } = useTheme();
  const { messages, sendMessage } = useFamilyChat();
  const user = useUserStore(state => state.user);

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

  const renderItem = ({ item }: any) => {
    const isMe = item.sender?._id === user?.id;

    return (
      <MessageBubble 
        content={item.content}
        senderName={item.sender?.name}
        createdAt={item.createdAt}
        isMe={isMe}
      />
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={35}
      >
        <FlatList
          inverted
          className='bg-[#F7F5F8] px-4'
          ref={flatListRef}
          data={[...messages].reverse()}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
        />

        {/* Input */}
        <View className='px-4 flex-row items-center mt-2'>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Écris un message..."
            selectionColor={theme.primary}
            style={{
              flex: 1,
              backgroundColor: '#F0F0F3',
              borderRadius: 8,
              paddingHorizontal: 16,
              marginRight: 12,
              height: 56,
            }}
          />

          <TouchableOpacity 
            onPress={handleSend} 
            activeOpacity={0.8}
            style={{
              backgroundColor: theme.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
              width: 50,
              height: 50,
            }}
          >
            <SendIcon width={28} height={28} fill={theme.primary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
