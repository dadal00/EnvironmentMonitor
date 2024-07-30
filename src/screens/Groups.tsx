import React from 'react';
import { Button, View, Text, StyleSheet, Image, Dimensions } from 'react-native';

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
            {/* <View style={styles.middle_container}>

            </View> */}
        </View>
     );
};

const styles = StyleSheet.create({
    title: {
        fontSize: SCREEN_WIDTH * 0.1,
        fontFamily: 'DMSans-Medium',
        marginLeft: SCREEN_WIDTH * 0.02,
        marginTop: SCREEN_WIDTH * 0.03,
        color: '#2F2F2F',
    },
    topBar: {
        position:'relative',
        width: '85%',
        // backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: '14%',
        flexDirection: 'row',
        alignItems: 'center',
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