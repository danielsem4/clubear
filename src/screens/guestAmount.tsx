import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image, Modal } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Input, Button, NumericInput, PopUp } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import LottieView from 'lottie-react-native';

interface OrderParams { // order details
    navigation: any;
    day: number;
    month: number;
    year: number;
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

const GuestAmount : FC<OrderParams> = (props) => {

    const route = useRoute();
    const order = route.params as OrderParams; // order details 
    const navigation = useNavigation(); // the navigation 

    const currentDate = new Date(); // todays date
    
    const [maleAmount, setMaleAmount] = useState<number>(0); // male amount
    const [femaleAmount, setFemaleAmount] = useState<number>(0); // female amount
    const [phone, setPhone] = useState<string>(''); // users input phone number
    const [facebook, setFacebook] = useState<string>(''); // users facebook account
    const [youngestAge, setYoungestAge] = useState<number>(0) // the youngest guest age

    const [showDatePickerVisibility, setShowDatePickerVisibility] = useState<boolean>(false); // the date select pop up
    const [date, setDate] = useState<Date>(new Date); // the date
    const [dateToShow, setDateToShow] = useState<string>('DD/MM/YYYY'); // selected day confirm

    const [popUp, setPopUp] = useState<boolean>(false); // control the pop up 
    const [content, setContent] = useState<number>(0); // the content on the pop up 

    // make the dateToShow updated in time
    useEffect(() => {
        setDateToShow(moment(date).format('DD/MM/YYYY'));
        setYoungestAge(currentDate.getFullYear() - date.getFullYear());
    },[date, dateToShow, content, popUp]);

    
    // set the new date by user
    const onDateSelected = (selectedDate: Date) => {
        const newDate = selectedDate || date; // the new date that was selected
        if (checkDateValidation(selectedDate) === 0) {
            setDate(newDate);
            setShowDatePickerVisibility(false);
            setDateToShow(moment(date).format('DD/MM/YYYY'));
            Alert.alert(`You choose the date: ${dateToShow}`);

        } else if(checkDateValidation(selectedDate) === 1) {
            setYoungestAge(0);
            setDate(newDate);
            setShowDatePickerVisibility(false);
            setDateToShow(moment(date).format('DD/MM/YYYY'));
            Alert.alert(`You choose the date: ${dateToShow}`);
        } else {
            setShowDatePickerVisibility(false);
            Alert.alert('Invalid date');
        }
    }

    // check if date is valid return 0 if date is valid, 1 if the youngest guest age is under the age limit, 2 if the date is invalid (like tomorrows date)
    const checkDateValidation = (selectedDate: Date) => {
        if (currentDate.getFullYear() < selectedDate.getFullYear()) { // curr year is smaller then selected year (can not born after this date)
            return 2;
        }
        else if (currentDate.getDate() < selectedDate.getDate() && currentDate.getMonth() >= selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()) { // curr day is smaller and curr month is bigger or equal
            return 2;
        }
        else if (currentDate.getMonth() < selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()) { // curr month is smaller and curr year is equal
            return 2;
        }
        else if (currentDate.getFullYear() - Number(order.theClub.age) < selectedDate.getFullYear()) { // the year of birth is to high
            return 1;
        }
        else if (currentDate.getMonth() < selectedDate.getMonth() && currentDate.getFullYear() - Number(order.theClub.age) === selectedDate.getFullYear()) { // missing  couple months to the age limit 
            return 1;
        }
        else if(currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate()) {
            return 1;
        }
        else { // valid date
            return 0;
        }

    }

    // hide the datePicker
    const hideDatePicker = () => {
        setShowDatePickerVisibility(false);
      };

    // verify user phone number input
    const verifyPhoneNumber =  () => {
        if (phone === '') {
            setContent(2);
            setPopUp(true);
            return false;
        }
        else if (phone.length !== 10) {
            setContent(3);
            setPopUp(true);
            return false;
        } else {
            return true;
        }
    }

    // verify user phone number input
    const verifyFacebook =  () => {
        if (facebook === '') {
            setContent(1);
            setPopUp(true);
            return false;
        } else {
            return true;
        }
    }
        
    // handle the screen that is shown on every stage in the order
    const next = async () => {
        if (maleAmount + femaleAmount >= 5) {
            if (verifyPhoneNumber()) {
                if (verifyFacebook()) {
                    if (youngestAge >= Number(order.theClub.age)) {
                        props.navigation.navigate('tablePackage', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: phone, maleAmount: maleAmount, femaleAmount: femaleAmount})
                    } else {
                        setContent(4);
                        setPopUp(true);
                    } // age check
                } // facebook check
            } // phone number check
        } // guest amount check 
        else {
        setContent(0);
        setPopUp(true);
        }
    }

