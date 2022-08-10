import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, TouchableOpacity, Image, } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import Drink from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import clubsList from '../Data/clubs_en';
import  MapView, {Callout, Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import firebase from 'firebase/compat/app';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';


const {height, width} = Dimensions.get('screen');

interface ClubsParameters {
    navigation: any;
    theClub: {
        name: string;
        url:string;
        city: string;
        age: string;
        musicType: string;
        openingTime: string;
        about: string;
        mapCoordinates: {
            latitude: number,
            longitude: number
    };
    }
}

interface InfoHeadLine {
    location: 'the club is in ';
    time: 'Openening time ';
    music: 'The music type is ';
    age: 'Age: ';
}

interface Coordinate {
    latitude: number;
    longitude: number;
}


const ClubInfo : FC<ClubsParameters> = (props) => {

    const dispatch = useDispatch()

    const route = useRoute();
    const club= route.params as ClubsParameters

    const screenState = useSelector((state: RootState) => state.user);  

    const navigation = useNavigation();

    

    
    const tableOrder = () => {
        if (screenState.logedIn) {
            props.navigation.navigate('order')
        } else {
            Alert.alert("You need to login to order a table")
        }
    }

    return(
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
            <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                <View style={style.headerContainer}>
                    <BackIcon name="arrow-back" size={40} style={style.backIcon} onPress={() => navigation.goBack()}/>
                    <Text style={style.clubName}>{club.theClub['name']}</Text>
                    <View />
                </View>
            </LinearGradient>
                <Image source={{uri: club.theClub['url']}} style={style.photo} />
                <View style={style.clubInfoWrapper}>
                <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'info-circle'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{club.theClub['about']} </Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'map-pin'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{club.theClub['city']}</Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'clock-o'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{club.theClub['openingTime']}</Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'music'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{club.theClub['musicType']}</Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'id-card-o'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{club.theClub['age']}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={style.contactButtonsContainer}>
                        <TouchableOpacity style={style.whatsappButtonWrapper} onPress={() => Alert.alert('saar the gay ')}>
                            <Icons name={'whatsapp'} style={style.whatsappIconStyle} />
                            <Text style={style.clubInfoTextContent}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.whatsappButtonWrapper} onPress={() => tableOrder()}>
                            <Drink name={'drink'} style={[style.whatsappIconStyle, {color: 'red'}]} />
                            <Text style={style.clubInfoTextContent}>Order now</Text>
                        </TouchableOpacity>
                    </View>
                    <MapView
                     style={style.map}
                     initialRegion={
                        {
                        ...club.theClub['mapCoordinates'],
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                    }   
                     }
                     >
                        <Marker
                         coordinate={club.theClub['mapCoordinates']}
                        pinColor= "red"
                        >
                            <Callout>
                                <Text>I`m here</Text>
                            </Callout>
                        </Marker>
                     </MapView>
                </View>
            </ImageBackground>
        </View>
    )
}


export default ClubInfo


const style = StyleSheet.create({
    mainContainer: { // the page container
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    headerWrapper: {
        borderWidth: 0.4,
        height: '8%',
        borderRadius: 5
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4%',
    },
    backIcon: {
        color: 'white'
    },
    clubName: {
        fontSize: 32,
        color: 'white',
        marginRight: '6%',
        marginTop: '0.5 %'
    },
    photo: { // the club picture
        height: '25%',
    },
    imageBackgroundContainer: { // background image container for the home screen
        flex: 1,
        width: '100%',
        height: height
    },
    clubInfoWrapper: {
        flex: 1,
        width: '90%'
    },
    clubInfoAndIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
        marginLeft: '1%'
    },
    iconStyle: {
        color: 'white',
        fontSize: 20,
        marginRight: '3%',
    },
    clubInfoTextContent: {
        color: 'white',
        fontSize: 20,
    },
    contactButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    whatsappButtonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '1%',
        marginBottom: '2%'
    },
    whatsappIconStyle: {
        color: 'green',
        fontSize: 34,
        marginRight: '3%',
    },
    map: {
        flex: 1,

    }
})