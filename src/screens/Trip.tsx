import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, ScrollView, Platform, Modal, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GroupsScreen from './Groups';
import { OverlayContext } from '../components/OverlayManager';
import GroupViewScreen from './GroupView';

type Props = NativeStackScreenProps<RootStackParamList, 'Trip'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BORDER_RAD = SCREEN_WIDTH * 0.03;

const TripScreen = ({ navigation}: Props ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { currentOverlayScreen, setCurrentOverlayScreen } = React.useContext(OverlayContext)
    
    const renderOverlayContent = () => {
        switch (currentOverlayScreen) {
          case 'Groups':
            return (
              <GroupsScreen/>
            );
          case 'GroupView':
            return (
              <GroupViewScreen/>
            );
          default:
            return null;
        }
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Fridge')} style={styles.navButton}>
                <Image 
                    source={{uri: 'fridge'}}
                    style={styles.navButton_image} 
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.icon_container}>
                    <Image
                        source={{ uri: 'default_trip_icon' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
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
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlayContainer}>
                    <TouchableOpacity style={styles.transparentArea} onPress={() => setModalVisible(false)} />
                    {renderOverlayContent()}
                    <TouchableOpacity onPress={() => setCurrentOverlayScreen('Groups') } style={styles.group_tab}>
                        <Image 
                            source={{ uri: 'group' }}
                            style={styles.group_tab_pic}
                            resizeMode="contain"
                        />
                        <Text style={styles.group_tab_text}>Groups</Text>
                    </TouchableOpacity>
                    <View style={styles.receipt_tab}>
                        <Image 
                            source={{ uri: 'dollar_sign' }}
                            style={styles.receipt_tab_pic}
                            resizeMode="contain"
                        />
                        <Text style={styles.receipt_tab_text}>Receipts</Text>
                    </View>
                    <View style={styles.settings_tab}>
                        <Image 
                            source={{ uri: 'gear' }}
                            style={styles.settings_tab_pic}
                            resizeMode="contain"
                        />
                        <Text style={styles.settings_tab_text}>Settings</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    settings_tab_pic: {
        width: SCREEN_WIDTH * 0.05,
        height: SCREEN_WIDTH * 0.05,
    },
    settings_tab_text: {
        fontFamily: 'DMSans-Medium',
        fontSize: SCREEN_WIDTH * 0.045,
        marginLeft: SCREEN_WIDTH * 0.025,
        color: 'white',
    },
    settings_tab: {
        bottom: SCREEN_WIDTH * 0.2,
        right: -SCREEN_WIDTH * 0.0875,
        position: 'absolute',
        backgroundColor: '#2F2F2F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '90deg' }],
        borderRadius: SCREEN_WIDTH * 0.03,
        paddingBottom: SCREEN_WIDTH * 0.05,
        paddingTop: SCREEN_WIDTH * 0.01,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
    },
    receipt_tab_pic: {
        width: SCREEN_WIDTH * 0.055,
        height: SCREEN_WIDTH * 0.055,
    },
    receipt_tab_text: {
        fontFamily: 'DMSans-Regular',
        fontSize: SCREEN_WIDTH * 0.045,
        marginLeft: SCREEN_WIDTH * 0.025,
        // color: '#2F2F2F',
    },
    receipt_tab: {
        top: SCREEN_WIDTH * 0.565,
        right: -SCREEN_WIDTH * 0.095,
        position: 'absolute',
        backgroundColor: '#9A9990',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '90deg' }],
        borderRadius: SCREEN_WIDTH * 0.03,
        paddingBottom: SCREEN_WIDTH * 0.05,
        paddingTop: SCREEN_WIDTH * 0.01,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
    },
    group_tab_text: {
        fontFamily: 'DMSans-Regular',
        fontSize: SCREEN_WIDTH * 0.045,
        marginLeft: SCREEN_WIDTH * 0.025,
        // color: '#2F2F2F',
    },
    group_tab_pic: {
        width: SCREEN_WIDTH * 0.065,
        height: SCREEN_WIDTH * 0.065,
    },
    group_tab: {
        position: 'absolute',
        top: SCREEN_WIDTH * 0.2,
        right: -SCREEN_WIDTH * 0.08,
        // width: SCREEN_WIDTH * 0.27,
        // height: SCREEN_WIDTH * 0.08,
        backgroundColor: '#BFBEB5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '90deg' }],
        borderRadius: SCREEN_WIDTH * 0.03,
        paddingBottom: SCREEN_WIDTH * 0.05,
        paddingTop: SCREEN_WIDTH * 0.01,
        paddingHorizontal: SCREEN_WIDTH * 0.04,
        // paddingHorizontal: SCREEN_WIDTH * 0.05,
    },
    icon_container: {
        position: 'relative',
        width: SCREEN_WIDTH * 0.24, // Set width and height according to your needs
        height: SCREEN_WIDTH * 0.24,
        ...Platform.select({
          ios: {
            shadowColor: '#D4D3CB',
            shadowOffset: { width: SCREEN_WIDTH * 0.01, height: SCREEN_WIDTH * 0.009 },
            shadowOpacity: 1,
            shadowRadius: 0, 
          }
        }), 
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: SCREEN_WIDTH * 0.12, // Make the image circular
        borderColor: 'transparent', // Optional: Remove any default border
        borderWidth: 0,
        backgroundColor: 'white',
    },
    transparentArea: {
        width: '100%',
        height: '32%',
        position: 'absolute',
        // backgroundColor: 'transpar',
        top: SCREEN_WIDTH * 0.79,
    },
    overlayContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
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
        color: '#2F2F2F',
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
        color: '#2F2F2F',
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
        color: '#2F2F2F',
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
        color: '#2F2F2F',
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
        // flexShrink: 1,
        // backgroundColor: 'blue',
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
        color: '#2F2F2F',
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
        fontFamily: 'DMSans-Medium',
        color: '#2F2F2F',
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