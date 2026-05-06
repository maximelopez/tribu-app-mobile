import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity  } from "react-native";
import MapView, { Marker } from "react-native-maps";

const API_URL = 'https://tribu-app.onrender.com/api/';

interface Place {
    _id: string;
    categorie: string;
    nom: string;
    adresse: string;
    ville: string;
    latitude: number;
    longitude: number;
}

export default function Map() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await fetch(API_URL + 'places?city=Angers');
                const data = await response.json();
                if (response.ok) setPlaces(data);
            } catch (error) {
                console.log('Erreur fetch places:', error);
            }
        };

        fetchPlaces();
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <MapView
                initialRegion={{
                    latitude: 47.46,
                    longitude: -0.55,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
                style={styles.map}
            >
                {places.map((place) => (
                    <Marker 
                        key={place._id} 
                        coordinate={{ latitude: place.latitude, longitude: place.longitude }}
                        onPress={() => setSelectedPlace(place)}
                    >
                    </Marker>
                ))}
            </MapView>

            {selectedPlace && (
                <View style={styles.card}>
                    <TouchableOpacity 
                        onPress={() => setSelectedPlace(null)}
                        style={styles.closeButton}
                    >
                        <Text style={{ color: 'gray' }}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.nom}>{selectedPlace.nom}</Text>
                    <Text style={styles.categorie}>{selectedPlace.categorie}</Text>
                    <Text style={styles.adresse}>{selectedPlace.adresse}</Text>
                    <Text style={styles.adresse}>{selectedPlace.ville}</Text>
                </View>
            )}
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    card: {
        position: 'absolute',
        bottom: 30,
        left: 16,
        right: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    nom: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    categorie: {
        color: 'gray',
        fontSize: 13,
        marginBottom: 4,
    },
    adresse: {
        fontSize: 13,
        color: '#444',
    },
});