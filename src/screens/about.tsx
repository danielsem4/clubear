import React, { FC } from "react";
import { View, StyleSheet, ImageBackground, Dimensions, Text } from "react-native";
import BackIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import about from '../Data/staticInfo';


const {height, width} = Dimensions.get('screen');

interface Props{
    navigation: any;
}

const About : FC<Props> = (props) => {

    const dispatch = useDispatch()

    const screenState = useSelector((state: RootState) => state.user);  

    return(
        <View style={style.container}>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <ImageBackground style={style.topAboutBear} source={require('../assets/bear_pic.png')} >
                    <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => props.navigation.navigate('home')}/>
                </ImageBackground>
                <View style={style.aboutContainer}>
                    <Text style={screenState.language ? style.aboutStyleEn : style.aboutStyleHb}>{
                    screenState.language ? about.en['about']
                    :
                    about.hb['about']
                }</Text>
                </View>
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
        maxHeight: '35%',
        height: '100%',
    },
    backIcon: {
        marginTop: '5%',
        marginLeft: '2%',
        color: '#fff',
    },
    aboutContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    aboutStyleEn: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        width: '90%'
    },
    aboutStyleHb: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        width: '90%'
    }
})