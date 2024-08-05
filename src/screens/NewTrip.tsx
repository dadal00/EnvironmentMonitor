// App.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTrip'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to My Basic App</Text>
      <Text style={styles.bodyText}>This is a simple example of a basic screen in React Native.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
