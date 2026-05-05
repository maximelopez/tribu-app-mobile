import { StyleSheet, Text, View } from 'react-native';

export default function Activities() {
  return (
    <View style={styles.container}>
      <Text>Activités</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
