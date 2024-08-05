// App.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OverlayContext } from '../components/OverlayManager';
// import { RootStackParamList } from '../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'NewTrip'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ChildScreenProps {
    hideModal: () => void;
  }

const NewTripScreen: React.FC<ChildScreenProps> = ({ hideModal }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                    <Image
                        source={{uri: 'X'}}
                        style={styles.closeX} 
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <Text style={styles.topTitle}>New Trip</Text>
            </View>
            <View style={styles.tripIcon}/>
        </View>
    );
};

const styles = StyleSheet.create({
    tripIcon: {
        width: SCREEN_WIDTH * 0.25,
        height: SCREEN_WIDTH * 0.25,
        borderRadius: SCREEN_WIDTH * 0.125,
        backgroundColor: 'white',
        marginTop: SCREEN_WIDTH * 0.07,
    },
    topTitle: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: SCREEN_WIDTH * 0.06,
        alignSelf: 'center',
        color: '#343333',
        // top: SCREEN_WIDTH * 0.05,
    },
    closeX: {
        width: SCREEN_WIDTH * 0.045,
        height: SCREEN_WIDTH * 0.045,
    },
    closeButton: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.11,
        height: SCREEN_WIDTH * 0.11,
        backgroundColor: '#343333',
        borderRadius: SCREEN_WIDTH * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
    },
    topRow: {
        marginTop: SCREEN_WIDTH * 0.17,
        flexDirection: 'row',
        width: '86%',
        // alignSelf: 'center',
        backgroundColor: 'grey',
        position: 'relative',
        justifyContent: 'center',
        height: SCREEN_WIDTH * 0.11,
    },
    container: {
        // flex: 1,
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_HEIGHT * 0.93,
        borderRadius: SCREEN_HEIGHT * 0.02,
        marginVertical: SCREEN_HEIGHT * 0.045,
        zIndex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        // padding: 20,
    },
});

export default NewTripScreen;
