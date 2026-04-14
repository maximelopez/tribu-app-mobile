import { View, Text, TouchableOpacity } from 'react-native';

interface QuestionProps {
    category: string;
    label: string;
    onAnswer: (value: number) => void;
    leftLabel: string;
    rightLabel: string;
}

export default function Question({ category, label, onAnswer, leftLabel, rightLabel }: QuestionProps) {
    const ratings = [1, 2, 3, 4, 5];

    return (
        <View className="justify-center items-center px-4">
            <Text className="text-3xl font-bold text-white mb-10">{category}</Text>

            <Text className="text-xl text-white text-center mb-10">
                {label}
            </Text>

            <View>
                <View className="flex-row gap-5 mb-2">
                    {ratings.map((value) => (
                    <TouchableOpacity
                        key={value}
                        onPress={() => onAnswer(value)}
                        className="w-[45px] h-[45px] rounded-full bg-white justify-center items-center"
                    >
                        <Text className="text-lg font-bold">{value}</Text>
                    </TouchableOpacity>
                    ))}
                </View>

                <View className='flex-row justify-between'>
                    <Text className='text-white font-outfit text-lg'>{leftLabel}</Text>
                    <Text className='text-white font-outfit text-lg'>{rightLabel}</Text>
                </View>
            </View>
            
        </View>
    );
}
