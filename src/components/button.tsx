import React, { FC } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

// Login and signup buttons 
const {height, width} = Dimensions.get('screen');

interface Props {
    title: string;
    onPress: () => void;
}

const Button : FC<Props> = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={style.buttonContainer}>
            <Text style={style.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default Button;

const style = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#4a1b83',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        height: height / 16,
        borderRadius: 10,
        width: width / 1.23,
        paddingBottom: 15,
        marginTop: 10

    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700'
    }
})