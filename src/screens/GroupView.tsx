import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const GroupView = () => {
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Image
                source={{ uri: 'group_icon' }}
                style={styles.top_image}
                resizeMode="contain"
            />
            <Text style={styles.topTitle}>Group #1</Text>
            <View style={styles.member_holder}>
                <View style={styles.user_icons_holder}>
                    <View style={styles.user_icon3}>
                        <Text style={styles.user_icon_text3}>ZA</Text>
                    </View>
                    <View style={styles.user_icon2}>
                        <Text style={styles.user_icon_text2}>AM</Text>
                    </View>
                    <View style={styles.user_icon}>
                        <Text style={styles.user_icon_text}>AW</Text>
                    </View>
                </View>
                <Text style={styles.member_text}>Members</Text>
            </View>
        </View>
        <View style={styles.middleContainer}>
            <Text style={styles.middle_title}>Upcoming</Text>
            <View style={styles.trip_container}>
                <ScrollView>
                    <View style={styles.trip}>
                        <Text style={styles.trip_date}>12.29</Text>
                        <Text style={styles.trip_title}>My Trip</Text>
                        <View style={styles.arrow_circle}>
                            <Image
                                source={{ uri: 'up_right' }}
                                style={styles.arrow}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.trip}>
                        <Text style={styles.trip_date}>12.29</Text>
                        <Text style={styles.trip_title}>My Trip</Text>
                        <View style={styles.arrow_circle}>
                            <Image
                                source={{ uri: 'up_right' }}
                                style={styles.arrow}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View style={styles.trip}>
                        <Text style={styles.trip_date}>12.29</Text>
                        <Text style={styles.trip_title}>My Trip</Text>
                        <View style={styles.arrow_circle}>
                            <Image
                                source={{ uri: 'up_right' }}
                                style={styles.arrow}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
        <View style={styles.bottomContainer}>
            <Text style={styles.receipt_title}>Receipts</Text>
            
            <View style={styles.receipt_container}>
                <ScrollView horizontal = {true}>
                    <View style={styles.receipt_holder}></View>
                    <View style={styles.receipt_holder}></View>
                    <View style={styles.receipt_holder}></View>
                </ScrollView>
            </View>
            
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    receipt_holder: {
        width: SCREEN_WIDTH * 0.26,
        height: '100%',
        backgroundColor: 'white',
        marginRight: SCREEN_WIDTH * 0.0275,
        borderRadius: SCREEN_WIDTH * 0.02,
    },
    receipt_container: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'white',
    },
    receipt_title: {
        fontFamily: 'DMSans-Medium',
        color: '#2F2F2F',
        fontSize: SCREEN_WIDTH * 0.055,
        marginBottom: SCREEN_WIDTH * 0.03, 
        // marginLeft: SCREEN_WIDTH * 0.03, 
    },
    bottomContainer: {
        width: '88%',
        alignSelf: 'center',
        marginTop: SCREEN_WIDTH * 0.05,
        // backgroundColor: 'pink',
        height: SCREEN_WIDTH * 0.35,
    },
    arrow: {
        width: SCREEN_WIDTH * 0.045,
        height: SCREEN_WIDTH * 0.045,
    },
    arrow_circle: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.10,
        height: SCREEN_WIDTH * 0.10,
        backgroundColor: 'white',
        right: SCREEN_WIDTH * 0.03,
        borderRadius: SCREEN_WIDTH * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trip_title: {
        fontFamily: 'DMSans-Medium',
        fontSize: SCREEN_WIDTH * 0.06,
        top: SCREEN_WIDTH * 0.055,
        left: SCREEN_WIDTH * 0.32,
        position: 'absolute',
        // justifyContent: 'center',
        color: '#E7E7E1',
    },
    trip_date: {
        fontFamily: 'DMSans-Bold',
        fontSize: SCREEN_WIDTH * 0.09,
        color: '#F8F8F8',
    },
    trip: {
        width: '98.5%',
        backgroundColor: '#2F2F2F',
        borderRadius: SCREEN_WIDTH * 0.04,
        padding: SCREEN_WIDTH * 0.03,
        alignItems: 'center',
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                shadowColor: '#B4B2A6',
                shadowOffset: { width: SCREEN_WIDTH * 0.01, height: SCREEN_WIDTH * 0.01 },
                shadowOpacity: 1,
                shadowRadius: 0, 
            }
        }),
        marginBottom: SCREEN_WIDTH * 0.03, 
        paddingLeft: SCREEN_WIDTH * 0.04, 
    },
    trip_container: {
        width: '100%',
        flex: 1,
        // backgroundColor: 'blue',
    },
    middle_title: {
        fontFamily: 'DMSans-Medium',
        color: '#2F2F2F',
        fontSize: SCREEN_WIDTH * 0.055,
        marginBottom: SCREEN_WIDTH * 0.04, 
        marginLeft: SCREEN_WIDTH * 0.02, 
    },
    middleContainer: {
        width: '88%',
        // backgroundColor: 'pink',
        alignSelf: 'center',
        marginTop: SCREEN_WIDTH * 0.045,
        height: SCREEN_WIDTH * 0.51,
    },
    member_text: {
        fontFamily: 'SpaceGrotesk-Bold',
        marginLeft: SCREEN_WIDTH * 0.06,
        fontSize: SCREEN_WIDTH * 0.045,
        marginRight: SCREEN_WIDTH * 0.02,
        color: '#F8F8F8',
    },
    user_icon_text: {
        fontFamily: 'SpaceGrotesk-SemiBold',
        color:'#F8F8F8',
        fontSize: SCREEN_WIDTH * 0.03,
    },
    user_icon: {
        backgroundColor: '#686868',
        borderRadius: SCREEN_WIDTH * 0.035,
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_WIDTH * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -SCREEN_WIDTH * 0.0235,
    },
    user_icon_text2: {
        fontFamily: 'SpaceGrotesk-SemiBold',
        color:'#F8F8F8',
        fontSize: SCREEN_WIDTH * 0.03,
    },
    user_icon2: {
        backgroundColor: '#BFBEB5',
        borderRadius: SCREEN_WIDTH * 0.035,
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_WIDTH * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -SCREEN_WIDTH * 0.0235,
    },
    user_icon_text3: {
        fontFamily: 'SpaceGrotesk-SemiBold',
        color:'#2F2F2F',
        fontSize: SCREEN_WIDTH * 0.03,
    },
    user_icon3: {
        backgroundColor: '#D2D2D2',
        borderRadius: SCREEN_WIDTH * 0.035,
        width: SCREEN_WIDTH * 0.07,
        height: SCREEN_WIDTH * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -SCREEN_WIDTH * 0.0235,
    },
    user_icons_holder: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: 'pink',
    },
    member_holder: {
        flexDirection: 'row',
        borderRadius: SCREEN_WIDTH * 0.135,
        backgroundColor: '#2F2F2F',
        padding: SCREEN_WIDTH * 0.02,
        paddingHorizontal: SCREEN_WIDTH * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SCREEN_WIDTH * 0.02,
    },
    topTitle: {
        fontFamily: 'DMSans-Medium',
        fontSize: SCREEN_WIDTH * 0.13,
        color: '#2F2F2F',
    },
    top_image: {
        // marginTop: SCREEN_WIDTH * 0.04,
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,
        backgroundColor: 'white',
        borderRadius: SCREEN_WIDTH * 0.1625,
    },
    topContainer: {
        width: '86%',
        height: SCREEN_WIDTH * 0.6,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        marginTop: SCREEN_WIDTH * 0.15,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    container: {
        width: '90%',
        flex: 1,
        backgroundColor: '#BFBEB5',
        zIndex: 1,
    },
});

export default GroupView;