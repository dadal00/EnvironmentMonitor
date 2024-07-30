import React from 'react';
import { Button, View, Text, StyleSheet, Image, Dimensions, ScrollView, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const GroupsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topBar}> 
                <Image
                    source={{ uri: 'group' }}
                    style={styles.group_image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>
                    My Groups
                </Text>
            </View>
            <View style={styles.middle_container}>
                <ScrollView> 
                    <View style={styles.group}>
                        <View style={styles.shadow_image}>
                            <Image
                                source={{ uri: 'group_icon' }}
                                style={styles.group_icon}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.group_holder}>
                            <Text style={styles.group_name}>Group #1</Text>
                            <View style={styles.user_icon}>
                                <Text style={styles.user_icon_text}>AW</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
     );
};

const styles = StyleSheet.create({
    user_icon_text: {

    },
    user_icon: {
        backgroundColor: '#686868',
        borderRadius: SCREEN_WIDTH * 0.05,
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_WIDTH * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    group_name: {
        fontFamily: 'DMSans-Medium',
        fontSize: SCREEN_WIDTH * 0.08,
        color: '#2F2F2F',
    },
    group_holder: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: SCREEN_WIDTH * 0.05,
    },
    shadow_image: {
        borderRadius: SCREEN_WIDTH * 0.115,
        width: SCREEN_WIDTH * 0.23,
        height: SCREEN_WIDTH * 0.23,
        backgroundColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    group_icon: {
        width: SCREEN_WIDTH * 0.21,
        height: SCREEN_WIDTH * 0.21,
        backgroundColor: 'white',
        borderRadius: SCREEN_WIDTH * 0.21,
        // borderColor: '#D2D2D2',
        // borderWidth: SCREEN_WIDTH * 0.01,
    },
    group: {
        marginBottom: SCREEN_WIDTH * 0.03,
        width: '98.5%',
        flexGrow: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: SCREEN_WIDTH * 0.05,
        padding: SCREEN_WIDTH * 0.03,
        flexDirection: 'row',
        // paddingHorizontal: SCREEN_WIDTH * 0.06,
        ...Platform.select({
            ios: {
                shadowColor: '#B4B2A6',
                shadowOffset: { width: SCREEN_WIDTH * 0.01, height: SCREEN_WIDTH * 0.01 },
                shadowOpacity: 1,
                shadowRadius: 0, 
            }
        }), 
    },
    middle_container: {
        width: '86%',
        height: '54%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginRight: -SCREEN_WIDTH * 0.02,
    },
    title: {
        fontSize: SCREEN_WIDTH * 0.095,
        fontFamily: 'DMSans-Medium',
        marginLeft: SCREEN_WIDTH * 0.03,
        marginTop: SCREEN_WIDTH * 0.03,
        color: '#2F2F2F',
    },
    topBar: {
        position:'relative',
        width: '84%',
        // backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: '14%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%',
    },
    container: {
        width: '90%',
        flex: 1,
        backgroundColor: '#BFBEB5',
    },
    group_image: {
        width: SCREEN_WIDTH * 0.17,
        height: SCREEN_WIDTH * 0.17,
    },
})

export default GroupsScreen;