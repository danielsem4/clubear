import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import { Input, Button } from "../components";
import * as firebaseFunctions from '../constants/firebaseauth';

const {height, width} = Dimensions.get('screen');

const Order : FC = () => {
    
    const navigation = useNavigation();

    const headLine = ['Guest Amount', 'Table Pack', ]; // the headlines in every screen

    const [maleAmount, setMaleAmount] = useState(0); // male amount
    const [femaleAmount, setFemaleAmount] = useState(0); // female amount
    const [orderStage, setOrderStage] = useState(1); // order screen number

    const [phone, setPhone] = useState<string>(''); // users input phone number

    const describe = [ // the instructions on every screen
     "You need to enter the number of the guest who are coming to the club",
     "Please choose your table",
    ];

    // verify user
    const verifyUserDetails = async () => {
        const currUser = await firebaseFunctions.getCurrUser();
        console.log(typeof(currUser));
        if (currUser) {
            if (currUser.phoneNumber === phone) {
                return true;
            } else {
                Alert.alert("the phone number you input does not match the number of your user");
                console.log(currUser.phoneNumber);
                return false
            }
        } else {
            Alert.alert("somthing went wrong, pls try again");
            return false
        }
    }

    // handle the screen that is shown on every stage in the order
    const next = async () => {
        if (orderStage < 1) {
            if (maleAmount + femaleAmount >= 5) {
                if (await verifyUserDetails()) {
                    setOrderStage(orderStage + 1);
                } // phone number check
            } // guest amount check 
            else {
            Alert.alert('to order a vip table you need at list 5 guests'); 
            }
        } // order stage check
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

    // box where you select the deals
    const deal = (color: string, table: string, peopleAmount: string, price: string) => {
        
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderColor: 'white', borderWidth: 0.8, marginTop: '3%', height: '9%'}}>
                <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: '5%'}}>
                    <Text style={{color: 'white', fontSize: 20, marginBottom: '4%'}}>{table} table</Text>
                    <Text style={{color: 'white', fontSize: 14}}>Maximum  {peopleAmount} people</Text>
                </View>
                <Text style={{color: 'white', fontSize: 18, marginLeft: '25%'}}> {price}₪</Text>
                <TouchableOpacity style={{backgroundColor: color, height: '100%', width: '20%', justifyContent: 'center'}} onPress={() => {}}>
                    <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}> Book</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // all order screens order by ascending order 
    const orderScreens = () => {
        switch (orderStage) {
            // enter guest amount
            case 0: 
                return (
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
                                <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>Please enter your phone number to proceed</Text>
                            </TouchableOpacity>
                            <View style={{marginBottom: '5%',}}>
                                <Input shortInput={false} placeholder='Phone number' iconName='mobile1' onChangeText={(text) => setPhone(text)} />
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Button color1="#021925" color2="#537895" title='submit' onPress={() => next()} />
                        </View>
                    </View>
                );

            // enter guests information
            case 1:
                return (
                    <View style={{flexDirection: 'column'}}>
                        {deal('#0066cc', 'Regular', '5', '3000')}
                        {deal('#ff3399', 'Premium', '8', '8500')}
                        {deal('#b3b300', 'Vip', '8', '10,000')}
                        <ImageBackground style={{width: '100%', height: '55%', marginTop: '20%'}} source={require('../assets/clubMap.png')} />
                    </View>
                );

            // select your table
            case 2:
                return (
                    <View>

                    </View>
                );

            // make changes to the table default package
            case 3:
                return (
                    <View>

                    </View>
                );

            // enter payment method and place an order
            case 4: 
                return (
                    <View>

                    </View>
                );
        }
    }

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => orderStage > 0 ? setOrderStage(orderStage - 1) : navigation.goBack()}/>
                        <Text style={{fontSize: 24, color: 'white', justifyContent: 'center', marginTop: '5.5%', marginRight: '6%'}}>{headLine[orderStage]}</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>{describe[orderStage]}</Text>
                </TouchableOpacity>
                {orderScreens()}
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default Order;

const style = StyleSheet.create({
    imageBackgroundContainer: { // background image container for the home screen
        flex: 1,
        width: '100%',
        height: height
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
    creditCardWrapper: {
        height: 200,
        width: '100%',
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        elevation: 15,
        backgroundColor: 'black',
        marginTop: '10%'
    },
    cardNumber: { // card number text style
        fontSize: 26,
        color: 'white',
        marginRight: '20%',
        marginTop: '5%'
    },
    cardHolderName: {
        fontSize: 26,
        color: 'white', 
        textAlign: 'left',
        marginRight: '42%',
    },
    cardExpiration: {
        fontSize: 18,
        color: 'white', 
        marginTop: '3%',
        marginBottom: '5%',
        marginRight: '30%'
    }
})
