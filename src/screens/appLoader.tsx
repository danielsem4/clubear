import React, { FC } from "react";
import { StyleSheet, ImageBackground, Dimensions, Text } from 'react-native'
import LottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('screen');

const AppLoader: FC = () => {
    
    const speed = 1
    return(
        <ImageBackground style={style.container} source={require('../assets/HomeBackground.png')}>
            <LottieView source={require('../assets/bearDance.json')} speed={speed} autoPlay loop />
            <Text style={style.textStyle}> Loading </Text>
        </ImageBackground>
    )
}

export default AppLoader;

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: height
    },
    textStyle: {
        fontSize: 40,
        color: 'white',
        marginTop: '90%'
    }
})