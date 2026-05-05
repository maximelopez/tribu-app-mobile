import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

interface Location {
    latitude: number,
    longitude: number,
}

export default function Map() {
    const [userLocation, setUserLocation] = useState<Location | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});

                setUserLocation({ 
                    latitude: location.coords.latitude, 
                    longitude: location.coords.longitude
                });
            }
        })();
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
                <Marker coordinate={{ latitude: 47.48, longitude: -0.54 }} />
                <Marker coordinate={{ latitude: 47.46, longitude: -0.545 }} />
                {/* {userLocation && <Marker coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }} />} */}
            </MapView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});