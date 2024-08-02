import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Platform, Modal, TouchableOpacity } from 'react-native';
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
                    source={{uri: 'gear'}}
                    style={styles.fridgeZoomButton_image} 
                    resizeMode='contain'
                />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Trip')} style={styles.tripButton}>
                  <View style={styles.tripContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Trip')} style={styles.tripPictureButton}>
                        <Image
                          source={{uri: 'default_trip_icon'}}
                          style={styles.tripPicture_image}
                          resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <View style={styles.tripHeader}>
                      <Text style={styles.tripTitle}>
                        My Trip
                      </Text>
                    </View>
                  </View>
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
  tripContainer: {
    width:'100%',
    height:'100%',
    alignSelf: 'center',
    backgroundColor: '#E0E0D9',
    borderRadius: 31,
    padding: SCREEN_WIDTH * 0.04,
    paddingHorizontal: SCREEN_WIDTH * 0.06,
    ...Platform.select({
        ios: {
            shadowColor: '#BFBEB5',
            shadowOffset: { width: SCREEN_WIDTH * 0.015, height: SCREEN_WIDTH * 0.015 },
            shadowOpacity: 1,
            shadowRadius: 0, 
        }
    }), 
    marginBottom: SCREEN_WIDTH * 0.03,
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: SCREEN_HEIGHT * .88,
    width: SCREEN_WIDTH * .9,
    marginBottom: SCREEN_WIDTH * 0.076,
  },
  tripPictureButton: {
    marginTop: SCREEN_HEIGHT * -.063,
    alignSelf: 'center',
    position: 'relative',
    height: SCREEN_WIDTH * .21,
    width: SCREEN_WIDTH * .23,
    borderRadius: SCREEN_WIDTH * .2,
    backgroundColor: 'white',
  },
  tripPicture_image: {
    width: '125%',
    alignSelf: 'center',
    height: '125%',
    borderRadius: SCREEN_WIDTH * 0.15, // Make the image circular
    borderColor: 'transparent', // Optional: Remove any default border
    borderWidth: 0,
  },
  tripHeader: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginTop: SCREEN_HEIGHT * .058
  },
  tripTitle: {
    fontSize: SCREEN_WIDTH * .11,
    fontFamily: 'DMSans-Medium',
    color: '#2F2F2F'
  }
})

export default FridgeScreen;