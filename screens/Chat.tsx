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

export default function Chat() {
  const { messages, sendMessage } = useFamilyChat();
  const user = useUserStore(state => state.user);

  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Scroll automatique quand nouveau message
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.sender?._id === user?.id;

    return (
      <View
        style={{
          alignSelf: isMe ? 'flex-end' : 'flex-start',
          backgroundColor: isMe ? '#6C0FF2' : '#E5E5EA',
          padding: 10,
          borderRadius: 18,
          marginVertical: 4,
          maxWidth: '75%',
        }}
      >

        <Text>
          {item.sender?.name || 'Utilisateur inconnu'}:
        </Text>
        <Text style={{ color: isMe ? '#fff' : '#000', fontWeight: '500' }}>
          {item.content}
        </Text>

        <Text
          style={{
            fontSize: 10,
            marginTop: 4,
            color: isMe ? '#ddd' : '#555',
            alignSelf: 'flex-end',
          }}
        >
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        {/* Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Écris un message..."
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 25,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginRight: 8,
            }}
          />

          <TouchableOpacity
            onPress={handleSend}
            style={{
              backgroundColor: '#6C0FF2',
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Envoyer
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
