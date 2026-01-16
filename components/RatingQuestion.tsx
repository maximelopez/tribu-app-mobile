import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type RatingQuestionProps = {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
};

export default function RatingQuestion({
    label,
    value,
    onChange,
    min = 1,
    max = 5
}: RatingQuestionProps) {
    const options = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    return (
        <View className="mb-6">
            <Text className="text-base font-semibold mb-3">{label}</Text>

            <View className="flex flex-row justify-between">
                {options.map((num) => (
                    <TouchableOpacity
                        key={num}
                        onPress={() => onChange(num)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center 
                            ${value === num ? 'bg-[#6C0FF2]' : 'bg-gray-200'}`}
                    >
                        <Text className={`text-sm ${value === num ? 'text-white' : 'text-black'}`}>
                            {num}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}