    // add male
    const addMale = () => {
        setMaleAmount(maleAmount + 1);
    }

    // add female
    const addFemale = () => {
        setFemaleAmount(femaleAmount + 1);
    }

    // substruct male
    const reduceMale = () => {
        if (maleAmount > 0)
            setMaleAmount(maleAmount - 1);
    }

    // substruct female
    const reduceFemale = () => {
        if (femaleAmount > 0)
            setFemaleAmount(femaleAmount - 1);
    }

    // box where you add and substruct amont of people on stage 0 of the order
    const peoplEamount = (sex: string) => {
        return(
            <View style={{justifyContent: 'center'}}>
                <View style={style.peopleAmountCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',  width: '99%'}}>
                        <Icons name= {sex} size= {32} color= 'white' />
                        <Text style={[{marginLeft: '2.5%', fontSize: 20, color: 'white'}]}>Total {sex}</Text>
                        <View style={style.peopleAmountBox}>
                            <TouchableOpacity onPress={sex === 'male' ? addMale : addFemale}>
                                <Amount name="plus" size={30} style={style.addMinusIconContainer} />
                            </TouchableOpacity>
                            <Text style={style.peopleAmount}> {sex === 'male' ? maleAmount : femaleAmount}</Text>
                            <TouchableOpacity onPress={sex === 'male' ? reduceMale : reduceFemale}>
                                <Amount name="minus" size={30} style={style.addMinusIconContainer} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#09203F', '#428399']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Guest Amont</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>Enter the guest amount and the youngest guest date of birth</Text>
                </TouchableOpacity>
                <View style={style.peopleAmountContainer}>
                    <View style={{height: '12%'}}>
                        {peoplEamount("male")}
                    </View>
                    <View style={{height: '12%'}}>
                        {peoplEamount("female")}
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', width: '100%'}}>
                        <Button smallButton={true} title="Birthday Date" color1='#09203F' color2='#428399' onPress={() => setShowDatePickerVisibility(true) } />
                        <View style={{width: '30%', height: '145%'}}>
                            <LottieView source={require('../assets/calender2.json')} speed={0.8} autoPlay loop />
                        </View>
                        <DateTimePickerModal
                            isVisible={showDatePickerVisibility}
                            mode='date'
                            onConfirm={onDateSelected}
                            onCancel={hideDatePicker}
                            style={{backgroundColor: '#333333'}}
                            />
                    </View>
                    <View style={{borderColor: 'white', borderWidth: 0.6, marginTop: '3%'}}></View>
                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={{marginBottom: '5%', marginTop: '5%'}} onPress={Keyboard.dismiss}>
                            <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>Please enter your phone number and Facebook account name to proceed</Text>
                        </TouchableOpacity>
                        <View style={{marginBottom: '5%',}}>
                            <NumericInput maxLenght={10} shortInput={false} placeholder='Phone number*' iconName='mobile1' onChangeText={(text) => setPhone(text)} />
                            <Input shortInput={false} placeholder='Facebook Account Name*' iconName='facebook-square' onChangeText={(text) => setFacebook(text)} />
                        </View>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: '5%'}}>
                        <Button smallButton={false} color1='#09203F' color2='#428399' title='Next' onPress={() => next()} />
                    </View>
                </View>
                <PopUp visible={popUp} onPress={() => setPopUp(false)} age={Number(order.theClub.age)} content={content} onPressOk={() => {}} />
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default GuestAmount;

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
    closeIcon: { // the close icon style
        color: 'black',
        alignSelf: 'flex-start',
        marginLeft: '2%',
        
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
    peopleAmountContainer: { // people amount buttons wrapper
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: '5%',
    },
    peopleAmountCard: { // people amount button wrapper
        width: '85%',
        height: '90%',
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        elevation: 15,
        backgroundColor: '#333333',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    peopleAmountBox: { // people amount button wrapper
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'space-evenly',
        borderColor: 'white',
        alignItems: 'center',
        marginLeft: '30%'
    },
    addMinusIconContainer: { // add button style
        color: 'white',
    },
    peopleAmount:{ // people amount number style
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: '6%'
    },
    peopleSex: { // the gender text style
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    },
    popUpCardStyle: { // the pop up card
        backgroundColor: '#8c8c8c',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width,
        height: 250,
        alignSelf: 'center',
        alignContent: 'center',
        borderRadius: 20,
        marginTop: '50%'
    },
    popUpImageStyle: { // the image style
        width: 130,
        height: 130,
        alignSelf: 'center'
    }
})