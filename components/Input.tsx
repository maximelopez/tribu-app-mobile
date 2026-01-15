import { View, TextInput } from 'react-native';

export default function Input({ 
    value,
    onChangeText, 
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
}: any) {
    return (
        <View className="w-full">
            <TextInput 
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#C9C9C9"
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                selectionColor="#6C0FF2"
                className="w-full border border-gray-200 rounded-[15px] h-[48px] px-[24px]"
            />
        </View>
    )
}
