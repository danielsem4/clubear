import React, { FC, useState } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import SocialBrands from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('screen');

interface Props {
    title: string;
    iconColor: string;
    iconName: string;
    buttonColor: string;
    onPress: () => void;
}


const SidebarButton : FC<Props> = (props) => {

    const logout = async () => {

    }

    return(
        <TouchableOpacity onPress={props.onPress} style={style.buttonContainer}>
            <View style={style.buttonWrapper}>
                <SocialBrands name={props.iconName} style={style.icon} color={props.iconColor} size={24}/>
                <Text style={[style.buttonText, {color: props.iconColor}]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SidebarButton;

const style = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: height / 18,
        borderRadius: 10,
        width: width / 3.3,
        marginRight: '60%',
        marginBottom: '10%',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        fontWeight: 'bold',
        marginRight: '8%'
    }
})