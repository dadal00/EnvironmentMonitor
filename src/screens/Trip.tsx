import React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavigationButton from '../components/NavigationButton';
import TripIcon from '../components/TripIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Trip'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TripScreen = ({ navigation}: Props ) => {
    return (
        <View style={styles.container}>
            <NavigationButton
                onPress={() => navigation.navigate('Fridge')}
                imageUri={"fridge"}
                buttonStyle={styles.navButton}
                imageStyle={styles.navButton_image}
            />
            <View style={styles.topBar}>
                <TripIcon
                    onPress={() => navigation.navigate('Fridge')}
                    imageUri={'default_trip_icon'}
                />
                <View style={styles.trip_header}>
                    <Text style={styles.trip_title}>
                        My Trip
                    </Text>
                    <View style={styles.tag_box}>
                        <View style={styles.tag}>
                            <Image source={{ uri: 'calendar' }} 
                            style={styles.tag_pic} 
                            resizeMode='contain'/>
                            <Text style={styles.tag_text}>7. 24. 2024</Text>
                        </View>
                        <View style={styles.tag}>
                            <Image source={{ uri: 'default_group_pic' }} 
                            style={styles.tag_pic} 
                            resizeMode='contain'/>
                            <Text style={styles.tag_text}>Group #1</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        flexShrink: 1,
        padding: SCREEN_WIDTH * 0.01,
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        // paddingEnd: SCREEN_WIDTH * 0.03,
        // paddingStart: SCREEN_WIDTH * 0.025,
        // width: SCREEN_WIDTH * 0.30,
        // height: SCREEN_WIDTH * 0.065,
        backgroundColor: '#BFBEB5',
        borderRadius: SCREEN_WIDTH * 0.06,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SCREEN_WIDTH * 0.02,
        // padding: SCREEN_WIDTH * 0.01,
    },
    tag_pic: {
        // padding: SCREEN_WIDTH * 0.01,
        width: SCREEN_WIDTH * 0.04,
        height: SCREEN_WIDTH * 0.05,
        marginRight: SCREEN_WIDTH * 0.025,
        // backgroundColor: 'white',
    },
    tag_text: {
        fontSize: SCREEN_WIDTH * 0.035,
    },
    tag_box: {
        position: 'relative',
        flexDirection: 'row',
        marginTop: SCREEN_WIDTH * 0.025,
        marginLeft: -SCREEN_WIDTH * 0.01,
    },
    trip_title: {
        fontSize: SCREEN_WIDTH * 0.1,
        fontWeight: '400',
    },
    trip_header: {
        position: 'relative',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: SCREEN_WIDTH * 0.05,
        flexDirection: 'column',
    },
    topBar: {
        position:'relative',
        width: '87%',
        height: '16%',
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        position:'absolute'
    },
    navButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    navButton_image: {
        marginTop: SCREEN_HEIGHT * 0.05,
        marginRight: SCREEN_WIDTH * 0.03,
        height: SCREEN_WIDTH * 0.08,
        width: '100%',
        aspectRatio: 1,
    }
})

export default TripScreen;