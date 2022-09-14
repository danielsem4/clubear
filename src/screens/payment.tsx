import React, { FC, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Keyboard, Alert, KeyboardAvoidingView, TouchableOpacity, Image, Platform } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import CardBrand from 'react-native-vector-icons/Fontisto';
import Bank from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, OrderBox, Input, NumericInput } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import * as firebaseFunctions from '../constants/firebaseauth';
import { ScrollView } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const USE_LITE_CREDIT_CARD_INPUT = false;

interface OrderParams { // order details
    navigation: any;
    day: number;
    month: number;
    year: number;
    phoneNumber: string;
    maleAmount: number;
    femaleAmount: number;
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

const Payment : FC<OrderParams> = (props) => {

    const route = useRoute();
    const order = route.params as OrderParams; // order details 
    const navigation = useNavigation();

    console.log(order.theClub);
    

    const [cardNumber, setCardNumber] = useState<string>('4580 1059 1234 ****'); // card number
    const [cardHolderName, setHolderName] = useState<string>('Israel Israeli'); // card holder name
    const [cardExpired, setCardExpired] = useState<string>('MM/YY'); // card date of expire
    const [cardCvv, setCardCvv] = useState<string>('000'); // 3 numbers behind the card
    

    // const checkCardInputValidation = () => {
    //     if (cardCvv.length === 3 && cardHolderName !== '' && cardNumber.length === 19) {
            
    //     }
    // }

    const cardBrand = () => {
        if (cardNumber[0] === '4') {
            return <CardBrand name='visa' style={{marginTop: '6%', marginLeft: '82%'}} size={30} color='silver' />
        } else if (cardNumber[0] === '5') {
            return <CardBrand name='mastercard' style={{marginTop: '6%', marginLeft: '82%'}} size={30} color='silver' />
        } else if (cardNumber[0] === '3') {
            return <CardBrand name='american-express' style={{marginTop: '6%', marginLeft: '82%'}} size={30} color='silver' />
        } else if (cardNumber[0] === '6') {
            return <CardBrand name='discover' style={{marginTop: '6%', marginLeft: '82%'}} size={30} color='silver' />
        } else {
            return <Bank name='bank' style={{marginTop: '6%', marginLeft: '82%'}} size={30} color='silver' />
        }
    }
    
    return (
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Paymant</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>we will charge 10% from the order from the credit card for deposit </Text>
                </TouchableOpacity>
                <View style={style.paymentInputContainer}>  
                    <TouchableOpacity style={style.creditCardWrapper} onPress={Keyboard.dismiss}>
                        <ImageBackground source={require('../assets/graycreditcard.png')} style={style.creditCard} imageStyle={{ borderRadius: 12 }}>
                            {cardBrand()}
                            <Text style={{color: 'silver', fontSize: 24, marginTop: '15%', marginLeft: '24%', fontWeight: 'bold'}}>{cardNumber}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '9%'}}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text style={{color: 'silver', fontSize: 14, marginLeft: '6%'}}>CARD HOLDER</Text>
                                    <Text style={{color: 'silver', fontSize: 22, marginLeft: '6%', fontWeight: 'bold'}}>{cardHolderName}</Text>
                                </View>
                                <View>
                                    <Text style={{color: 'silver', fontSize: 14, marginRight: '4%'}}>VALID THRU</Text>
                                    <Text style={{color: 'silver', fontSize: 22, marginRight: '4%', fontWeight: 'bold'}}>{cardExpired}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{marginTop: '5%'}}>
                        <NumericInput maxLenght={19} shortInput={false} placeholder='Card Number*' iconName='creditcard' onChangeText={(text) => setCardNumber(text)} />
                        <Input shortInput={false} placeholder='Card Holder Name*' iconName='idcard' onChangeText={(text) => setHolderName(text)} />
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <NumericInput maxLenght={5} shortInput={true} placeholder='Expired*' iconName='calendar' onChangeText={(text) => setCardExpired(text)} />
                            <NumericInput maxLenght={3} shortInput={true} placeholder='CVV*' iconName='lock1' onChangeText={(text) => setCardCvv(text)} />
                        </View>
                    </View>
                    <View style={{alignItems: 'center', marginTop: '5%'}}>
                        <Button smallButton={false} color1='#021925' color2='#537895' title='continue' onPress={()  =>  props.navigation.navigate('orderDetails', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: order.phoneNumber, maleAmount: order.maleAmount, femaleAmount: order.femaleAmount})} />
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Payment;

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
        marginTop: '7%',
        alignSelf: 'center',
        marginBottom: '2%'
    },
    describeText: { // the describe text style
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
        textAlign: 'center'
    },
    paymentInputContainer: { // the credit card and inputs container
        flexDirection: 'column',
        height: '65%',
        width: '95%',
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 2,
        // backgroundColor: '#DCDCDC',
        elevation: 15,
        
        alignSelf: 'center'
    },
    creditCardWrapper: {
        width: '95%',
        marginTop: '4%',
        justifyContent: 'space-between',
    }, 
    creditCard: {
        aspectRatio: 2 / 1.22,
    }
});