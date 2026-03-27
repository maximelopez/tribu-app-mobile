import { useState, useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Question from '../components/Question';
import { useUserStore } from '../store/userStore';
import Animated, { 
    FadeInRight, 
    FadeOutLeft,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence
} from 'react-native-reanimated'
import { useTheme } from '../context/ThemeContext';

const API_URL = 'https://tribu-app.onrender.com/api/';

const questions = [
    { category: 'Mental', label: "Aujourd’hui, tu te sens bien ou pas vraiment ?" },
    { category: 'Mental', label: "Tu arrives facilement à te sentir mieux quand quelque chose te dérange ?" },
    { category: 'Mental', label: "Cette semaine, tu t’es senti(e) plutôt calme ou souvent tendu(e) ?" },
    { category: 'Social', label: "En ce moment, tu te sens proche de ta famille ?" },
    { category: 'Social', label: "Tu as eu des moments agréables avec tes proches cette semaine ?" },
    { category: 'Quotidien', label: "Tu dors bien la nuit ?" },
    { category: 'Quotidien', label: "Comment ça se passe pour toi au travail / à l’université / à l’école en ce moment ?" },
    { category: 'Quotidien', label: "Tu te sens bien à la maison ces derniers jours ?" },
];

const backgroundMap: Record<string, any> = {
  vert: require('../assets/images/bg-vert.png'),
  jaune: require('../assets/images/bg-jaune.png'),
  orange: require('../assets/images/bg-orange.png'),
};

export default function WelcomeQuiz() {
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const userId = user?.id;

    const { themeColor } = useTheme();
    const backgroundImage = backgroundMap[themeColor];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    
    const progressWidth = useSharedValue(0);
    const progressScale = useSharedValue(1);

    const progress = (currentIndex + 1) / questions.length;

    // anime la largeur de la progress bar
    useEffect(() => {
        progressWidth.value = withTiming(progress * 100, { duration: 350 });
    }, [currentIndex]);

    // style animé progress bar
    const progressStyle = useAnimatedStyle(() => {
        return {
            width: `${progressWidth.value}%`,
            transform: [{ scaleX: progressScale.value }]
        };
    });

    const handleAnswer = async (value: number) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        // pulse UX sur la barre
        progressScale.value = withSequence(
            withTiming(1.05, { duration: 120 }),
            withTiming(1, { duration: 120 })
        );

        const isLastQuestion = currentIndex === questions.length - 1;

        if (isLastQuestion) {
            // Calcul du score
            const total = newAnswers.reduce((sum, val) => sum + val, 0);
            const scoreFinal = Math.round((total / (questions.length * 5)) * 100);

            if (!userId) return;

            try {
                const response = await fetch(API_URL + 'users/' + userId + '/score', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ score: scoreFinal }),
                });

                const data = await response.json();

                // mise à jour du store Zustand
                if (user) setUser({ ...user, score: data.score });

            } catch (error) {
                console.log("Erreur envoi score :", error);
            }
            return;
        }

        // délai pour laisser l'animation jouer
        setTimeout(() => setCurrentIndex(prev => prev + 1), 180);
    };

    const currentQuestion = questions[currentIndex];

    return (
        <SafeAreaView className="flex-1">
            <ImageBackground
                source={backgroundImage}
                style={{ flex: 1 }}
                imageStyle={{ resizeMode: 'cover' }}
            >
            
                <View>
                    <Text className='text-center text-white text-2xl font-bold mt-20 mb-10'>
                        Pour mieux vous connaître...
                    </Text>

                    {/* Progress bar */}
                    <View className="w-full px-4 mb-4">
                        <View className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
                            <Animated.View
                                className="h-4 bg-white rounded-full"
                                style={progressStyle}
                            />
                        </View>
                    </View>

                    <View className='mb-10 px-4'>
                        <Text className='text-white'>
                            Question {currentIndex + 1} sur {questions.length}
                        </Text>
                    </View>

                <Animated.View
                        key={currentIndex}
                        entering={FadeInRight.springify()}
                        exiting={FadeOutLeft.duration(200)}
                    >
                        <Question
                        category={currentQuestion.category}
                        label={currentQuestion.label}
                        onAnswer={handleAnswer}
                        />
                    </Animated.View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}