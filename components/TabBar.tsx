import { View, Text, Pressable, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Couleurs Figma (composant navigation-bar-classic)
const ACTIVE = '#161616';   // Gris très foncé
const INACTIVE = '#969696'; // Gris foncé

// Tailles légèrement réduites par rapport à la maquette (393 px de large)
// pour que "Récompenses" tienne sur les écrans Android plus étroits
export const TAB_ICON_SIZE = 22; // maquette : 24
const LABEL_SIZE = 9;            // maquette : 10
const BAR_HEIGHT = 60;           // maquette : 66
const ICON_LABEL_GAP = 6;        // maquette : 10

// Barre de navigation flottante (pilule blanche) — maquette Figma V2
export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: '#F3F3F8', // même fond que les écrans, la pilule "flotte" dessus
        paddingHorizontal: 7,
        paddingTop: 8,
        // iPhone : la barre d'accueil est fine, on peut la chevaucher à moitié.
        // Android : on passe entièrement au-dessus des boutons système (ou de la barre de gestes).
        paddingBottom: Platform.OS === 'ios'
          ? Math.max(insets.bottom / 2, 8)
          : insets.bottom + 8,
      }}
    >
      <View
        className="flex-row bg-white rounded-full"
        style={{
          height: BAR_HEIGHT,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 4,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const color = isFocused ? ACTIVE : INACTIVE;
          const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : route.name;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={label}
              className="flex-1 items-center justify-center"
              style={{ gap: ICON_LABEL_GAP, paddingHorizontal: 2 }}
            >
              {options.tabBarIcon?.({ focused: isFocused, color, size: TAB_ICON_SIZE })}
              <Text
                numberOfLines={1}
                // Taille fixe (même taille pour tous les libellés, indépendante
                // de la taille de police choisie dans les réglages du téléphone)
                allowFontScaling={false}
                style={{ fontFamily: 'montserrat-semibold', fontSize: LABEL_SIZE, color }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
