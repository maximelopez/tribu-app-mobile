import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useFamilyStore } from '../store/familyStore';

const socket = io('https://tribu-app.onrender.com');

export default function useFamilyRealtime() {
    const user = useUserStore(state => state.user);
    const setFamily = useFamilyStore(state => state.setFamily);

    useEffect(() => {
        if (!user?.familyId) return;

        // rejoindre la room famille
        socket.emit('joinFamilyRoom', user.familyId);

        // écouter les updates
        socket.on('familyUpdated', (updatedFamily) => {
        setFamily(updatedFamily);
        });

        return () => {
        socket.off('familyUpdated');
        };
    }, [user?.familyId]);
}