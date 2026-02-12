import { View, TouchableOpacity, Text } from 'react-native';
import { useTheme, ThemeColor } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useTheme();

  const colors: { name: string; value: ThemeColor }[] = [
    { name: 'Violet', value: 'violet' },
    { name: 'Jaune', value: 'jaune' },
    { name: 'Rouge', value: 'rouge' },
    { name: 'Bleu', value: 'bleu' },
  ];

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontFamily: 'outfit', color: '#333', marginBottom: 8 }}>Couleur du thème :</Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {colors.map((color) => {
          const bgColor =
            color.value === 'violet'
              ? '#6C0FF2'
              : color.value === 'jaune'
              ? '#FFCF06'
              : color.value === 'rouge'
              ? '#E64A19'
              : '#448AFF';

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
