import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TouchableOpacity } from 'react-native';
import { useUserStore } from '../store/userStore';
import Input from '../components/Input';
import Button from '../components/Button';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Login({ navigation }: any) {
  const setUser = useUserStore(state => state.setUser);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_URL + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage('Email ou mot de passe incorrect.');
        } else {
          setErrorMessage('Une erreur est survenue.');
        }
        return;
      }

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        score: data.user.score,
        familyId: data.user.familyId,
        avatarUrl: data.user.avatarUrl,
      });

    } catch (error: any) {
      console.error('Erreur login :', error);
      setErrorMessage('Impossible de se connecter au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-[#F7F5F8]' edges={['top']}>
      <View className='flex-1 p-5 items-center mt-[40px]'>
        <Text className="text-4xl mb-6 text-gray-800 font-peachy">Bon retour</Text>
        <Text className="text-xl text-gray-900 mb-9 font-outfit">Saisissez vos informations ci-dessous</Text>
        <View className='w-full gap-[20px] mb-[20px]'>
          <Input 
            value={email} 
            onChangeText={setEmail}
            placeholder="Adresse mail"
            keyboardType="email-address"
          />

          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
          />
        </View>

        {errorMessage && <Text className="text-red-500 mb-3">{errorMessage}</Text>}

        <Button
          title="Se connecter"
          onPress={handleLogin}
          loading={loading}
        />

        <View className="flex-1 flex-row items-center justify-center">
          <Text className="text-gray-900 text-center mr-[6px] font-outfit">Pas encore de compte ?</Text>
          <TouchableOpacity
            className='bg-[#6C0FF2] rounded-[15px]'
            onPress={() => navigation.navigate('Signup')} 
            activeOpacity={0.8}
          >
            <Text className='px-[10px] py-[5px] text-white font-peachy'>Inscrivez-vous</Text> 
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
