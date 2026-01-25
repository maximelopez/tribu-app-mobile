import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useFamilyStore, Family } from '../store/familyStore';

const socket = io('https://tribu-app.onrender.com');

export default function useFamilyRealtime() {
  const user = useUserStore((state) => state.user);
  const setFamily = useFamilyStore((state) => state.setFamily);

  useEffect(() => {
    if (!user?.familyId) return;

    // Rejoindre la room famille
    socket.emit('joinFamilyRoom', user.familyId);

    // Écoute des mises à jour générales de la famille
    socket.on('familyUpdated', (updatedFamily: Family) => {
      setFamily(updatedFamily);
    });

    // Nouvelle demande pour rejoindre la famille (si on est le créateur)
    socket.on('newJoinRequest', (data: { familyId: string; userId: string }) => {
      setFamily((prev) => {
        if (!prev || prev.creatorId !== user.id) return prev;

        return {
          ...prev,
          joinRequests: [...prev.joinRequests, data.userId],
        };
      });
    });

    // Nettoyage des listeners à la sortie
    return () => {
      socket.off('familyUpdated');
      socket.off('newJoinRequest');
    };
  }, [user?.familyId, user?.id, setFamily]);
}