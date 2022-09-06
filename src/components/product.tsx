import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image, FlatList } from 'react-native';
import Amount from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Button, OrderBox } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';

const {height, width} = Dimensions.get('screen');

interface ProductProps {
    navigation: string;
    productCategory: string;
    product: {
        category: string;
        clubID: string;
        name: string;
        price: string;
        productPictureUrl: string;
    }[];
}


const Product : FC<ProductProps> = (props) => {

    
    return (
        <View>
            <Text style={style.flatListClubCity}>{props.productCategory}</Text>
            <FlatList
            style={{ flexGrow: 1 }}
            keyExtractor={(_, index) => index.toString()}
            data={props.product}
            ListFooterComponent={<View style={{height: 20}}/>}
            renderItem={({item}) => {
                return(
                    <View style={{width, height: height / 5.5, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={style.menuCardStyle}>
                        <View style={{marginLeft: '2%'}}>
                            <Text style={{color: 'white', fontSize: 24, marginBottom: '12%'}}>Beluga</Text>
                            <Text style={{color: 'white', fontSize: 22, marginBottom: '5%'}}>Price: 800₪</Text>
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
                 )
             }}
            />
        </View>
    ); 
}

export default Product;

const style = StyleSheet.create({
    flatListClubCity: {
        fontSize: 20,
        color: 'lightblue',
        marginRight: '73%',
        marginTop: '5%',
        marginLeft: '5%',
    },
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
