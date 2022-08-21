import React, { FC } from "react";
import { Dimensions,Text ,View, StyleSheet, TouchableOpacity } from "react-native";
import SocialBrands from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('screen');

interface Props {
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
        </TouchableOpacity>
    )
}

export default SocialButton;

const style = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 17.5,
        borderRadius: 14,
        width: '12%',
        marginRight: '6%',
        marginLeft: '6%'
    },
    iconWrapper: {
        width: 20,
    },
    icon: {
        fontWeight: 'bold'
    },
})