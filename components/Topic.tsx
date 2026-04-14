import { Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function Topic({ label, selected, onPress }: Props) {
    const isReadOnly = !onPress;

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
                backgroundColor: isReadOnly? '#00A16D33' : selected ? '#00A16D33' : '#E3E3E3',
                borderWidth: 0.5,
                borderColor: isReadOnly? '#00A16D33' : selected ? '#00A16D' : '#969696',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 4,
            }}
            >
            <Text
                style={{
                color: isReadOnly? '#00A16D' : selected ? '#00A16D' : '#969696',
                textAlign: 'center',
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}