import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome';
import { OrderBox } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { PanoramaView } from "@lightbase/react-native-panorama-view";
import * as firebaseFunctions from '../constants/firebaseauth';

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

const TablePackage : FC<OrderParams> = (props) => {
    
    const route = useRoute();
    const order = route.params as OrderParams; // order details 
    const navigation = useNavigation();

    const [tableMinPrice, setTableMinPrice] = useState<number>(0);

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

    const PanoramaDetails = () => (
        <View style={{flex: 1}}>
          <PanoramaView
            style={{height: 230}}
            dimensions={{ height: 230, width: Dimensions.get("window").width }}
            inputType="mono"
            imageUrl="je.jpg"
          />
        </View>
      );

    return (
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#09203F', '#428399']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Table Pack</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>Please choose your table </Text>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <OrderBox tableType="Regular" color="#009adf" price={2500} peopleAmount={5} onPress={() => props.navigation.navigate('pickFromMenu', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: order.phoneNumber, tableMinPrice: 2500, maleAmount: order.maleAmount, femaleAmount: order.femaleAmount})} />
                        <OrderBox tableType="Bar" color="#ff6acb" price={3200} peopleAmount={6} onPress={() => props.navigation.navigate('pickFromMenu', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: order.phoneNumber, tableMinPrice: 3200, maleAmount: order.maleAmount, femaleAmount: order.femaleAmount})} />
                        <OrderBox tableType="VIP" color="#c49b46" price={4600} peopleAmount={8} onPress={() => props.navigation.navigate('pickFromMenu', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: order.phoneNumber, tableMinPrice: 4500, maleAmount: order.maleAmount, femaleAmount: order.femaleAmount})} />
                    </View>
                        <ImageBackground style={{width: '100%', height: '55%', marginTop: '20%'}} source={require('../assets/clubMap.png')} />
                    </View>
                    
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default TablePackage;

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
});