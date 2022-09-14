import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import { Input, Button } from "../components";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';

interface ClubsParameters {
    navigation: any;
    theClub: {
        name: string;
        url: string;
        map_url: string;
        menu_url: string;
        city: string;
        age: string;
        musicType: string;
        openingTime: string;
        about: string;
        mapCoordinates: {
            latitude: 32.05506,
            longitude: 34.77488
        };
    }
}

const {height, width} = Dimensions.get('screen');

const PickDate : FC<ClubsParameters> = (props) => {

    const currentDate = new Date();

    const route = useRoute();
    const club = route.params as ClubsParameters;
    const navigation = useNavigation();

    console.log(club.theClub);
    

    const [date, setDate] = useState<Date>(new Date()); // the date
    const [showDatePickerVisibility, setShowDatePickerVisibility] = useState<boolean>(false); // the date select pop up

    const [dateToShow, setDateToShow] = useState<string>(moment(Date.now()).format('DD/MM/YYYY')); // selected day confirm

    // make the dateToShow updated in time
    useEffect(() => {
        setDateToShow(moment(date).format('DD/MM/YYYY'));
    },[date, dateToShow]);

    // set the new date by user
    const onDateSelected = (selectedDate: Date) => {
        if (checkDateValidation(selectedDate)) {
            const currentDate = selectedDate || date;
        setDate(currentDate);
        setShowDatePickerVisibility(false);
        setDateToShow(moment(date).format('DD/MM/YYYY'));
        } else {
            setShowDatePickerVisibility(false);
            Alert.alert('Invalid date');
        }
    }

    // check if date is valid
    const checkDateValidation = (selectedDate: Date) => {
        if (currentDate.getFullYear() > selectedDate.getFullYear()) { // curr year is bigger then selected year
            return false;
        }
        else if (currentDate.getDate() > selectedDate.getDate() && currentDate.getMonth() >= selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()) { // curr day is bigger and curr month is bigger or equal
            return false;
        }
        else if (currentDate.getMonth() > selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()) { // curr month is bigger and curr year is equal
            return false;
        }
        else { // valid date
            return true;
        }

    }

    // hide the datePicker
    const hideDatePicker = () => {
        setShowDatePickerVisibility(false);
      };

    return (
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Pick Date</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>Please choose the date</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '80%'}}>
                    <View>
                        <Button smallButton={false} title="Pick Date" color2='#021925' color1='#537895' onPress={() => setShowDatePickerVisibility(true) } />
                        <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>Your selected date is</Text>
                        <Text style={{color: 'white', fontSize: 30, textAlign: 'center', marginBottom: '10%'}}> {dateToShow} ? </Text>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <DateTimePickerModal
                         isVisible={showDatePickerVisibility}
                         mode='date'
                         onConfirm={onDateSelected}
                         onCancel={hideDatePicker}
                         style={{backgroundColor: '#333333'}}
                        />
                    </View>
                    <ImageBackground source={require('../assets/selena_line.png')} style={{height: '63%', width}} />
                    <View style={{marginBottom: '5%'}}>
                        <Button smallButton={false} title="Next" color2='#021925' color1='#537895' onPress={() => props.navigation.navigate('guestAmount', {theClub: club.theClub, day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()})} />
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default PickDate;

const style = StyleSheet.create({
    imageBackgroundContainer: { // background image container for the home screen
        flex: 1,
        width: '100%',
        height: height / 0.99
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerWrapper: { // the header style
        borderWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        height: '8%',
        borderRadius: 5
    },
    headerContainer: { // the headder content wrapper
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backIcon: { // the back icon style
        color: 'white',
        alignSelf: 'center',
        marginLeft: '2%',
        marginTop: '4%'
    },
    headline: { // the headline text style
        fontSize: 24,
        color: 'white',
        justifyContent: 'center',
        marginTop: '5.5%',
        marginRight: '6%'
    },
    describe: { // on every page describe wrapper
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        alignSelf: 'center'
    },
    describeText: { // the describe text style
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
        textAlign: 'center'
    },
})