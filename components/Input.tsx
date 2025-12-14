import { StyleSheet, View, TextInput } from 'react-native';

export default function Input({ 
    value,
    onChangeText, 
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false,
}: any) {
    return (
        <View style={styles.container}>
            <TextInput 
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#C9C9C9"
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                selectionColor="#6C0FF2"
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#C9C9C9',
    borderRadius: 15,
    height: 56,
    paddingInline: 24,
  }
});