import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Overlay Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '100%',
    backgroundColor: 'blue', // Ensure it covers the full width for animation purposes
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default GroupView;