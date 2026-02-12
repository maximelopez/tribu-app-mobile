import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
title: string;
onPress: () => void;
loading?: boolean;
disabled?: boolean;
}

export default function Button({
    title,
    onPress,
    loading = false,
    disabled = false,
}: ButtonProps) {
    const { primaryColor } = useTheme();
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
            style={{ backgroundColor: primaryColor }}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ): (
                <Text className="text-white text-center font-peachy text-[20px]">
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    )
}