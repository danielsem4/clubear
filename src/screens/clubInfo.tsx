import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import clubsList from '../Data/clubs';
import  MapView, {Callout, Marker } from 'react-native-maps';
import assets from '../Data/assets.json';


const {height, width} = Dimensions.get('screen');

interface ClubsParameters {
    navigation: any;
    clubId: number;
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

const ClubInfo : FC = () => {

    
    const navigation = useNavigation();
    const route = useRoute();
    const clubs= route.params as ClubsParameters
    const selectedClub = clubsList.find((item) => item.id === clubs.clubId);
    const coordinate = selectedClub?.mapCoordinates as Coordinate
    
    // const clubInfoTuple: [string, string | undefined] = {['info-circle', selectedClub?.about], []}

    return(
        <View style={style.mainContainer}>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <View style={style.headerContainer}>
                    <BackIcon name="arrow-back" size={40} style={style.backIcon} onPress={() => navigation.goBack()}/>
                    <Text style={style.clubName}>{selectedClub?.name}</Text>
                </View>
                <Image source={{uri: selectedClub?.url}} style={style.photo} />
                <View style={style.clubInfoWrapper}>
                <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'info-circle'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{selectedClub?.about} </Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'map-pin'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{selectedClub?.city}</Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'clock-o'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{selectedClub?.openingTime}</Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'music'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{selectedClub?.musicType}</Text>
                    </View>
                    <View style={style.clubInfoAndIconWrapper}>
                        <Icons name={'id-card-o'} style={style.iconStyle} />
                        <Text style={style.clubInfoTextContent}>{selectedClub?.age}</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={style.whatsappButtonWrapper}>
                        <Icons name={'whatsapp'} style={style.whatsappIconStyle} onPress={() => Alert.alert('saar the gay ')} />
                        <Text style={style.clubInfoTextContent}>Contact Us</Text>
                    </TouchableOpacity>
                    <MapView
                     style={style.map}
                     initialRegion={
                        {
                        ...coordinate,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002
                    }   
                     }
                     >
                        <Marker
                         coordinate={coordinate}
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
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        
    },
    photo: { 
        height: '25%',
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
    },
    clubInfoWrapper: {
        flex: 1,
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
        width,
        height: height / 5
    }
})