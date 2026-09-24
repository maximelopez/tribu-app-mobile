import { StyleSheet, Text, View } from 'react-native';

export default function Rewards () {
    return (
        <View style={styles.container}>
            <Text>Récompences</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});