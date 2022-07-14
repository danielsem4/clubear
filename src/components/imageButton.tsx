import React, { FC, useEffect, useState } from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const {height, width} = Dimensions.get('screen');

interface Props {
    title: string;
    imageName: string;
    onPress: () => void;
}

const ImageButton : FC<Props> = (props) => {

    const url = ''

    return(
        <TouchableOpacity onPress={props.onPress} style={style.buttonContainer}>
            <View style={style.buttonWrapper}>
                <Image source={{uri: url}} style={style.imageStyle} />
                {/* <Text style={style.buttonText}></Text> */}
            </View>
        </TouchableOpacity>
    )
}

export default ImageButton;

const style = StyleSheet.create({
    buttonContainer: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
        marginBottom: '15%',
        
    },
    // buttonText: {
    //     position: 'absolute',
    //     fontSize: 22,
    //     fontWeight: 'bold',
    //     color: 'white',
    // },
    buttonWrapper: {
        // position: 'relative',
        width: '50%',
        height: '30%',
        alignItems: 'center',

    },
    imageStyle: {
        width: '100%',
        height: '100%',
    }
})

