import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, Image, FlatList } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import {LinearGradient} from 'expo-linear-gradient';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import '../constants/firebase'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/orderReducer';
import { Button, OrderBox, Product, ProductByCategory, PopUp } from "../components";
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import * as firebaseFunctions from '../constants/firebaseauth';

interface Product {
    category: string;
    clubID: string;
    name: string;
    price: number;
    productPictureUrl: string;
    describe: string;
}

interface OrderParams { // order details
    navigation: any;
    day: number;
    month: number;
    year: number;
    phoneNumber: string;
    tableMinPrice: number;
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

const PickFromMenu : FC<OrderParams> = (props) => {

    const dispatch = useDispatch(); // exe for redux functions
    const menuState = useSelector((state: RootState) => state.menu); // get the states from redux

    const route = useRoute();
    const order = route.params as OrderParams; // order details 
    const navigation = useNavigation();

    const [products, setProducts] = useState<Product[]>([]); // the club products
    const [productCategory, setProductCategory] = useState<string[]>([]); // the product category
    const [confirmation, setConfirmation] = useState<boolean>(false) // user Confirmation of the order details.

    const [popUpConfirm, setPopUpConfirm] = useState<boolean>(false); // control the pop up with the buttons 
    const [popUp, setPopUp] = useState<boolean>(false) // control the pop up without the buttnos
    const [content, setContent] = useState<number>(0); // the content on the pop up 

    useEffect(() => { // get the clubs menu items
        console.log("pick from menu useeffect");
        const getProducts = async () => {
            const id = await firebaseFunctions.getClubIdByName(order.theClub.name);
            await firebase.firestore().collectionGroup('menu').get().then((querySnapshot) => {
                querySnapshot.forEach(snapshot => {
                    const temp_product = snapshot.data() as Product;
                    if ( temp_product.clubID === id ) {
                        products.push(temp_product);
                    }
                });
                setProducts([...products]);
            }).then(() => {
                setProductCategory(Array.from(new Set(products.map(products => products.category))));
            });
            dispatch(useActions.updateMenuState())
        }
        menuState.gotProducts ? {} : getProducts(); 
    }, []);

    // the describe ot the top
    const topScreen = () => {
        return (
            <TouchableOpacity style={style.describe} onPress={Keyboard.dismiss}>
                <Text style={style.describeText}>Please build your order dont forget you have min price order of {order.tableMinPrice}₪</Text>
            </TouchableOpacity>
        )
    }

    // confirm the order
    const confirmOrder = () => {
        setConfirmation(true);
        setPopUpConfirm(false);
        props.navigation.navigate('payment', {theClub: order.theClub, day: order.day, month: order.month, year: order.year, phoneNumber: order.phoneNumber, maleAmount: order.maleAmount, femaleAmount: order.femaleAmount});
    }

    
    // check if the order is valid
    const checkOrder = () => {
        if(order.tableMinPrice > menuState.totalPrice) {
            setContent(6);
            setPopUp(true);
        } else {
            setContent(7);
            setPopUpConfirm(true);
        }
    }
    
    return (
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#09203F', '#428399']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() =>  {{dispatch(useActions.setNewCart()); dispatch(useActions.updateMenuState()); navigation.goBack()}}}/>
                        <Text style={style.headline}>Order Build</Text>
                        <View></View>
                    </View>
                </LinearGradient>
                <View style={style.flatListContainer}> 
                    <FlatList
                     ListHeaderComponent={topScreen}
                     style={{ flexGrow: 1 }}
                     keyExtractor={(_, index) => index.toString()}
                     data={productCategory}
                     ListFooterComponent={<View style={{height: 20}}/>}
                     renderItem={({item}) => {
                        return(
                            <ProductByCategory tableMinPrice={order.tableMinPrice} productCategory={item} product={products} navigation={props.navigation} />
                        );
                    }}
                    />
                </View> 
                <View style={{width, alignItems: 'center', alignSelf: 'center', marginBottom: '10%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button smallButton={false} color1='#09203F' color2='#428399' title='continue' onPress={() => checkOrder()} />
                    <Button smallButton={true} color1={ order.tableMinPrice > menuState.totalPrice ? '#bfbfbf' : '#09203F' } color2={ order.tableMinPrice > menuState.totalPrice ? '#333333' : '#428399' } title={String(menuState.totalPrice + ' ₪')} onPress={() => {}} />
                </View>
            </ImageBackground>
            <PopUp price={order.tableMinPrice} button={true} visible={popUpConfirm} onPress={() => setPopUpConfirm(false)} age={Number(order.theClub.age)} content={content} onPressOk={() => confirmOrder()} />
            <PopUp visible={popUp} onPress={() => setPopUp(false)} age={Number(order.theClub.age)} price={order.tableMinPrice} content={content} onPressOk={() => {}} />
        </KeyboardAvoidingView>
    );
}

export default PickFromMenu;

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
    },
    flatListContainer: {  // the flat list wrapper
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});