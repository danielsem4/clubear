import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import clubsList from '../Data/clubs';
import assets from '../Data/assets.json';

const {height, width} = Dimensions.get('screen');

interface ClubsParameters {
    navigation: any;
    clubId: number;
}

const ClubInfo : FC = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const clubs= route.params as ClubsParameters
    const selectedClub = clubsList.find((item) => item.id === clubs.clubId);
    console.log(selectedClub?.city);
    

    return(
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <View style={style.headerContainer}>
                <BackIcon name="arrow-back" size={40} style={style.backIcon} onPress={() => navigation.goBack()}/>
                    <Text style={style.clubName}>{selectedClub?.name}</Text>
                </View>
                <Image source={{uri: selectedClub?.url}} style={style.photo} />
            </ImageBackground>
        </View>
    )
}

export default ClubInfo

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    photo: { 
        width: '100%',
        height: '40%',
        marginRight: '20%'
    },
    headerContainer: {
        position: 'relative',
        height: '9%',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        position: 'absolute',
        color: 'white',
        top: '40%',
        right: '89%'
    },
    clubName: {
        position: 'absolute',
        fontSize: 32,
        color: 'white',
        top: '40%'
    },
    imageBackgroundContainer: { // background image container for the home screen
        flex: 1,
        width: '100%',
        height: height
    }

})