import React, { FC } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as firebaseFunctions from '../constants/firebaseauth';

const {height, width} = Dimensions.get('screen');

interface Details {
    color: string;
    peopleAmount: number;
    price: number;
    tableType: string;
    onPress: () => void;
    
}

const OrderBox : FC<Details> = (props) => {

    return (
        <View style={style.boxContainer}>
            <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: '5%'}}>
                <Text style={{color: 'white', fontSize: 20, marginBottom: '4%'}}>{props.tableType} table</Text>
                <Text style={{color: 'white', fontSize: 14}}>Maximum  {props.peopleAmount} people</Text>
            </View>
            <Text style={{color: 'white', fontSize: 18, marginLeft: '25%'}}> {props.price}₪</Text>
            <TouchableOpacity style={{backgroundColor: props.color, height: '100%', width: '20%', justifyContent: 'center'}} onPress={props.onPress}>
                <Text style={{color: 'white', fontSize: 20, alignSelf: 'center'}}> Book</Text>
            </TouchableOpacity>
        </View>
    );
}

export default OrderBox;

const style = StyleSheet.create({
    boxContainer: { // the box container
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'white',
        borderWidth: 0.8,
        marginTop: '3%',
        height: '35%'
    },
});