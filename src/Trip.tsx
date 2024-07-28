import React from 'react';
import { Button, View, Text } from 'react-native';
import { RootStackParamList } from './App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Trip'>;

const TripScreen = ({ navigation}: Props ) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Trip Screen</Text>
          <Button
            title="Go to Fridge"
            onPress={() => navigation.navigate('Fridge')}
          />
        </View>
     );
};

export default TripScreen;