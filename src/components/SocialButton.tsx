import React, { FC } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import SocialBrands from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('screen');

interface Props {
    title: string;
    iconColor: string;
    iconName: string;
    buttonColor: string;
    onPress: () => void;
}

const SocialButton : FC<Props> = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={[style.buttonContainer, {backgroundColor: props.buttonColor}]}>
            <View style={style.iconWrapper}>
                <SocialBrands name={props.iconName} style={style.icon} color={props.iconColor} size={24}/>
            </View>
            <View style={style.buttonWrapper}>
                <Text style={[style.buttonText, {color: props.iconColor}]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default SocialButton;

const style = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        height: height / 16,
        borderRadius: 10,
        width: '90%',
        marginTop: 10,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700'
    },
    iconWrapper: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontWeight: 'bold'
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})