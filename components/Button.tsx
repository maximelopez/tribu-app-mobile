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
            className='bg-[#6C0FF2] w-full h-[48px] justify-center rounded-[15px]'
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