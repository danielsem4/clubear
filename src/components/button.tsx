import React, { FC } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

// Button
const {height, width} = Dimensions.get('screen');

interface Props {
    smallSize?: boolean;
    title: string;
    onPress: () => void;
}

// used smallSize to indicate if the button i need is small or big
const Button : FC<Props> = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={props.smallSize ? style.smallButtonContainer : style.bigButtonContainer}>
            <Text style={props.smallSize ? style.smallButtonText : style.bigButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const style = StyleSheet.create({
    bigButtonContainer: {
        backgroundColor: '#4a1b83',
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