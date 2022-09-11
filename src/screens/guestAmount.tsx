import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Input, Button, NumericInput } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';

interface OrderParams { // order details
    navigation: any;
    day: number;
    month: number;
    year: number;
    theClub: {
        name: string;
        imageUrl: string;
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
    const navigation = useNavigation();

    const [maleAmount, setMaleAmount] = useState<number>(0); // male amount
    const [femaleAmount, setFemaleAmount] = useState<number>(0); // female amount
    const [phone, setPhone] = useState<string>(''); // users input phone number
    const [instagram, setInstegram] = useState<string>(''); // users instegram account

    // verify user phone number input
    const verifyPhoneNumber =  () => {
        if (phone === '') {
            Alert.alert('You should enter your phone number to proceed');
            return false;
        }
        else if (phone.length !== 10) {
            Alert.alert('Invalid phone number');
            return false;
        } else {
            return true;
        }
    }
        

    // handle the screen that is shown on every stage in the order
    const next = async () => {
        if (maleAmount + femaleAmount >= 5) {
            if (verifyPhoneNumber()) {
                props.navigation.navigate('tablePackage', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: phone})
            } // phone number check
        } // guest amount check 
        else {
        Alert.alert('to order a vip table you need at list 5 guests'); 
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
                            <Icons name= {sex} size= {42} color= 'white' />
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
                </ View>
        )
    }

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Guest Amont</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>You need to enter the number of the guest who are coming to the club</Text>
                </TouchableOpacity>
                <View style={style.peopleAmountContainer}>
                    <View style={{height: '20%'}}>
                        {peoplEamount("male")}
                    </View>
                    <View style={{height: '20%'}}>
                        {peoplEamount("female")}
                    </View>
                    <View style={{borderColor: 'white', borderWidth: 0.6, marginTop: '10%' }}></View>
                    <View style={{alignItems: 'center', marginTop: '5%'}}>
                        <TouchableOpacity style={{marginBottom: '5%', marginTop: '5%'}} onPress={Keyboard.dismiss}>
                            <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>Please enter your phone number and instegram account name to proceed</Text>
                        </TouchableOpacity>
                        <View style={{marginBottom: '5%',}}>
                            <NumericInput maxLenght={10} shortInput={false} placeholder='Phone number*' iconName='mobile1' onChangeText={(text) => setPhone(text)} />
                            <Input shortInput={false} placeholder='Instegram Account Name*' iconName='instagram' onChangeText={(text) => setInstegram(text)} />
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button smallButton={false} color1="#021925" color2="#537895" title='submit' onPress={() => next()} />
                    </View>
                </View>
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
        height: '50%',
        marginTop: '5%',
    },
    peopleAmountCard: { // people amount button wrapper
        width: '85%',
        height: '80%',
        borderRadius: 14,
        alignItems: 'center',
        marginTop: '3%',
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
    paymentMethodWrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1
    },
})