import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme, ThemeColor } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();

  const colors: { name: string; value: ThemeColor }[] = [
    { name: 'Bleu', value: 'bleu' },
    { name: 'Jaune', value: 'jaune' },
    { name: 'Orange', value: 'orange' },
    { name: 'Vert', value: 'vert' },
  ];

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontFamily: 'outfit', color: '#333', marginBottom: 8 }}>Thème de l'application :</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {colors.map((color) => {
          const bgColor =
            color.value === 'bleu'
              ? '#20c1b1'
              : color.value === 'jaune'
              ? '#ff9d00'
              : color.value === 'orange'
              ? '#ea4a1f'
              : '#00a16d';

          return (
            <TouchableOpacity
              key={color.value}
              onPress={() => setThemeColor(color.value)}
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
