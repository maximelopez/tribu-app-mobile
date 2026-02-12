import { View, Text, TouchableOpacity } from 'react-native';
import { useFamilyStore } from '../store/familyStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

interface JoinRequestItemProps {
  requestUser: { id: string; name: string };
  familyId: string;
}

export default function JoinRequestItem({ requestUser, familyId }: JoinRequestItemProps) {
    const setFamily = useFamilyStore(state => state.setFamily);

    const handleAccept = async () => {
        try {
            const response = await fetch(`https://tribu-app.onrender.com/api/families/${familyId}/join-requests/${requestUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accept: true }),
            });

            if (response.ok) {
                // Met à jour le store pour retirer la demande
                setFamily(prev => prev ? {
                    ...prev,
                    joinRequests: prev.joinRequests.filter(user => user.id !== requestUser.id),
                } : prev);

                // Re-fetch les membres
                const resMembers = await fetch(`${API_URL}users?familyId=${familyId}`);
                const dataMembers = await resMembers.json();

                // Mettre à jour le store avec la nouvelle liste
                setFamily(prev => prev ? { ...prev, members: dataMembers.users } : prev);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReject = async () => {
        try {
        const response = await fetch(`https://tribu-app.onrender.com/api/families/${familyId}/join-requests/${requestUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accept: false }),
        });
        if (response.ok) {
            setFamily(prev => prev ? {
                ...prev,
                joinRequests: prev.joinRequests.filter(user => user.id !== requestUser.id),
            } : prev);
        }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View className="h-[126px] flex-column mt-2 justify-between bg-white p-2 rounded-lg">
            <Text>Invitation reçue</Text>
            <Text>{requestUser.name} souhaite rejoindre votre Tribu</Text>
            <View className="flex-row justify-evenly">
                <TouchableOpacity onPress={handleAccept} className="w-[140px] h-[48px] rounded-2xl bg-[#448AFF] items-center justify-center">
                    <Text className="text-white font-outfit font-bold">Accepter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReject} className="w-[140px] h-[48px] rounded-2xl bg-[#F44E0C] items-center justify-center">
                    <Text className="text-white font-outfit font-bold">Refuser</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}