import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Keyboard, KeyboardAvoidingView, } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import CardBrand from 'react-native-vector-icons/Fontisto';
import Chip from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import { Input, Button } from "../components";
import { ScrollView, TextInput } from "react-native-gesture-handler";




const {height, width} = Dimensions.get('screen');

const Order : FC = () => {
    
    const navigation = useNavigation();

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
     "You need to enter the number of the people who are coming to the club",
     "Enter your Id and the drink amount the addition on us (;"
    ]

    // handle the screen that is shown on every stage in the order
    const next = () => {
        if (orderStage < 1)
            setOrderStage(orderStage + 1);
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

    // display the card brand by the card number
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

    // box where you add and substruct amont of people on stage 0 of the order
    const peoplEamount = (sex: string) => {
        return(
                <View >
                    <View style={style.peopleAmountCard}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
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

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <View style={style.headerContainer}>
                        <BackIcon name="arrow-back" size={40} style={style.backIcon} onPress={() => orderStage > 0 ? setOrderStage(orderStage - 1) : navigation.goBack()}/>
                    </View>
                </LinearGradient>
                <View style={style.describe}>
                    <Text style={style.describeText}>{describe[orderStage]}</Text>
                </View>
                {orderStage === 0 ?
                <View style={style.peopleAmountContainer}>
                    <View>
                        {peoplEamount("male")}
                    </View>
                    <View>
                        {peoplEamount("female")}
                    </View>
                    <TouchableOpacity style={{alignSelf: 'center'}}
                      onPress={() => (maleAmount + femaleAmount >= 6 && maleAmount <= femaleAmount) ? next()
                      : Alert.alert("You need at list 6 persons and the male amount cant be higer the female amount")}>
                        <Text style={{color: 'white', fontSize: 26}}>submit</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{flex: 1, justifyContent: 'center', }}>
                    <View style={{alignItems: 'center'}}>
                        
                    </View>
                    <View style={style.paymentMethodWrapper}>
                        <TouchableOpacity style={{width: '93%', alignItems: 'center'}} onPress={Keyboard.dismiss}>
                            <View style={style.creditCardWrapper}>
                                <View style={{marginTop: '5%', marginRight: '5%'}}> 
                                    <Chip name='integrated-circuit-chip' size={30} color='#ffd700' />
                                    <Text style={style.cardNumber}>{cardNumber}</Text>
                                </View>
                                <Text style={style.cardExpiration}>{expiration}</Text>
                                <View style={{flexDirection: 'row', marginLeft: '2%'}}>
                                    <Text style={style.cardHolderName}>{cardHloderName}</Text>
                                    {selectCardBrend()}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{marginTop: '10%'}}>
                            <Input shortInput={false} blurOnSubmit={false} placeholder='Card Holder Name' iconName='user' onChangeText={(text) => setCardHloderName(text)} />
                            <Input shortInput={false} blurOnSubmit={false} placeholder='Card Number' iconName='creditcard' onChangeText={(text) => setCardNumber(text)} />
                            <Input shortInput={false} blurOnSubmit={false} placeholder='Your ID' iconName='idcard' onChangeText={(text) => setCardHloderId(text)} />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Input shortInput={true} blurOnSubmit={false} placeholder=' MM/YY' iconName='calendar' onChangeText={(text) => setExpiration(text)} />
                                <Input shortInput={true} blurOnSubmit={false} placeholder='cvv' iconName='lock' onChangeText={(text) => setCvv(text)} />
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
        backgroundColor: 'red'
    },
    peopleAmountCard: { // people amount button wrapper
        width: '85%',
        height: '55%',
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
