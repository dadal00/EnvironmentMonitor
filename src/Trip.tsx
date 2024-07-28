import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from './App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavigationButton from './NavigationButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Trip'>;

const TripScreen = ({ navigation}: Props ) => {
    return (
        <View style={styles.container}>
            <NavigationButton
                onPress={() => navigation.navigate('Fridge')}
                imageUri={"fridge"}
            />
        </View>
     );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    }
})

export default TripScreen;