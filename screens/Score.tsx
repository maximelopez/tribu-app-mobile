import { StyleSheet, Text, View } from 'react-native';

export default function Score() {
  return (
    <View style={styles.container}>
      <Text>Score</Text>
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
