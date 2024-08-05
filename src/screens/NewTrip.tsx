// App.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';
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
            <View style={styles.trip_name}>
                <Text style={styles.trip_name_header}>Trip Name</Text>
                <View style={styles.trip_name_enter}>
                    <Text style={styles.entered_text}>Trip # 1</Text>
                    <Image
                        source={{uri: 'x_button'}}
                        style={styles.entered_text_button} 
                        resizeMode='contain'
                    />
                </View>
            </View>
            <View style={styles.trip_info}>
                <View style={styles.caveInCorner}>
                    <View style={styles.triangle}/>
                </View>
                <Image
                    source={{uri: 'white_calendar'}}
                    style={styles.trip_date_pic} 
                    resizeMode='contain'
                />
                <Text style={styles.trip_info_text}>Choose Date</Text>
            </View>
            <View style={styles.trip_info}>
                <View style={styles.caveInCorner}>
                    <View style={styles.triangle}/>
                </View>
                <Image
                    source={{uri: 'white_group'}}
                    style={styles.trip_group_pic} 
                    resizeMode='contain'
                />
                <Text style={styles.trip_info_text}>Choose Group</Text>
            </View>
            <View style={styles.create_trip}>
                <Text style={styles.create_trip_text}>Create Trip</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    create_trip_text: {
        color: '#F8F8F8',
        fontFamily: 'DMSans-Bold',
        fontSize: SCREEN_WIDTH * 0.048,
    },
    create_trip: {
        width: '86%',
        backgroundColor: '#343333',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SCREEN_WIDTH * 0.02,
        borderRadius: SCREEN_WIDTH * 0.05,
        bottom: SCREEN_WIDTH * 0.08,
        position: 'absolute',
    },
    trip_group_pic: {
        width: SCREEN_WIDTH * 0.13,
        height: SCREEN_WIDTH * 0.09,
        marginLeft: SCREEN_WIDTH * 0.0125,
    },
    trip_info_text: {
        color: '#FFFFFF',
        fontFamily: 'DMSans-Bold',
        fontSize: SCREEN_WIDTH * 0.048,
        // alignSelf: 'center'
        position: 'absolute',
        left: SCREEN_WIDTH * 0.25,
    },
    trip_date_pic: {
        width: SCREEN_WIDTH * 0.085,
        height: SCREEN_WIDTH * 0.085,
        marginLeft: SCREEN_WIDTH * 0.03,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: Math.ceil(SCREEN_WIDTH * 0.085),
        borderBottomWidth: Math.ceil(SCREEN_WIDTH * 0.085),
        borderLeftColor: 'transparent',
        borderBottomColor: '#E0E0D9', // Color of the triangle
        position: 'absolute',
        top: 0,
        right: 0,
        transform: [{ rotate: '-90deg' }],
    },
    caveInCorner: {
        width: Math.ceil(SCREEN_WIDTH * 0.085),
        height: Math.ceil(SCREEN_WIDTH * 0.085),
        backgroundColor: '#BFBEB5', // same as the background color of the parent container
        position: 'absolute',
        top: 0,
        right: 0,
        borderBottomLeftRadius: SCREEN_WIDTH * 0.03,
        // transform: [{ rotate: '45deg' }],
        // overflow:'visible',
    },
    trip_info: {
        width: '86%', 
        backgroundColor: '#6E6D66',
        marginTop: SCREEN_WIDTH * 0.03,
        padding: SCREEN_WIDTH * 0.03,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
        borderRadius: SCREEN_WIDTH * 0.045,
        flexDirection: 'row',
        alignItems: 'center',
    },
    entered_text_button: {
        width: SCREEN_WIDTH * 0.06,
        height: SCREEN_WIDTH * 0.06,
        borderRadius: SCREEN_WIDTH * 0.03,
        backgroundColor: '#2F2F2F',
        right: SCREEN_WIDTH * 0.025,
        alignSelf: 'center',
        position: 'absolute',
    },
    entered_text: {
        fontFamily: 'DMSans-Medium',
        fontSize: SCREEN_WIDTH * 0.05,
        marginLeft: SCREEN_WIDTH * 0.03,
    },
    trip_name_enter: {
        width: SCREEN_WIDTH * 0.75,
        alignSelf: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: SCREEN_WIDTH * 0.04,
        marginTop: SCREEN_WIDTH * 0.015,
        padding: SCREEN_WIDTH * 0.012,
        // alignSelf: 'center',
        marginBottom: SCREEN_WIDTH * 0.015,
        flexDirection: 'row',
    },
    trip_name_header: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: SCREEN_WIDTH * 0.05,
        color: '#F8F8F8',
    },
    trip_name: {
      width: '86%',  
      backgroundColor: '#6E6D66',
      marginTop: SCREEN_WIDTH * 0.06,
      padding: SCREEN_WIDTH * 0.025,
      paddingHorizontal: SCREEN_WIDTH * 0.04,
      borderRadius: SCREEN_WIDTH * 0.045,
    //   justifyContent: 'center',
    },
    tripIcon: {
        width: SCREEN_WIDTH * 0.30,
        height: SCREEN_WIDTH * 0.30,
        borderRadius: SCREEN_WIDTH * 0.15,
        backgroundColor: 'white',
        marginTop: SCREEN_WIDTH * 0.05,
        ...Platform.select({
            ios: {
                shadowColor: '#B4B2A6',
                shadowOffset: { width: SCREEN_WIDTH * 0.015, height: SCREEN_WIDTH * 0.015 },
                shadowOpacity: 1,
                shadowRadius: 0, 
            }
        }), 
    },
    topTitle: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: SCREEN_WIDTH * 0.07,
        alignSelf: 'center',
        color: '#343333',
        // top: SCREEN_WIDTH * 0.05,
    },
    closeX: {
        width: SCREEN_WIDTH * 0.0475,
        height: SCREEN_WIDTH * 0.0475,
    },
    closeButton: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.11,
        height: SCREEN_WIDTH * 0.11,
        backgroundColor: '#343333',
        borderRadius: SCREEN_WIDTH * 0.055,
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
    },
    topRow: {
        marginTop: SCREEN_WIDTH * 0.07,
        flexDirection: 'row',
        width: '86%',
        // alignSelf: 'center',
        // backgroundColor: 'grey',
        position: 'relative',
        justifyContent: 'center',
        height: SCREEN_WIDTH * 0.11,
    },
    container: {
        // flex: 1,
        width: SCREEN_WIDTH * 0.95,
        height: SCREEN_HEIGHT * 0.9,
        borderRadius: SCREEN_HEIGHT * 0.02,
        marginVertical: SCREEN_HEIGHT * 0.065,
        zIndex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0D9',
        // padding: 20,
    },
});

export default NewTripScreen;
