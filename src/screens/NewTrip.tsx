// App.js
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Dropdown} from 'react-native-element-dropdown';

LocaleConfig.locales['special'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'Mar.', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    today: "Today"
  };

LocaleConfig.defaultLocale = 'special';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface ChildScreenProps {
    hideModal: () => void;
}

const NewTripScreen: React.FC<ChildScreenProps> = ({ hideModal }) => {
    const [text, setText] = useState('');
    const [dateOpen, setDateOpen] = useState(false);
    const [groupOpen, setGroupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isEditing, setIsEditing] = useState(false);
    // const [isFocus, setIsFocus] = useState(false);
    const [items, setItems] = useState<{ label: string; value: Date }[]>();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [selectedDay, setSelectedDay] = React.useState(new Date().toISOString().slice(0, 10));
    const [selected, setSelected] = useState(false);

    const handleMonthChange = (newMonth: React.SetStateAction<Date>) => {
        setSelectedDate(newMonth);
    };

    const formatDate = (dateString: string): string => {
        // Parse the date string
        const [year, month, day] = dateString.split('-').map(Number);
    
        // Create a new Date object
        const date = new Date(year, month - 1, day); // month is 0-indexed
    
        // Get the day of the week, month name, day number, and year
        const options: Intl.DateTimeFormatOptions = { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        return formattedDate;
      };

    useEffect(() => {
        
        const items = [];
        // const startYear = startDate.getFullYear();
        let currentMonth = new Date();
    
        for (let i = 0; i < 36; i++) {
            const year = currentMonth.getFullYear();
            const month = monthNames[currentMonth.getMonth()];
            items.push({
                label: `${month} ${year}`,
                value: new Date(year, currentMonth.getMonth(), 1)
            });
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        setItems(items);
    }, []);

    const handleSave = () => {
        const trimmedText = text.trim();
        if (trimmedText === '') {
            setText('');
        } else {
            setText(trimmedText);
        }
        setIsEditing(false);
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss; handleSave();}} accessible={false}>
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
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.tripIcon}/>
                    <View style={styles.trip_name}>
                        <Text style={styles.trip_name_header}>Trip Name</Text>
                        <TouchableOpacity style={styles.trip_name_enter} onPress={() => setIsEditing(true)}>
                            {isEditing ? (
                                <TextInput
                                    value={text}
                                    onChangeText={setText}
                                    style={styles.entered_text}
                                    autoFocus
                                    returnKeyType="done"
                                    multiline={false}
                                    onSubmitEditing={handleSave}
                                />
                            ) : (
                                <Text style={styles.entered_text}>{text || 'Tap to enter text'}</Text>
                            )}
                            <TouchableOpacity style={styles.entered_text_button} onPress={() => setText('')}>
                                <Image
                                    source={{uri: 'x_button'}}
                                    style={styles.entered_text_button_pic} 
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.trip_info} onPress={() => {setDateOpen(!dateOpen); setSelectedDate(new Date());}}>
                        {   
                            (!dateOpen) ? (
                                <View style={styles.caveInCorner}>
                                    <View style={styles.triangle}/>
                                </View>
                            ) : null
                        }
                        <Image
                            source={{uri: 'white_calendar'}}
                            style={styles.trip_date_pic} 
                            resizeMode='contain'
                        />
                        { 
                            (!selected) ? (
                                <Text style={styles.trip_info_text}>Choose Date</Text>

                            ) : (
                                <Text style={styles.trip_info_text}>{formatDate(selectedDay)}</Text>
                            )
                        }
                        
                    </TouchableOpacity>
                    {   
                        (dateOpen) ? (
                            <View style={styles.expandedDate}>
                                <Dropdown
                                    onChange={item => {handleMonthChange(item.value);}}
                                    data={items as { label: string; value: Date }[]}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={monthNames[selectedDate.getMonth()] + " " + selectedDate.getFullYear()}
                                    style={styles.dropContainer}
                                    placeholderStyle={styles.placeholder}
                                    maxHeight={SCREEN_HEIGHT * 0.25}
                                    selectedTextStyle={styles.placeholder}
                                    itemTextStyle={styles.placeholder}
                                    containerStyle={styles.list}
                                />
                                <Calendar
                                    theme={{
                                        // dayTextColor: '#FFFFFF',
                                        todayTextColor: '#FFFFFF',
                                        calendarBackground: '#6E6D66',
                                        // selectedDayBackgroundColor: '#343333',
                                        // textDayFontFamily: 'monospace',
                                        // textDayFontSize: SCREEN_WIDTH * 0.05,
                                        'stylesheet.day.basic': {
                                            text: {
                                                fontFamily: 'DMSans-Bold',
                                                fontSize: SCREEN_WIDTH * 0.04,
                                                color: '#FFFFFF',
                                                marginTop: SCREEN_WIDTH * 0.015,
                                                marginLeft: SCREEN_WIDTH * 0.004,
                                                // marginHorizontal: SCREEN_WIDTH * 0.01,
                                                // alignSelf: 'center',
                                            },
                                            base: {
                                                width: SCREEN_WIDTH * 0.08,
                                                // backgroundColor: 'blue',
                                                height: SCREEN_WIDTH * 0.08,
                                                alignItems: 'center',
                                                // justifyContent: 'center',
                                                // padding: SCREEN_WIDTH * 0.01,
                                            },
                                            selected: {
                                                backgroundColor: '#343333',
                                                borderRadius: SCREEN_WIDTH * 0.04,
                                            },
                                        },
                                        'stylesheet.calendar.main': {
                                            week: {
                                                marginVertical: SCREEN_WIDTH * 0.001,
                                                flexDirection: 'row',
                                                justifyContent: 'space-around'
                                            },
                                        },
                                        'stylesheet.calendar.header': {
                                            week: {
                                                backgroundColor: '#343333',
                                                // marginTop: 7,
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                borderRadius: SCREEN_WIDTH * 0.3,
                                            },
                                            dayHeader: {
                                                // marginTop: 2,
                                                // marginBottom: 7,
                                                marginVertical: SCREEN_WIDTH * 0.005,
                                                width: 32,
                                                textAlign: 'center',
                                                color: '#FFFFFF',
                                                fontFamily: 'DMSans-Bold',
                                                fontSize: SCREEN_WIDTH * 0.04,
                                            },
                                        }
                                    }}
                                    initialDate={selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1)}
                                    style={styles.calendar}
                                    hideArrows={true}
                                    customHeaderTitle={<Text></Text>}
                                    hideExtraDays={true}
                                    // onDayPress={onDayPress}
                                    markedDates={{
                                        [selectedDay]: { selected: true },
                                    }}
                                    onDayPress={(day: { dateString: React.SetStateAction<string>; }) => {
                                        setSelectedDay(day.dateString);
                                        setSelected(true);
                                    }}
                                />
                            </View>
                        ) : null
                    }
                    <TouchableOpacity style={styles.trip_info} onPress={() => setGroupOpen(!groupOpen)}>
                        {   
                            (!groupOpen) ? (
                                <View style={styles.caveInCorner}>
                                    <View style={styles.triangle}/>
                                </View>
                            ) : null
                        }
                        <Image
                            source={{uri: 'white_group'}}
                            style={styles.trip_group_pic} 
                            resizeMode='contain'
                        />
                        <Text style={styles.trip_info_text}>Choose Group</Text>
                    </TouchableOpacity>
                    {   
                        (groupOpen) ? (
                            <View style={styles.expandedDate}>
                                <ScrollView style={styles.groupScroll}> 
                                    <TouchableOpacity style={styles.group}>
                                        <Image
                                            source={{ uri: 'group_icon' }}
                                            style={styles.group_icon}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.group_name}>Group #1</Text>
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
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.group}>
                                        <Image
                                            source={{ uri: 'group_icon' }}
                                            style={styles.group_icon}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.group_name}>Group #1</Text>
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
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.group}>
                                        <Image
                                            source={{ uri: 'group_icon' }}
                                            style={styles.group_icon}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.group_name}>Group #1</Text>
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
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.group}>
                                        <Image
                                            source={{ uri: 'group_icon' }}
                                            style={styles.group_icon}
                                            resizeMode="contain"
                                        />
                                        <Text style={styles.group_name}>Group #1</Text>
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
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        ) : null
                    }
                </ScrollView>
                <TouchableOpacity style={styles.create_trip} onPress={() => {
                    const trimmedText = text.trim();
                    if (trimmedText === '') {
                        setText('');
                    }
                    
                }}>
                    <Text style={styles.create_trip_text}>Create Trip</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    entered_text_button_pic: {
        width: SCREEN_WIDTH * 0.06,
        height: SCREEN_WIDTH * 0.06,
    },
    user_icons_holder: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        alignSelf: 'center',
        right: SCREEN_WIDTH * 0.05,
        // backgroundColor: 'blue',
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
    group_name: {
        fontFamily: 'DMSans-Medium',
        fontSize: SCREEN_WIDTH * 0.05,
        color: '#2F2F2F',
        position: 'absolute',
        alignSelf: 'center',
        left: SCREEN_WIDTH * 0.19,
    },
    groupScroll: {
        marginTop: SCREEN_WIDTH * 0.05,
        marginBottom: SCREEN_WIDTH * 0.03,
        maxHeight: SCREEN_HEIGHT * 0.29,
    },
    group_icon: {
        width: SCREEN_WIDTH * 0.12,
        height: SCREEN_WIDTH * 0.12,
        // backgroundColor: 'white',
        borderRadius: SCREEN_WIDTH * 0.21,
        // borderColor: '#D2D2D2',
        // borderWidth: SCREEN_WIDTH * 0.01,
    },
    group: {
        marginBottom: SCREEN_WIDTH * 0.02,
        width: SCREEN_WIDTH * 0.7,
        // flexGrow: 1,
        alignSelf: 'center',
        backgroundColor: '#F8F8F8',
        borderRadius: SCREEN_WIDTH * 0.08,
        padding: SCREEN_WIDTH * 0.015,
        flexDirection: 'row',
        
        // zIndex: 1,
    },
    calendar: {
        // padding: SCREEN_WIDTH * 0.5,
        marginHorizontal: SCREEN_WIDTH * 0.06,
        backgroundColor: '#6E6D66',
        marginTop: -SCREEN_WIDTH * 0.025,
        marginBottom: SCREEN_WIDTH * 0.04,
    },
    list:{
        backgroundColor: '#BFBEB5',
        // marginTop: -SCREEN_WIDTH * 0.01,
        // borderColor: 'transparent',
        // shadowColor: 'transparent',
        // zIndex: 0,
        // marginLeft: SCREEN_WIDTH * 0.002,
        // alignSelf: 'center',
    },
    placeholder: {
        fontFamily: 'DMSans-SemiBold',
        fontSize: SCREEN_WIDTH * 0.035,
        marginLeft: SCREEN_WIDTH * 0.02,
        color: '#343333',
    },
    dropContainer: {
        zIndex: 1,
        // flexShrink: 1,
        marginTop: SCREEN_WIDTH * 0.07,
        backgroundColor: '#BFBEB5',
        width: SCREEN_WIDTH * 0.4,
        borderRadius: SCREEN_WIDTH * 0.3,
        padding: SCREEN_WIDTH * 0.01,
        marginLeft: SCREEN_WIDTH * 0.075,
        // alignItems:
        // fontSize: SCREEN_WIDTH * 0.01,
    },
    scrollContainer: {
        // backgroundColor: 'blue', 
        width: '86%',
        // maxHeight: SCREEN_HEIGHT * 0.64,
        marginTop: SCREEN_WIDTH * 0.05,
        marginBottom: SCREEN_WIDTH * 0.115,
        // flexShrink: 1,
    },
    expandedDate: {
        // width: '100%', 
        marginTop: -SCREEN_WIDTH * 0.045,
        backgroundColor: '#6E6D66',
        zIndex: -1,
        borderBottomLeftRadius: SCREEN_WIDTH * 0.045,
        borderBottomRightRadius: SCREEN_WIDTH * 0.045,
        // padding: SCREEN_WIDTH * 0.045,
    },
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
        // position: 'absolute',
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
        left: SCREEN_WIDTH * 0.23,
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
        // width: '100%', 
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
        marginRight: SCREEN_WIDTH * 0.077,
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
    //   width: '86%',  
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
        alignSelf: 'center',
        // marginTop: SCREEN_WIDTH * 0.05,
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
