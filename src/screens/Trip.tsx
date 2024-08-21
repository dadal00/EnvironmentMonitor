import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Button, View, Text, StyleSheet, Dimensions, Image, ScrollView, Platform, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, VirtualizedList, ListRenderItem, FlatList } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GroupsScreen from './Groups';
import ReceiptScreen from './Receipt'
import { OverlayContext } from '../components/OverlayManager';
import GroupViewScreen from './GroupView';
import Modal from 'react-native-modal';
import { useDatabase } from '../components/DatabaseContext';
import Trip from '../../model/Trip';
import Store from '../../model/Store';
import { FlashList } from '@shopify/flash-list';

type Props = NativeStackScreenProps<RootStackParamList, 'Trip'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BORDER_RAD = SCREEN_WIDTH * 0.03;

const formatDate = (dateString: string): string => {
    if (dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return `${month}. ${day}. ${year}`;
    }
    return '';
};

const TripScreen = ({ navigation}: Props ) => {
    const [trip, setTrip] = useState<Trip | null>(null);
    const database = useDatabase();
    const [modalVisible, setModalVisible] = useState(false);
    const [newStore, setNewStore] = useState(false);
    const [id, setID] = useState('');
    // const [store, setStore] = useState(false);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState<any[]>([]);
    const [placeholder, setPlaceholder] = useState('');
    const { currentOverlayScreen, setCurrentOverlayScreen } = React.useContext(OverlayContext);
    const [isEditing, setIsEditing] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [opened, setOpened] = useState(Array(data.length).fill(false));
    const [isEditingStore, setEditingStore] = useState(Array(data.length).fill(false));
    
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
            case 'Receipts':
                return (
                    <ReceiptScreen/>
                );
            default:
                return null;
        }
    };

    const fetchTrip = async () => {
        try {
            const trips = await database?.collections
                .get<Trip>('trips')
                .query()
                .fetch();
            if (trips && trips.length > 0) {
                setTrip(trips[0]);
                const stores = await trips[0]?.stores.fetch();
                setData(stores);
            }
        } catch (error) {
            console.error('Failed to fetch trips:', error);
        }
    }

    useEffect(() => {
        fetchTrip();
    }, []);

    const handleSave = (index?: number) => {
        const trimmedText = placeholder.trim();
        if (trimmedText === '') {
            setPlaceholder('');
        } else {
            setPlaceholder(trimmedText);
        }
        if (index) {
            toggleEdit(index);
        } else {
            setIsEditing(false);
        }
        Keyboard.dismiss();
    };

    const pushNew = async () => {
        try {
            await database?.write(async () => {
                database.collections .get< Store >('stores') .create(store => { 
                    store.trip.set(trip);
                    store.name = placeholder;
                    store.touched = Date.now(); 
                });
            });
        } catch (error) {
            console.error('Failed to add store:', error);
        }
    }

    const pushChange = async (id: string, placeholder: string) => {
        try {
            await database?.write(async () => {
                const store = await database?.collections .get< Store >('stores') .find(id);
                await store?.update((record) => {
                    record.name = placeholder;
                });
            });
        } catch (error) {
            console.error('Failed to add store:', error);
        }
    }

    const push = async (id?: string) => {
        if (id) {
            if (placeholder != data[index].name) {
                pushChange(id, placeholder);
            }
            setPlaceholder('');
        } else{
            if (placeholder != '') {
                pushNew();
            }
            setNewStore(false);
            setPlaceholder(''); 
        }
    }

    type ParentViewProps = {
        children: ReactNode;
      };

    const ParentView: React.FC<ParentViewProps> = ({ children }) => 
    {
        if (isEditing || isEditingStore[index]) {
            return (
                <TouchableWithoutFeedback onPress={() => {
                        Keyboard.dismiss; 
                        handleSave(index);
                        push(id);
                        fetchTrip();
                    }} 
                    accessible={false}
                >
                    <View style={styles.container}>
                        {children}
                    </View >
              </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View style={styles.container}>
                    {children}
                </View>
              );
        }
    }
    
    const toggleStyle = (index: number) => {
        const newArray = [...opened] as unknown as boolean[];
        newArray[index] = !opened[index]; // Toggle the value
        setOpened(newArray);
    };

    const toggleEdit = (index: number) => {
        const newArray = [...isEditingStore] as unknown as boolean[];
        newArray[index] = !isEditingStore[index]; // Toggle the value
        setEditingStore(newArray);
    };

    return (
        <ParentView>
            <TouchableOpacity onPress={() => navigation.navigate('Fridge')} style={styles.navButton}>
                <Image 
                    source={{uri: 'fridge'}}
                    style={styles.navButton_image} 
                    resizeMode='contain'
                />
            </TouchableOpacity>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => {setModalVisible(true); setCurrentOverlayScreen('Groups');
                }} style={styles.icon_container}>
                    <Image
                        source={{ uri: 'default_trip_icon' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <View style={styles.trip_header}>
                    <ScrollView horizontal={true} style={{width: SCREEN_WIDTH * 0.51, marginTop: SCREEN_WIDTH * 0.04,}}>
                        <Text style={styles.trip_title} numberOfLines={1}>
                            {trip?.name}
                        </Text>
                    </ScrollView>
                    <View style={styles.tag_box}>
                        <View style={styles.tag}>
                            <Image source={{ uri: 'calendar' }} 
                            style={styles.tag_pic} 
                            resizeMode='contain'/>
                            <Text style={styles.tag_text}>{formatDate(trip?.date)}</Text>
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
                <ScrollView ref={scrollViewRef}>
                    { newStore ? (
                        <View style={styles.groceryList}>
                            <TouchableOpacity style={styles.wrapper}>
                                <TextInput
                                    // onFocus={() => {scrollViewRef?.current?.scrollToEnd({animated: false});}}
                                    value={placeholder}
                                    onChangeText={newText => setPlaceholder(newText)}
                                    style={styles.groceryList_title}
                                    autoFocus = {isEditing}
                                    returnKeyType="done"
                                    multiline={false}
                                    onSubmitEditing={() => {handleSave(); push(); fetchTrip();}}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    maxLength={36}
                                />
                            </TouchableOpacity> 
                            <View style={styles.existing_item}>
                                <View style={styles.bullet_block}>
                                    <Image source={{ uri: 'new_bullet'}}
                                    style={styles.bullet_pic}
                                    resizeMode='contain'/>
                                </View>
                            </View>
                        </View> ) : null
                    }
                    {data.map((item, index) => 
                        opened[index] ? (
                            <TouchableOpacity onPress={() => {setIndex(index); setID(item.id); toggleStyle(index);}} style={styles.groceryList} key={index}>
                                <TouchableOpacity onPress={() => {setIndex(index); setID(item.id); toggleEdit(index); setPlaceholder(data[index].name);}} style={styles.wrapper}>
                                    {isEditingStore[index] ?
                                        (<TextInput
                                            // onFocus={() => {scrollViewRef?.current?.scrollToEnd({animated: false});}}
                                            value={placeholder}
                                            onChangeText={newText => setPlaceholder(newText)}
                                            style={styles.groceryList_title}
                                            autoFocus = {isEditingStore[index]}
                                            returnKeyType="done"
                                            multiline={false}
                                            onSubmitEditing={() => {handleSave(index); push(item.id); fetchTrip();}}
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            maxLength={36}
                                        />) :
                                        (<Text style={styles.groceryList_title}>{item.name}</Text>)
                                    }
                                </TouchableOpacity> 
                                <View style={styles.existing_item}>
                                    <View style={styles.bullet_block}>
                                        <Image source={{ uri: 'new_bullet'}}
                                        style={styles.bullet_pic}
                                        resizeMode='contain'/>
                                    </View>
                                </View>
                            </TouchableOpacity> ) : (
                            <TouchableOpacity onPress={() => {setIndex(index); setID(item.id); toggleStyle(index);}} key={index} style={opened[index] ? styles.groceryList : styles.unopened_list}>
                                <View style={styles.caveInCorner}>
                                    <View style={styles.triangle}/>
                                </View>
                                <Text style={styles.unopened_title}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    )}
                </ScrollView>
                
            </View>
            <View style={styles.bottom_container}>
                <TouchableOpacity style={styles.new_store} onPress={() => {setNewStore(true); setIsEditing(true); }}>
                    <Text style={styles.plus_sign}>+</Text>
                </TouchableOpacity>
            </View>
            <Modal
                // transparent={true}
                animationIn='slideInLeft'
                animationOut='slideOutLeft'
                isVisible={modalVisible}
                // onRequestClose={() => setModalVisible(false)}
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
                    <TouchableOpacity onPress={() => setCurrentOverlayScreen('Receipts') } style={styles.receipt_tab}>
                        <Image 
                            source={{ uri: 'dollar_sign' }}
                            style={styles.receipt_tab_pic}
                            resizeMode="contain"
                        />
                        <Text style={styles.receipt_tab_text}>Receipts</Text>
                    </TouchableOpacity>
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
        </ParentView>  
    );
};

const styles = StyleSheet.create({
    flashListContainer: {
        flexGrow: 1,
    },
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
        backgroundColor: 'white', 
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
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        position: 'absolute',
        left: -SCREEN_WIDTH * 0.05,
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
        right: -SCREEN_WIDTH * 0.011,
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
        width: SCREEN_WIDTH * 0.735,
        // backgroundColor: 'blue',
    },
    groceryList_title: {
        fontSize: SCREEN_WIDTH * 0.075,
        // fontWeight: '400',
        fontFamily: 'DMSans-Medium',
        marginHorizontal: SCREEN_WIDTH * 0.05,
        marginBottom: SCREEN_WIDTH * 0.02,
        color: '#2F2F2F',
        // backgroundColor: 'blue',
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
        maxHeight: SCREEN_HEIGHT * 0.6,
        alignSelf: 'center',
        marginBottom: SCREEN_WIDTH * 0.025,
        backgroundColor: 'pink',
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
        height: SCREEN_WIDTH * 0.27,
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
        position:'absolute',
        flex: 1,
    },
    navButton: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    navButton_image: {
        marginTop: SCREEN_HEIGHT * 0.06,
        marginRight: SCREEN_WIDTH * 0.03,
        height: SCREEN_WIDTH * 0.07,
        width: '100%',
        aspectRatio: 1,
    }
})

export default TripScreen;