import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFamilyStore } from '../store/familyStore';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'https://tribu-app.onrender.com/api/';

// Couleurs Figma (palette fixe, indépendante du thème)
const TEXT_STRONG = '#161616'; // Gris très foncé
const REFUSE_RED = '#EA4A1F';

const CARD_SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
};

interface JoinRequestItemProps {
  requestUser: { id: string; name: string };
  familyId: string;
}

export default function JoinRequestItem({ requestUser, familyId }: JoinRequestItemProps) {
  const setFamily = useFamilyStore(state => state.setFamily);
  const { theme } = useTheme();
  // Évite les doubles appuis pendant la requête
  const [isSubmitting, setIsSubmitting] = useState(false);

  const respond = async (accept: boolean) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}families/${familyId}/join-requests/${requestUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accept }),
      });

      // Succès, ou demande devenue invalide (ex : personne déjà acceptée ailleurs) :
      // dans les deux cas, la carte n'a plus lieu d'être
      if (response.ok || response.status === 400) {
        setFamily(prev => prev ? {
          ...prev,
          joinRequests: prev.joinRequests.filter(user => user.id !== requestUser.id),
        } : prev);
      }
      // La liste des membres est rechargée par l'événement socket `memberJoined`
      // (voir hooks/useFamilyRealtime.ts)
    } catch (error) {
      console.error('Erreur réponse demande :', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View
      className="bg-white rounded-2xl items-center justify-center"
      style={{ ...CARD_SHADOW, gap: 12, paddingVertical: 24, paddingHorizontal: 10 }}
    >
      <View className="items-center" style={{ gap: 4 }}>
        <Text className="font-outfit-bold text-base text-center" style={{ color: TEXT_STRONG }}>
          Nouvelle demande
        </Text>
        <Text className="font-outfit text-base text-center" style={{ color: TEXT_STRONG }}>
          {requestUser.name} souhaite rejoindre votre Tribu
        </Text>
      </View>

      <View className="flex-row w-full" style={{ gap: 19 }}>
        <TouchableOpacity
          onPress={() => respond(false)}
          disabled={isSubmitting}
          activeOpacity={0.8}
          className="flex-1 rounded-2xl items-center justify-center"
          style={{ height: 48, borderWidth: 2, borderColor: REFUSE_RED, opacity: isSubmitting ? 0.5 : 1 }}
        >
          <Text className="font-outfit text-base" style={{ color: REFUSE_RED }}>Refuser</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => respond(true)}
          disabled={isSubmitting}
          activeOpacity={0.8}
          className="flex-1 rounded-2xl items-center justify-center"
          style={{
            height: 48,
            backgroundColor: theme.primary,
            borderWidth: 1,
            borderColor: theme.primary,
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          <Text className="font-outfit text-base text-white">Accepter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
