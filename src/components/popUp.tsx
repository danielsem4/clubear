import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, Image, Modal } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Button from "./button";
import LottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('screen');

interface Props {
    age: number;
    visible: boolean;
    content: number;
    button?: boolean;
    onPress: () => void;
    onPressOk: () => void;
    price?: number;
}

const PopUp : FC<Props> = (props) => {

    const popUpContent = ['VIP tables require a minimum of five guests to order',
     'Your Facebook account must be entered first',
     'Your Phone number must be entered first',
     'Your Phone number is invalid',
     `The clubs age limit is ${props.age} and over `,
     'If you are from the future, please give me the lottery numbers \n Invalid date',
     `For the order to continue, it needs to be at least ${props.price}₪`,
     `Press the Ok button to confirm the order, if you wish to change the order, press cancle`
    ]; // all the pop up content

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
        Alert.alert("Modal has been closed");
        }}
        >
        <View style={props.button ? style.popUpCardWithButtonsStyle : style.popUpCardStyle}>
        <ImageBackground source={require('../assets/popupBackground3.png')} style={ props.button ? { width: '100%', height: '110%' } : {width: '100%', height: '100%'}} imageStyle={{borderRadius: 18}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <BackIcon name="close" size={40} style={style.closeIcon} onPress={() => props.onPress()}/>
                {props.button ? 
                <Image source={require('../assets/sideBarBear.png')} style={style.popUpImageStyle} />
                :
                <View style={{width: '40%', height: 150, alignItems: 'center', justifyContent: 'center', marginTop: '3%'}}>
                    <LottieView source={require('../assets/error.json')} speed={0.8} autoPlay loop />
                    
                </View>
                }
                <View style={{marginRight: '10%'}} />
            </View>
            <Text style={{color: '#fff', fontSize: 24, alignSelf: 'center', width: '90%', textAlign: 'center'}}>{popUpContent[props.content]}</Text>
            {props.button ? 
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}> 
                    <Button title="Ok" color1='#0181fc' color2='#c000ae' smallButton={true} onPress={() => props.onPressOk()} />
                    <Button title="Cancel" color1='#0181fc' color2='#c000ae' smallButton={true} onPress={() => props.onPress()} />
                </View>
                :
                <View>

                </View>
                }
            <View />
        </ImageBackground>
        </View>
        </Modal>
    );
}

export default PopUp;

const style = StyleSheet.create({
    popUpCardStyle: { // the pop up card
        flexDirection: 'column',
        backgroundColor: '#264268',
        justifyContent: 'space-around',
        width: '95%',
        height: 250,
        alignSelf: 'center',
        alignContent: 'center',
        borderRadius: 20,
        marginTop: '50%'
    },
    popUpCardWithButtonsStyle: { // the pop up card
        flexDirection: 'column',
        backgroundColor: '#264268',
        justifyContent: 'space-around',
        width: '95%',
        height: 280,
        alignSelf: 'center',
        alignContent: 'center',
        borderRadius: 20,
        marginTop: '50%'
    },
    popUpImageStyle: { // the image style
        width: 140,
        height: 140,
        alignSelf: 'center',
        marginTop: '3%'
    },
    closeIcon: { // the close icon style
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: '2%',
        
    },
})