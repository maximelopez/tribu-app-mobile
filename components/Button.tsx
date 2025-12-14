import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({
    title,
    onPress,
    loading = false,
    disabled = false,
}: any) {
    const isDisabled = loading || disabled;

    return (
        <TouchableOpacity
            disabled={isDisabled}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ): (
                <Text>{title}</Text>
            )}
        </TouchableOpacity>
    )
}