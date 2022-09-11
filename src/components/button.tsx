import React, { FC } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import {LinearGradient} from 'expo-linear-gradient';

// Button
const {height, width} = Dimensions.get('screen');

interface Props {
    title: string;
    color1: string;
    color2: string;
    smallButton: boolean;
    onPress: () => void;
}

// used smallSize to indicate if the button i need is small or big
const Button : FC<Props> = (props) => {
    return(
        <LinearGradient colors={[props.color1, props.color2]} style={props.smallButton === false ?  style.bigButtonContainer : style.smallButtonContainer} >
            <TouchableOpacity onPress={props.onPress} style={props.smallButton === false ?  style.bigButtonContainer : style.smallButtonContainer}>
                <Text style={props.smallButton === false ? style.bigButtonText : style.smallButtonText}>{props.title}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: height / 16,
        borderRadius: 10,
        width: width / 3.5,
        marginTop: '2%'
    },
    smallButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700'
    }
})