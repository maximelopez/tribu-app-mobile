import { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';

type ActivityPosition = 'left' | 'right' | 'bottom';

interface Activity {
  label: string;
  icon: string;
  points: number;
  position: ActivityPosition;
}

interface DonutScoreProps {
  size: number;
  thickness?: number;
  progress: number;
  score: number;
  activities?: Activity[];
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function DonutScore({
  size,
  thickness = 30,
  progress,
  score,
  activities = [],
}: DonutScoreProps) {
  const { primaryColor } = useTheme();

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const innerSize = size - thickness * 2;

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  const activityPositionStyles: Record<ActivityPosition, string> = {
    left: 'absolute top-24 -left-10',
    right: 'absolute top-10 -right-6',
    bottom: 'absolute -bottom-4 left-1/3 -ml-10',
  };

  return (
    <View className="items-center justify-center">
      <View className="relative">

        {/* Donut */}
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E5E5"
            strokeWidth={thickness}
            fill="none"
          />

          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={primaryColor}
            strokeWidth={thickness}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        {/* Score center */}
        <View
          className="absolute bg-white justify-center items-center"
          style={{
            width: innerSize,
            height: innerSize,
            top: thickness,
            left: thickness,
            borderRadius: innerSize / 2,
          }}
        >
          <Text className="text-[38px] font-bold" style={{ color: primaryColor }}>{score}</Text>
          <Text className="text-[14px] font-bold" style={{ color: primaryColor }}>points</Text>
        </View>

        {/* Activities */}
        {activities.map((activity, index) => (
          <View
            key={index}
            className={`${activityPositionStyles[activity.position]}
              bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm z-20`}
          >
            <Text className="font-semibold">
              {activity.icon} {activity.label}
            </Text>
            <Text className="text-gray-600">
              +{activity.points} pts
            </Text>
          </View>
        ))}

      </View>
    </View>
  );
}
