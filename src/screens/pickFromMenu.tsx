import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import '../constants/firebase'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Button, OrderBox } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';

interface Product {
    category: string;
    clubID: string;
    name: string;
    price: string;
    productPictureUrl: string;
}

interface OrderParams { // order details
    navigation: any;
    day: number;
    month: number;
    year: number;
    phoneNumber: string;
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

const PickFromMenu : FC<OrderParams> = (props) => {

    const route = useRoute();
    const order = route.params as OrderParams; // order details 
    const navigation = useNavigation();

    const [products, setProducts] = useState<Product[]>([]); // the club products
    const [productCategory, setProductCategory] = useState<string[]>(['']); // the product category

    useEffect(() => { // get the clubs menu items
        const getProducts = async () => {
            await firebase.firestore().collectionGroup('menu').get().then((querySnapshot) => {
                querySnapshot.forEach(snapshot => {
                    products.push(snapshot.data() as Product);
                });
                setProducts([...products]);
            }).then(() => {
                setProductCategory(Array.from(new Set(products.map(products => products.category))));
            });
            console.log(products);
        }
        getProducts();
    }, [])
    
    return (
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => navigation.goBack()}/>
                        <Text style={style.headline}>Order Build</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                    <Text style={style.describeText}>Please build your order</Text>
                </TouchableOpacity>
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
                <View style={{alignItems: 'center', alignSelf: 'center', marginTop: '3%'}}>
                    <Button color1='#021925' color2='#537895' title='continue' onPress={() => props.navigation.navigate('payment')} />
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default PickFromMenu;

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