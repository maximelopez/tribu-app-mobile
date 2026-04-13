import { View, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    secureTextEntry?: boolean;
    color?: string;
}

export default function Input({ 
    value,
    onChangeText, 
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    secureTextEntry = false,
    color
}: InputProps) {
    const { theme } = useTheme();
    
    return (
        <View className="w-full">
            <TextInput 
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#C9C9C9"
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize={keyboardType === 'email-address' ? 'none' : autoCapitalize}
                selectionColor={color || theme.primary}
                className="w-full border border-gray-200 rounded-2xl h-[48px] px-[24px]"
            />
        </View>
    )
}
