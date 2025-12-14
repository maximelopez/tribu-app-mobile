import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

const API_URL = 'https://tribu-app.vercel.app/';

export default function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_URL + 'users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        const data = await response.json();
      }
    } catch (error: any) {
      console.error('Erreur signup :', error.message);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Inscription</Text>
      <Text>Saisissez vos informations ci-dessous</Text>
      <View>
        <Input 
          value={name} 
          onChangeText={setName}
          placeholder="Nom"
        />

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
        title="S'inscrire"
        onPress={handleSignup}
        loading={loading}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
