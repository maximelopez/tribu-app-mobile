import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import RatingQuestion from '../components/RatingQuestion';
import { useUserStore } from '../store/userStore';

const API_URL = 'https://tribu-app.onrender.com/api/';

export default function Questionnaire() {
    const flatListRef = useRef<FlatList>(null);
    const { width } = useWindowDimensions();

    // Récupération du user et setter depuis Zustand
    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const userId = user?.id;

    // Questions (1–10)
    const [energie, setEnergie] = useState(0);
    const [stress, setStress] = useState(0);
    const [sommeil, setSommeil] = useState(0);
    const [motivation, setMotivation] = useState(0);
    const [alimentation, setAlimentation] = useState(0);
    const [concentration, setConcentration] = useState(0);

    // Questions textuelles
    const [humeur, setHumeur] = useState<string | null>(null);
    const [douleur, setDouleur] = useState<string | null>(null);
    const [tempsExterieur, setTempsExterieur] = useState<string | null>(null);

    // Bouton stylisé
    const ChoiceButton = ({ label, selected, onPress }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className={`px-6 py-3 rounded-xl mr-3 mb-3 
                ${selected ? "bg-[#00a16d]" : "bg-gray-200"}`}
        >
            <Text className={`text-lg ${selected ? "text-white" : "text-black"}`}>{label}</Text>
        </TouchableOpacity>
    );

    // Soumission du questionnaire + calcul du score
    const handleSubmit = () => {
        if (!energie || !stress || !sommeil || !motivation || !alimentation || !concentration || !humeur || !douleur || !tempsExterieur) {   
            return;
        }

        // Calcul brut sur 30
        const total = energie + stress + sommeil + motivation + alimentation + concentration;
        const scoreFinal = Math.round((total / 30) * 100);

        // Enregistrer le score en base + Zustand
        if (!userId) return;
        fetch(API_URL + 'users/' + userId +'/score', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: scoreFinal }),
        })
        .then(response => response.json())
        .then((data) => {
            // Met à jour le store Zustand avec le score
            setUser({ ...user, score: data.score });
        })
        .catch(err => console.error("Erreur soumission questionnaire", err));
    };

    // Configuration des questions
    const questions = [
        { id: 'intro', type: 'intro', title: 'Avant de commencer ...', subtitle: "Prenons un moment pour voir comment vous allez aujourd'hui 😌" },
        { id: 'energie', type: 'rating', label: " Comment te sens‑tu en termes d’énergie aujourd’hui ? 🌞", value: energie, setValue: setEnergie },
        { id: 'stress', type: 'rating', label: "Quel est ton niveau de stress en ce moment ? 😌 ", value: stress, setValue: setStress },
        { id: 'sommeil', type: 'rating', label: "Comment évalues‑tu la qualité de ton sommeil récent ? 🌙", value: sommeil, setValue: setSommeil },
        { id: 'humeur', type: 'choice', label: "Comment décrirais‑tu ton humeur générale ? 😊", options: ["Très mauvaise", "Mauvaise", "Neutre", "Bonne", "Très bonne"], value: humeur, setValue: setHumeur },
        { id: 'motivation', type: 'rating', label: "Comment juges‑tu la qualité de ton alimentation ces derniers jours ? 🍎 ", value: motivation, setValue: setMotivation },
        { id: 'douleur', type: 'choice', label: "Combien de temps passes‑tu à bouger ou être à l’extérieur ? 🚶‍♂️ ", options: ["Aucune", "Légère", "Modérée", "Forte"], value: douleur, setValue: setDouleur },
        { id: 'tempsExterieur', type: 'choice', label: "À quel point tu te sens connecté(e) aux autres membres de ta famille ? 🤝 ", options: ["0", "<30 min", "30-60 min", ">1h"], value: tempsExterieur, setValue: setTempsExterieur },
        { id: 'alimentation', type: 'rating', label: "Comment évalues‑tu ton bien‑être global en ce moment ? 🎯", value: alimentation, setValue: setAlimentation },
        { id: 'concentration', type: 'rating', label: "9. Taux de concentration", value: concentration, setValue: setConcentration },
        { id: 'conclusion', type: 'conclusion', label: "Votre score est calculé !" }  
    ];

    const nextQuestion = (currentIndex: number) => {
        if (currentIndex < questions.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        }
    };

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={{ width: width, paddingHorizontal: 20 }} className="flex-1 justify-center">

                {/* Intro Slide */}
                {item.type === 'intro' && (
                    <View className="items-center justify-center space-y-6">
                        <Text className="text-4xl font-bold text-[#00a16d] text-center">{item.title}</Text>
                        <Text className="text-xl text-gray-600 text-center px-4">{item.subtitle}</Text>
                        <TouchableOpacity
                            onPress={() => nextQuestion(index)}
                            className="mt-10 bg-[#00a16d] px-8 py-4 rounded-[15px]"
                            activeOpacity={0.8}
                            >
                            <Text className="text-white font-bold text-lg">Suivant </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Question Title */}
                {item.type !== 'intro' && (
                    <Text className="text-2xl font-bold text-[#00a16d] mb-10 text-center">
                        {item.label}
                    </Text>
                )}

                {/* Rating Questions */}
                {item.type === 'rating' && (
                    <View className="w-full px-6">
                        <RatingQuestion
                            label=""
                            value={item.value}
                            onChange={(val: number) => {
                                item.setValue(val);
                                setTimeout(() => nextQuestion(index), 300);
                            }}
                            min={1}
                            max={5}
                        />
                        <Text className="text-gray-400 text-center text-sm font-medium -mt-2">
                            Sélectionnez une réponse
                        </Text>
                    </View>
                )}

                {/* Choice Questions */}
                {item.type === 'choice' && (
                    <View className="flex-row flex-wrap justify-center gap-2">
                        {item.options.map((option: string) => (
                            <ChoiceButton
                                key={option}
                                label={option}
                                selected={item.value === option}
                                onPress={() => {
                                    item.setValue(option);
                                    setTimeout(() => nextQuestion(index), 300);
                                }}
                            />
                        ))}
                    </View>
                )}

                {item.type === 'conclusion' && (     
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-[#00a16d] p-5 rounded-[15px]"
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-center font-bold text-xl">
                        C'est parti !
                    </Text>
                </TouchableOpacity> 
                )}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <FlatList
                    ref={flatListRef}
                    data={questions}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    windowSize={3}
                    getItemLayout={(data, index) => (
                        { length: width, offset: width * index, index }
                    )}
                    keyboardShouldPersistTaps="handled"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
