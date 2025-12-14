import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

const API_URL = 'https://tribu-app.vercel.app/';

export default function Login() {
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
      const response = await fetch(API_URL + 'users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
      }
    } catch (error: any) {
      console.error('Erreur login :', error.message);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Bon retour</Text>
      <Text>Saisissez vos informations ci-dessous</Text>
      <View>
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

      {errorMessage && <Text>{errorMessage}</Text>}

      <Button
        title="Se connecter"
        onPress={handleLogin}
        loading={loading}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
