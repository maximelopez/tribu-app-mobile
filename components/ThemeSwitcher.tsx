import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme, ThemeColor, themeMap } from '../context/ThemeContext';
import { useUserStore } from '../store/userStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();
  const user = useUserStore(state => state.user);

  const changeTheme = async (color: ThemeColor) => {
    try {
      // 1 - mise à jour immédiate de l'UI
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
    { name: 'Vert', value: 'green' },
    { name: 'Orange', value: 'orange' },
    { name: 'Rouge', value: 'red' },
  ];

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontFamily: 'outfit', color: '#333', marginBottom: 8 }}>Thème de l'application :</Text>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        {colors.map((color) => {
          const bgColor = themeMap[color.value].primary;

          return (
            <TouchableOpacity
              key={color.value}
              onPress={() => changeTheme(color.value)}
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
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
