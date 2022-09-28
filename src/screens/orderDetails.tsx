import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import { Button } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/orderReducer';
import * as firebaseFunctions from '../constants/firebaseauth';
import QRCode from 'react-native-qrcode-svg';

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

const {height, width} = Dimensions.get('screen');

const OrderDetails : FC<OrderParams> = () => {

    const dispatch = useDispatch(); // exe for redux functions
    const menuState = useSelector((state: RootState) => state.menu); // get the states from redux

    const route = useRoute();
    const order = route.params as OrderParams; // order details 
    const navigation = useNavigation();


    let data =`date - ${order.day}/${order.month}/${order.year},
               clubName - ${order.theClub.name},
               city - ${order.theClub.city},
               Gate Open - 11 PM / 23:00,
               male - ${order.maleAmount},
               female - ${order.femaleAmount},
               Order phone number - ${order.phoneNumber},
               Your order - ${menuState.products[1].name} ${menuState.products[1].quantity}`
    
    
    const details = (iconName: string, theDetails: string | number, details: string) => {
        return (
            <View style={style.clubInfoAndIconWrapper}>
                <Icons name={iconName} style={style.iconStyle} />
                <Text style={style.clubInfoTextContent}>{details}  {theDetails}</Text>
            </View>
        )
        
    }
    
    return (
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#09203F', '#428399']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Order details</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <ImageBackground imageStyle={{ height: '100%' }} style={{ height: '42%' }} source={require('../assets/djBear.png')} />
                <View style={{flexDirection: 'column'}}>
                    <View style={style.qrCard}>
                        <Text style={{color: 'white', fontSize: 22, padding: 2, textAlign: 'center'}}>Dress up and let's party into the night</Text>
                        <Text style={{color: 'white', fontSize: 22, padding: 2, textAlign: 'center'}}>all your details are in this QR</Text>
                        <View style={{alignSelf: 'center', marginTop: '5%', alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 22, padding: 2, textAlign: 'center'}}>Take a screen shot </Text>
                            <QRCode size={200} value={data} />
                            <View style={{alignItems: 'center', alignContent: 'center', marginTop: '5%'}}>
                                <Button title="Details" color1="#09203F" color2="#428399" onPress={() => {}} smallButton={false} />
                            </View>
                        </View> 
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default OrderDetails;

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
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '70%'
    },
    clubInfoAndIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
        marginLeft: '1%'
    },
    iconStyle: {
        color: 'white',
        fontSize: 35,
        marginRight: '3%',
    },
    clubInfoTextContent: {
        color: 'white',
        fontSize: 20,
    },
    qrCard: {
        height: '60%',
        width: '90%',
        borderRadius: 14,
        alignItems: 'center',
        marginTop: '3%',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        alignSelf: 'center'
    }
});