import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    color?: string;
    textColor?: string;
    icon?: React.ReactNode;
    borderColor?: string;
}

export default function Button({
    title,
    onPress,
    loading = false,
    disabled = false,
    color,
    textColor,
    icon,
    borderColor,
}: ButtonProps) {
    const { theme } = useTheme();
    const isDisabled = loading || disabled;

    const handlePress = async () => {
        if (isDisabled) return;

        await impactAsync(ImpactFeedbackStyle.Light);
        onPress();
    };

    return (
        <TouchableOpacity
            disabled={isDisabled}
            onPress={handlePress}
            activeOpacity={0.8}
            className='w-full h-[48px] justify-center rounded-2xl'
            style={{ 
                backgroundColor: color || theme.primary,
                borderColor: borderColor,
                borderWidth: borderColor ? 0.5 : 0,
            }}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ): (
                <View className="flex-row justify-center items-center gap-4">
                    <Text 
                        className="text-center font-outfit-bold text-xl"
                        style={{ color: textColor || 'white' }}
                    >
                        {title}
                    </Text>
                    {icon && <View>{icon}</View>}
                </View>
                
            )}
        </TouchableOpacity>
    )
}