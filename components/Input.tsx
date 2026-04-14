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
    multiline?: boolean;
    numberOfLines?: number;
}

export default function Input({ 
    value,
    onChangeText, 
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    secureTextEntry = false,
    color,
    multiline = false,
    numberOfLines = 1
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
                multiline={multiline}
                numberOfLines={numberOfLines}
                className="w-full border border-gray-200 rounded-2xl px-4 bg-white"
                style={[
                    !multiline && { height: 48 },
                    multiline && {
                        minHeight: 100,
                        textAlignVertical: 'top'
                    }
                ]}
            />
        </View>
    )
}
