import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useFamilyStore, Family } from '../store/familyStore';

const API_URL = 'https://tribu-app.onrender.com/api/';
const socket = io('https://tribu-app.onrender.com');

export default function useFamilyRealtime() {
  const userId = useUserStore(state => state.user?.id);
  const familyId = useUserStore(state => state.user?.familyId);
  const setUser = useUserStore((state) => state.setUser);
  const setFamily = useFamilyStore((state) => state.setFamily);

  useEffect(() => {
    if (!userId) return;

    // Rejoindre les rooms
    socket.emit('registerUser', userId);
    if (familyId) socket.emit('joinFamilyRoom', familyId);

    // Handlers stables
    const handleNewJoinRequest = async (data: { familyId: string; userId: string }) => {
      try {
        // fetch les infos de l'utilisateur qui a demandé
        const res = await fetch(`${API_URL}users/${data.userId}`);
        const userData = await res.json();
        const userName = userData.profile.name || 'Utilisateur inconnu';

        setFamily((prev) => {
          if (!prev || prev.creatorId !== userId) return prev;
          return {
            ...prev,
            joinRequests: [...prev.joinRequests, { id: data.userId, name: userName }],
          };
        });
      } catch (error) {
        console.error('Erreur fetch user pour joinRequest', error);
      }
    };

    const handleFamilyUpdated = (updatedFamily: Family) => {
      setFamily(updatedFamily);
    };

    const handleFamilyAccepted = async (data: { familyId: string }) => {
      setUser((prevUser) =>
        prevUser ? { ...prevUser, familyId: data.familyId } : prevUser
      );

      try {
        const response = await fetch(`${API_URL}families/${data.familyId}`);
        const result = await response.json();
        if (result.family) setFamily(result.family);
      } catch (err) {
        console.error('Erreur fetch famille après acceptation :', err);
      }
    };

    const handleFamilyRejected = () => {
      alert('Votre demande pour rejoindre cette famille a été refusée.');
    };

    // Écoute des events
    socket.on('newJoinRequest', handleNewJoinRequest);
    socket.on('familyUpdated', handleFamilyUpdated);
    socket.on('familyAccepted', handleFamilyAccepted);
    socket.on('familyRejected', handleFamilyRejected);

    // Nettoyage
    return () => {
      socket.off('newJoinRequest', handleNewJoinRequest);
      socket.off('familyUpdated', handleFamilyUpdated);
      socket.off('familyAccepted', handleFamilyAccepted);
      socket.off('familyRejected', handleFamilyRejected);
    };
  }, [userId, familyId]);
}