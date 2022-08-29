import React, { FC } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as firebaseFunctions from '../constants/firebaseauth';

const {height, width} = Dimensions.get('screen');

const OrderBox : FC = () => {

    return (
        <View style={style.boxContainer}>
            <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: '5%'}}>
                <Text style={{color: 'white', fontSize: 20, marginBottom: '4%'}}>table table</Text>
                <Text style={{color: 'white', fontSize: 14}}>Maximum  peopleAmount people</Text>
            </View>
            <Text style={{color: 'white', fontSize: 18, marginLeft: '20%'}}> price₪</Text>
            <TouchableOpacity style={{backgroundColor: "", height: '100%', width: '25%', justifyContent: 'center'}} onPress={() => {}}>
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
        height: '9%'
    },

});