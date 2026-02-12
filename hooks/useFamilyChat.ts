import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { useUserStore } from '../store/userStore';

interface Message {
  _id: string;
  familyId: string;
  sender: {
    _id: string;
    name: string;
  };
  content: string;
  createdAt: string;
}

export default function useFamilyChat() {
  const user = useUserStore(state => state.user);
  const familyId = user?.familyId;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!familyId) return;

    // Rejoindre la room
    socket.emit('joinFamilyRoom', familyId);

    // Charger historique
    socket.emit('getHistory', familyId);

    socket.on('chatHistory', (history: Message[]) => {
      setMessages(history);
    });

    socket.on('newMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('chatHistory');
      socket.off('newMessage');
    };
  }, [familyId]);

  const sendMessage = (content: string) => {
    if (!content.trim() || !user || !familyId) return;

    socket.emit('sendMessage', {
      familyId,
      sender: user.id,
      content: content.trim(),
    });
  };

  return {
    messages,
    sendMessage,
  };
}
