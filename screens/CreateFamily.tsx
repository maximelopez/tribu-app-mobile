import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function CreateFamily() {
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const navigation = useNavigation<any>();

    if (!user) return null;

    const [name, setName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateFamily = async () => {
        if (!name || !city) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            // 1 - Créer la famille
            const response = await fetch(API_URL + 'families', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name, city })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'Une erreur est survenue.');
                return;
            }

            const familyId = data.family.id;

            // 2 - Associer la famille à l'utilisateur
            const userResponse = await fetch(`${API_URL}users/${user.id}/family`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ familyId })
            });

            const userData = await userResponse.json();

            if (!userResponse.ok) {
                setErrorMessage(userData.message || 'Impossible d\'associer la famille.');
                return;
            }

            // 3 - Mettre à jour le store utilisateur
            setUser({
                ...user, // conserve toutes les données existantes
                familyId: familyId // met à jour seulement la famille
            });

            // 4 - Naviguer vers Home
            navigation.navigate('Home');

            
        } catch (error) {
            console.error('Erreur :', error);
            setErrorMessage('Impossible de se connecter au serveur.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 mx-4'>

                <View className='w-full gap-[20px] mb-[20px]'>
                    <Input 
                        value={name} 
                        onChangeText={setName}
                        placeholder="Nom de votre famille"
                    />
                    <Input 
                        value={city} 
                        onChangeText={setCity}
                        placeholder="Ville"
                    />
                </View>

                {errorMessage && <Text className="text-red-500 mb-3">{errorMessage}</Text>}
                
                <Button
                    title="Créer ma tribu"
                    onPress={handleCreateFamily}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
};