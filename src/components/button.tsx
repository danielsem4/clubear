import React, { FC } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

// Button
const {height, width} = Dimensions.get('screen');

interface Props {
    title: string;
    color1: string;
    color2: string;
    onPress: () => void;
}

// used smallSize to indicate if the button i need is small or big
const Button : FC<Props> = (props) => {
    return(
        <LinearGradient colors={[props.color1, props.color2]} style={style.bigButtonContainer} >
            <TouchableOpacity onPress={props.onPress} style={style.bigButtonContainer}>
                <Text style={style.bigButtonText}>{props.title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default Button;

const style = StyleSheet.create({
    bigButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 16,
        borderRadius: 10,
        width: width / 1.5,
        marginTop: '2%'

    },
    bigButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700'
    },
    smallButtonContainer: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: height / 20,
        borderRadius: 10,
        width: width / 3,
        marginTop: 1

    },
    smallButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700'
    }
})