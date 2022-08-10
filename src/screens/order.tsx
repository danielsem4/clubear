import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Image, KeyboardAvoidingView, } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import CardBrand from 'react-native-vector-icons/Fontisto';
import Chip from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import { Input, Button } from "../components";
import { ScrollView, TextInput } from "react-native-gesture-handler";




const {height, width} = Dimensions.get('screen');

const Order : FC = () => {
    
    const [creditCardInput, setCreditCardInput] = useState(false);
    const [cardNumber, setCardNumber] = useState("4580 0000 0000 0000");
    const [cardHloderName, setCardHloderName] = useState("Israel Israeli");
    const [cardHloderId, setCardHloderId] = useState("123456789");
    const [cvv, setCvv] = useState("123");
    const [expiration, setExpiration] = useState("12/22");


    const [maleAmount, setMaleAmount] = useState(0);
    const [femaleAmount, setFemaleAmount] = useState(0);
    const [orderStage, setOrderStage] = useState(0);

    const describe = [
     "You will neet to enter the number of people coming to the club",
     "Enter your Id and the drink amount the addition on us (;"
    ]

    const next = () => {
        if (orderStage < 1)
            setOrderStage(orderStage + 1);
    }

    const addMale = () => {
        setMaleAmount(maleAmount + 1);
    }

    const addFemale = () => {
        setFemaleAmount(femaleAmount + 1);
    }

    const reduceMale = () => {
        if (maleAmount > 0)
            setMaleAmount(maleAmount - 1);
    }

    const reduceFemale = () => {
        if (femaleAmount > 0)
            setFemaleAmount(femaleAmount - 1);
    }

    const selectCardBrend = () => { ///
        if (cardNumber[0] === '4') {
            return <CardBrand name='visa' size={36} color='white' />
        } else if (cardNumber[0] === '5') {
            return <CardBrand name='mastercard' size={36} color='#ff5c33' />
        } else if (cardNumber[0] === '3') {
            return <CardBrand name='american-express' size={36} color='white' />
        } else if (cardNumber[0] === '6') {
            return <CardBrand name='discover' size={36} color='white' />
        } else {
            return <View />
        }

    }

    const peoplEamount = (sex: string) => {
        return(
            <View>
                <View style={style.peopleAmountBox}>
                    <TouchableOpacity onPress={sex === 'male' ? addMale : addFemale}>
                        <Amount name="plus" size={40} style={style.addMinusIconContainer} />
                    </TouchableOpacity>
                    <Text style={style.peopleAmount}> {sex === 'male' ? maleAmount : femaleAmount}</Text>
                    <TouchableOpacity onPress={sex === 'male' ? reduceMale : reduceFemale}>
                        <Amount name="minus" size={40} style={style.addMinusIconContainer} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const navigation = useNavigation();

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={40} style={style.backIcon} onPress={() => orderStage > 0 ? setOrderStage(orderStage - 1) : navigation.goBack()}/>
                        <TouchableOpacity onPress={() => (maleAmount + femaleAmount >= 6 && maleAmount <= femaleAmount) ? next() :  Alert.alert("You need at list 6 persons and the male amount cant be higer the female amount")}>
                            <Text style={{color: 'white', fontSize: 26, marginTop: '28%', marginRight: '2%'}}> Next </Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <View style={style.describe}>
                    <Text style={style.describeText}>{describe[orderStage]}</Text>
                </View>
                
                {orderStage === 0 ?
                <View style={style.peopleAmountContainer}>
                    <View>
                        <Text style={style.peopleSex}> Total Males </Text>
                        {peoplEamount("male")}
                    </View>
                    <View>
                        <Text style={style.peopleSex}> Total Females </Text>
                        {peoplEamount("female")}
                    </View>
                </View>
                :
                <View style={{flex: 1, justifyContent: 'center', }}>
                    <View style={{alignItems: 'center'}}>
                        
                    </View>
                    <View style={style.paymentMethodWrapper}>
                        <View style={style.creditCardWrapper}>
                            <View style={{marginTop: '5%'}}> 
                                <Chip name='integrated-circuit-chip' size={30} color='#ffd700' />
                                <Text style={style.cardNumber}>{cardNumber}</Text>
                            </View>
                            <Text style={style.cardExpiration}>{expiration}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={style.cardHolderName}>{cardHloderName}</Text>
                                {selectCardBrend()}
                            </View>
                        </View>
                        <View>
                            <Input shortInput={false} blurOnSubmit={false} placeholder='Card Holder Name' iconName='user' onChangeText={() => console.log(1)} />
                            <Input shortInput={false} blurOnSubmit={false} placeholder='Card Number' iconName='creditcard' onChangeText={() => console.log(1)} />
                            <Input shortInput={false} blurOnSubmit={false} placeholder='Your ID' iconName='idcard' onChangeText={() => console.log(1)} />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Input shortInput={true} blurOnSubmit={false} placeholder='expire Date' iconName='calendar' onChangeText={() => console.log(1)} />
                                <Input shortInput={true} blurOnSubmit={false} placeholder='cvv' iconName='lock' onChangeText={() => console.log(1)} />
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button color="#00004d" title="Check Out" onPress={() => {}} />
                            </View>
                            
                        </View>
                    </View>
                </View>
            }
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
        marginTop: '10%',
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
        justifyContent: 'space-evenly',
        height: '30%',
        marginTop: '20%'
    },
    peopleAmountBox: { // people amount button wrapper
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'white',
        alignItems: 'center',
        marginLeft: '30%',
    },
    addMinusIconContainer: { // add button style
        color: 'white',
    },
    peopleAmount:{ // people amount number style
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
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
        width: '90%',
        borderRadius: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        elevation: 15,
        backgroundColor: '#00004d',
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
