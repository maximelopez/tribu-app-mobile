import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme, ThemeColor } from '../context/ThemeContext';
import { useUserStore } from '../store/userStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();
  const user = useUserStore(state => state.user);

  const changeTheme = async (color: ThemeColor) => {
    try {
      // 1 - mise à jour immédiate dans l'app
      setThemeColor(color);

      if (!user?.id) return;

      // 2 - sauvegarde dans le backend
      await fetch(`${API_URL}users/${user.id}/theme`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: color }),
      });

      // 3 - mise à jour dans le store (AsyncStorage)
       useUserStore.getState().setUser(prev => prev ? { ...prev, theme: color } : prev);
      
    } catch (error) {
      console.log("Erreur sauvegarde thème:", error);
    }
  };

  const colors: { name: string; value: ThemeColor }[] = [
    { name: 'Vert', value: 'vert' },
    { name: 'Jaune', value: 'jaune' },
    { name: 'Orange', value: 'orange' },
  ];

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontFamily: 'outfit', color: '#333', marginBottom: 8 }}>Thème de l'application :</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {colors.map((color) => {
          const bgColor =
            color.value === 'vert'
              ? '#00a16d'
              : color.value === 'jaune'
              ? '#ff9d00'
              : color.value === 'orange'
              ? '#ea4a1f'
              : '#00a16d';

          return (
            <TouchableOpacity
              key={color.value}
              onPress={() => changeTheme(color.value)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: bgColor,
                borderWidth: themeColor === color.value ? 2 : 0,
                borderColor: '#000',
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
