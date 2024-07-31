import React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, ScrollView, Platform, Modal, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Fridge'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const FridgeScreen = ({ navigation}: Props ) => {
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Trip')} style={styles.fridgeZoomButton}>
                <Image 
                    source={{uri: 'default_trip_icon'}}
                    style={styles.fridgeZoomButton_image} 
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Trip')} style={styles.tripButton}>

            </TouchableOpacity>
        </View>
     );
};

const styles = StyleSheet.create ({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    position:'absolute'
  },
  fridgeZoomButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  fridgeZoomButton_image: {
    marginTop: SCREEN_HEIGHT * 0.05,
    marginRight: SCREEN_WIDTH * 0.03,
    height: SCREEN_WIDTH * 0.07,
    width: '100%',
    aspectRatio: 1,
  },
  tripButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
})

export default FridgeScreen;