import { useState } from 'react';
import { Text, View } from 'react-native';
import { useUserStore } from '../store/userStore';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Topic from '../components/Topic';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function CreateFamily() {
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const navigation = useNavigation<any>();
    const { theme } = useTheme();

    if (!user) return null;

    const [name, setName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [slogan, setSlogan] = useState<string>('');
    const [topics, setTopics] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const availableTopics = [
        'Cuisine & Nutrition',
        'Sport & Activités',
        'Lecture & Culture',
        'Vie sociale',
        'Développement personnel'
    ];

    const toggleTopic = (topic: string) => {
        setTopics(prev => 
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

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
                body: JSON.stringify({ name, city, slogan, topics, creatorId: user.id })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'Une erreur est survenue.');
                return;
            }

            const familyId = data.family.id;

            // 2 - Associer la famille à l'utilisateur
            const userResponse = await fetch(`${API_URL}users/${user.id}/family`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ familyId })
            });

            const userData = await userResponse.json();

            if (!userResponse.ok) {
                setErrorMessage(userData.message || 'Impossible d\'associer la famille.');
                return;
            }

            // 3 - Mettre à jour le store utilisateur
            setUser({ ...user, familyId: familyId});

            // 4 - Naviguer vers Home
            navigation.navigate('Tabs');
            
        } catch (error) {
            console.error('Erreur :', error);
            setErrorMessage('Impossible de se connecter au serveur.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View className='flex-1 bg-[#F7F5F8]'>
            <View className='flex-1 mx-4 mt-5 items-center'>

                <View className='w-full gap-[10px] mb-[20px]'>
                   <Text>Nom de la Tribu</Text> 
                    <Input 
                        value={name} 
                        onChangeText={setName}
                        placeholder="Ex : Champions"
                    />

                    <Text>Ville</Text>
                    <Input 
                        value={city} 
                        onChangeText={setCity}
                        placeholder="Ex : Angers"
                    />

                    <Text>Slogan de votre Tribu (optionnel)</Text>
                    <Input 
                        value={slogan} 
                        onChangeText={setSlogan}
                        placeholder="Ecrivez votre slogan ici"
                        multiline
                        numberOfLines={5}
                    />

                    <Text className="mb-2">Thématiques préférées</Text>
                    <View className="flex-row flex-wrap gap-2 mb-6">
                        {availableTopics.map(topic => (
                            <Topic
                                key={topic}
                                label={topic}
                                selected={topics.includes(topic)}
                                onPress={() => toggleTopic(topic)}
                            />
                        ))}
                    </View>

                </View>

                {errorMessage && <Text className="text-red-500 mb-3">{errorMessage}</Text>}
                
                <Button
                    title="Créer ma tribu"
                    onPress={handleCreateFamily}
                    loading={loading}
                />
            </View>
        </View>
    );
};