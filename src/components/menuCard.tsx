import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome';
import { OrderBox } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';

const {height, width} = Dimensions.get('screen');

interface Product {
    price: number;
    name: string;
    productImageUrl: string;


}

const MenuCard : FC<Product> = (props) => {
    return (
        <View style={{width, height: height / 5.5, alignItems: 'center', justifyContent: 'center'}}>
            <View style={style.menuCardStyle}>
                <View style={{marginLeft: '2%'}}>
                    <Text style={{color: 'white', fontSize: 24, marginBottom: '12%'}}>{props.name}</Text>
                    <Text style={{color: 'white', fontSize: 22, marginBottom: '5%'}}>Price: {props.price}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '40%'}}>
                        <TouchableOpacity >
                            <Amount name="minus" size={26} style={{color: 'white', marginTop: '5%'}} />
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 24}}>0</Text>
                        <TouchableOpacity >
                            <Amount name="plus" size={26} style={{color: 'white', marginTop: '5%'}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={require('../assets/beluga_witout_background.png')} style={{width: '30%', height: height / 6.5}} />
            </View>
        </View>
    );
}

export default MenuCard;

const style = StyleSheet.create({
    menuCardStyle: {
        height: '100%',
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
        elevation: 15,
        backgroundColor: '#262626',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


