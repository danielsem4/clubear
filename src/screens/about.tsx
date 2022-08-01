import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { View, StyleSheet, ImageBackground, Dimensions, Text } from "react-native";
import BackIcon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('screen');

interface Props{
    navigation: any;
}

const About : FC<Props> = (props) => {

    const navigation = useNavigation();

    return(
        <View style={style.container}>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <ImageBackground style={style.topAboutBear} source={require('../assets/bear_pic.png')} >
                    <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => props.navigation.navigate('home')}/>
                </ImageBackground>
            </ImageBackground>
        </View>
    );
}

export default About;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackgroundContainer: { // background image container for the home screen
        flex: 1,
        width: '100%',
        height: height
    },
    topAboutBear: {
        width: '100%',
        height: '65%'
    },
    backIcon: {
        marginTop: '5%',
        marginLeft: '2%',
        color: '#fff',
    }
})