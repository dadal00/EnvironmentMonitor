import React from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, ScrollView, Platform } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NavigationButton from '../components/NavigationButton';
import TripIcon from '../components/TripIcon';

type Props = NativeStackScreenProps<RootStackParamList, 'Trip'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BORDER_RAD = SCREEN_WIDTH * 0.03;

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
            <View style={styles.middleContainer}>
                <ScrollView>
                    <View style={styles.groceryList}>
                        <View style={styles.wrapper}>
                            <Text
                                style={styles.groceryList_title}
                            >Costco</Text>
                        </View>
                        <View style={styles.existing_item}>
                            <View style={styles.bullet_block}>
                                <Image source={{ uri: 'existing_bullet'}}
                                style={styles.bullet_pic}
                                resizeMode='contain'/>
                            </View>
                            <Text style={styles.bullet_text}>Bananas</Text>
                        </View>
                        <View style={styles.existing_item}>
                            <View style={styles.bullet_block}>
                                <Image source={{ uri: 'existing_bullet'}}
                                style={styles.bullet_pic}
                                resizeMode='contain'/>
                            </View>
                            <Text style={styles.bullet_text}>Chicken Breasts</Text>
                        </View>
                        <View style={styles.existing_item}>
                            <View style={styles.bullet_block}>
                                <Image source={{ uri: 'existing_bullet'}}
                                style={styles.bullet_pic}
                                resizeMode='contain'/>
                            </View>
                            <Text style={styles.bullet_text}>Ground Beef</Text>
                        </View>
                        <View style={styles.existing_item}>
                            <View style={styles.bullet_block}>
                                <Image source={{ uri: 'existing_bullet'}}
                                style={styles.bullet_pic}
                                resizeMode='contain'/>
                            </View>
                            <Text style={styles.bullet_text}>Milk</Text>
                        </View>
                        <View style={styles.existing_item}>
                            <View style={styles.bullet_block}>
                                <Image source={{ uri: 'existing_bullet'}}
                                style={styles.bullet_pic}
                                resizeMode='contain'/>
                            </View>
                            <Text style={styles.bullet_text}>Eggs</Text>
                        </View>
                        <View style={styles.existing_item}>
                            <View style={styles.bullet_block}>
                                <Image source={{ uri: 'new_bullet'}}
                                style={styles.bullet_pic}
                                resizeMode='contain'/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.unopened_list}>
                        <View style={styles.caveInCorner}>
                            <View style={styles.triangle}/>
                        </View>
                        <Text style={styles.unopened_title}>Target</Text>
                    </View>
                    <View style={styles.unopened_list}>
                        <View style={styles.caveInCorner}>
                            <View style={styles.triangle}/>
                        </View>
                        <Text style={styles.unopened_title}>Trader Joe's</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottom_container}>
                <View style={styles.new_store}>
                    <Text style={styles.plus_sign}>+</Text>
                </View>
                <View style={styles.finish_trip}>
                    <Text style={styles.finish_text}>Finish Trip!</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    finish_text: {
        color: '#F8F8F8',
        fontSize: SCREEN_WIDTH * 0.045,
        fontWeight: '500',
        fontFamily: 'DMSans-Regular',
    },
    bottom_container: {
        width: '87%',
        alignSelf: 'center',
    },
    finish_trip: {
        alignSelf: 'flex-end',
        width: '40%',
        backgroundColor: '#2F2F2F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SCREEN_WIDTH * 0.04,
        padding: SCREEN_WIDTH * 0.026,
        // paddingHorizontal: SCREEN_WIDTH * 0.02,
    },
    plus_sign: {
        fontSize: SCREEN_WIDTH * 0.07,
        // fontWeight: '700',
        fontFamily: 'DMSans-Bold',
    },
    new_store: {
        width: '99.5%',
        alignSelf: 'center',
        // flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BFBEB5',
        borderRadius: BORDER_RAD,
        padding: SCREEN_WIDTH * 0.02,
        // paddingHorizontal: SCREEN_WIDTH * 0.06,
        marginBottom: SCREEN_WIDTH * 0.03,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: Math.ceil(SCREEN_WIDTH * 0.085),
        borderBottomWidth: Math.ceil(SCREEN_WIDTH * 0.085),
        borderLeftColor: 'transparent',
        borderBottomColor: 'white', // Color of the triangle
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
        right: -SCREEN_WIDTH * 0.01,
        borderBottomLeftRadius: BORDER_RAD,
        // transform: [{ rotate: '45deg' }],
        // overflow:'visible',
    },
    unopened_title: {
        marginHorizontal: SCREEN_WIDTH * 0.05,
        fontSize: SCREEN_WIDTH * 0.07,
        // fontWeight: '400',
        fontFamily: 'DMSans-Medium',
    },
    unopened_list: {
        // marginTop: SCREEN_WIDTH * 0.03,
        marginBottom: SCREEN_WIDTH * 0.03,
        width: '98.5%',
        flexGrow: 1,
        backgroundColor: '#E0E0D9',
        borderRadius: BORDER_RAD,
        padding: SCREEN_WIDTH * 0.02,
        paddingHorizontal: SCREEN_WIDTH * 0.06,
        ...Platform.select({
            ios: {
                shadowColor: '#D9D8D0',
                shadowOffset: { width: SCREEN_WIDTH * 0.01, height: SCREEN_WIDTH * 0.01 },
                shadowOpacity: 1,
                shadowRadius: 0, 
            }
        }), 
    },
    bullet_text: {
        marginLeft: SCREEN_WIDTH * 0.035,
        fontSize: SCREEN_WIDTH * 0.04,
        fontFamily: 'DMSans-Regular',
    },
    bullet_pic: {
        width: '60%',
        height: '50%',
    },
    bullet_block: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH * 0.13,
        height: SCREEN_WIDTH * 0.09,
        borderRightColor: '#BFBEB5',
        borderRightWidth: SCREEN_WIDTH * 0.005,
    },
    existing_item: {
        borderBottomColor: '#BFBEB5',
        borderBottomWidth: SCREEN_WIDTH * 0.005,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    wrapper: {
        borderBottomColor: '#BFBEB5',
        borderBottomWidth: SCREEN_WIDTH * 0.005,
    },
    groceryList_title: {
        fontSize: SCREEN_WIDTH * 0.075,
        // fontWeight: '400',
        fontFamily: 'DMSans-Medium',
        marginHorizontal: SCREEN_WIDTH * 0.05,
        marginBottom: SCREEN_WIDTH * 0.02,
    },
    groceryList: {
        width:'98.5%',
        flexGrow: 1,
        backgroundColor: '#E0E0D9',
        borderRadius: BORDER_RAD,
        padding: SCREEN_WIDTH * 0.04,
        paddingHorizontal: SCREEN_WIDTH * 0.06,
        ...Platform.select({
            ios: {
                shadowColor: '#D9D8D0',
                shadowOffset: { width: SCREEN_WIDTH * 0.01, height: SCREEN_WIDTH * 0.01 },
                shadowOpacity: 1,
                shadowRadius: 0, 
            }
        }), 
        paddingBottom: SCREEN_WIDTH * 0.065,
        marginBottom: SCREEN_WIDTH * 0.03,
    },
    middleContainer: {
        width: '87%',
        height: '56%',
        alignSelf: 'center',
        marginBottom: SCREEN_WIDTH * 0.025,
    },
    tag: {
        flexShrink: 1,
        padding: SCREEN_WIDTH * 0.01,
        paddingHorizontal: SCREEN_WIDTH * 0.02,
        backgroundColor: '#BFBEB5',
        borderRadius: SCREEN_WIDTH * 0.06,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SCREEN_WIDTH * 0.02,
    },
    tag_pic: {
        width: SCREEN_WIDTH * 0.04,
        height: SCREEN_WIDTH * 0.05,
        marginRight: SCREEN_WIDTH * 0.025,
    },
    tag_text: {
        fontSize: SCREEN_WIDTH * 0.035,
        fontFamily: 'DMSans-Regular',
    },
    tag_box: {
        position: 'relative',
        flexDirection: 'row',
        marginTop: SCREEN_WIDTH * 0.025,
        marginLeft: -SCREEN_WIDTH * 0.01,
    },
    trip_title: {
        fontSize: SCREEN_WIDTH * 0.1,
        // fontWeight: '400',
        fontFamily: 'DMSans-Medium'
    },
    trip_header: {
        position: 'relative',
        marginLeft: SCREEN_WIDTH * 0.05,
        flexDirection: 'column',
    },
    topBar: {
        position:'relative',
        width: '87%',
        height: '15%',
        // backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: SCREEN_WIDTH * 0.04,
        marginTop: -SCREEN_WIDTH * 0.04,
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
        height: SCREEN_WIDTH * 0.07,
        width: '100%',
        aspectRatio: 1,
    }
})

export default TripScreen;