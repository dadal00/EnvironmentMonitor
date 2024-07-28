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
            <View>
                <TripIcon
                    onPress={() => navigation.navigate('Fridge')}
                    imageUri={'default_trip_icon'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
    },
    navButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
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