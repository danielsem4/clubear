import React, { FC } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useActions } from "../redux/reducers";

const {height, width} = Dimensions.get('screen');



const Settings : FC = () => {

    const dispatch = useDispatch()

    const screenState = useSelector((state: RootState) => state.user);  

    const logout = () => {
        if (screenState.logedIn) {
            navigation.goBack();
            dispatch(useActions.setLogedIn());
            console.log(screenState.logedIn);
        }
    }

    const changePassword_changeLanguage = (text: string) => {
        if (text === 'Language') {
            dispatch(useActions.setLanguage());
        } else {

        }
    }

    const accountSettings = (text: string) => {
        return(
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}
                onPress={() => text === "Log out" ? logout() : changePassword_changeLanguage(text)}
            >
                <Text style={{color: 'white',fontSize: 20, marginLeft: '2%', marginTop: '2%'}}> {text} </Text>
                <Icons name='angle-right' size={30} style={{color: 'white', marginRight: '3%', alignSelf: 'center'}} />
            </TouchableOpacity>
        )
    }

    const navigation = useNavigation();

    return(
        <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
            <LinearGradient colors={['#021925', '#537895']} style={style.topBarStyle}>
                <View style={style.headerStyle}>
                    <BackIcon name='arrow-back' size={38} style={style.barStyle} onPress={() => navigation.goBack()} />
                    <Text style={{color: 'white', marginTop: '5%', fontSize: 26, marginRight: '7%'}}>Settings</Text>
                    <View />
                </View>
            </LinearGradient>
            <View style={style.accountSettings}>
                <View style={style.textWrapper}>
                    <Text style={{color: 'white',fontSize: 26}}>Account</Text>
                </View>
                <View style={style.accountSettingsWrapper}>
                    {accountSettings("Language")}
                    {accountSettings("Change Password")}
                    {accountSettings("Log out")}
                </View>
            </View>
            <View style={style.accountSettings}>
                <View style={style.textWrapper}>
                    <Text style={{color: 'white',fontSize: 26}}>General</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Settings;

const style = StyleSheet.create({
    imageBackgroundContainer: {
        flex: 1,
        width: '100%',
        height: height
    },
    topBarStyle: {
        borderWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        height: '9%',
        borderRadius: 5,
    },
    headerStyle: { // the main top navbar items
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barStyle: { // the bar icon
        color: 'white',
        marginLeft: '4%',
        marginTop: '5%',
    }, 
    accountSettings: {
        flexDirection: 'column',
        flex: 1
    },
    textWrapper: {
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '95%',
        marginTop: '10%',
        borderColor: 'white',
        borderWidth: 0.6,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    accountSettingsWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '50%',
        marginTop: '5%'
    }
})