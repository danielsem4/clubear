import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Image, } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Amount from 'react-native-vector-icons/Feather';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';


const {height, width} = Dimensions.get('screen');

const Order : FC = () => {
    
    const [maleAmount, setMaleAmount] = useState(0);
    const [femaleAmount, setFemaleAmount] = useState(0);

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
        <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
            <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                <View style={style.headerContainer}>
                    <BackIcon name="arrow-back" size={40} style={style.backIcon} onPress={() => navigation.goBack()}/>
                    <TouchableOpacity onPress={() => (maleAmount + femaleAmount >= 6 && maleAmount <= femaleAmount) ? Alert.alert("good") :  Alert.alert("You need at list 6 persons and the male amount cant be higer the female amount")}>
                        <Text style={{color: 'white', fontSize: 26, marginTop: '28%', marginRight: '2%'}}> Next </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={style.describe}>
                <Text style={style.describeText}>You will neet to enter the number of people coming to the club</Text>
            </View>
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
        </ImageBackground>
    )
}

export default Order;

const style = StyleSheet.create({
    imageBackgroundContainer: { // background image container for the home screen
        flex: 1,
        width: '100%',
        height: height
    },
    headerWrapper: {
        borderWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        height: '8%',
        borderRadius: 5
    },
    headerContainer: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backIcon: {
        color: 'white',
        alignSelf: 'center',
        marginLeft: '2%',
        marginTop: '4%'
    },
    describe: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        alignSelf: 'center'
    },
    describeText: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
        textAlign: 'center'
    },
    peopleAmountContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '30%',
        marginTop: '20%'
    },
    peopleAmountBox: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'white',
        alignItems: 'center',
        marginLeft: '30%',
    },
    addMinusIconContainer: {
        color: 'white',
    },
    peopleAmount:{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    peopleSex: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18
    }
})
