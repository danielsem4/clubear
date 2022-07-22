import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import { SidebarButton, ClubsByCity, Button } from '../components';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import clubsList from '../Data/clubs';
import assets from '../Data/assets.json';


interface ClubsParameters {
    clubId: number;
}

const ClubInfo : FC = () => {

    const route = useRoute();
    const clubs= route.params as ClubsParameters
    const selectedClub = clubsList.find((item) => item.id === clubs.clubId);
    console.log(selectedClub?.city);
    

    return(
        <View style={style.mainContainer}>
            <Image source={{uri: selectedClub?.url}} style={style.photo} />
        </View>
    )
}

export default ClubInfo

const style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    photo: {
        width: '100%',
        height: '50%'
    }

})