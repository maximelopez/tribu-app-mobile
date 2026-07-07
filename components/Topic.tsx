import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function Topic({ label, selected, onPress }: Props) {
    const { theme } = useTheme();
    const isReadOnly = !onPress;
    const isActive = isReadOnly || selected;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            disabled={isReadOnly}
            style={{
                flexGrow: 1,
                height: 30,
                paddingHorizontal: 10,
                borderRadius: 15,
                backgroundColor: isActive ? `${theme.primary}33` : '#E3E3E3',
                borderWidth: 0.5,
                borderColor: isActive ? theme.primary : '#969696',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 4,
            }}
            >
            <Text
                style={{
                color: isActive ? theme.primary : '#969696',
                textAlign: 'center',
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}