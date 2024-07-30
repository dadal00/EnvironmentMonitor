import React from 'react';
import { Button, View, Text } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Fridge'>;

const FridgeScreen = ({ navigation}: Props ) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>pretend you see a fridge</Text>
          <Button
            title="Go to Trip"
            onPress={() => navigation.popToTop()}
          />
        </View>
     );
};

export default FridgeScreen;