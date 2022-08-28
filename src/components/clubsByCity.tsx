import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  ClubsScroll  from './clubsScroll';

interface Props {
    navigation: any;
    clubLocation: string;
    clubList: {
        name: string;
        imageUrl: string;
        mapUrl: string;
        menuUrl: string;
        city: string;
        age: string;
        musicType: string;
        openingTime: string;
        about: string;
        mapCoordinates: {
            latitude: 32.05506,
            longitude: 34.77488
        };
    }[];
}

const ClubsByCity : FC<Props> = (props) => {

    const sortedClubs = props.clubList.filter((club) => club.city === props.clubLocation);
    return(
        <View style={style.clubsContainer}>
            <ClubsScroll clubList={sortedClubs} navigation={props.navigation} clubLocation={props.clubLocation}  />
        </View>
    )
}

export default ClubsByCity;

const style = StyleSheet.create({
    clubsContainer: {
        borderBottomWidth: 0,
        shadowOpacity: 0,
    },
    flatListClubNameStyle: {
        fontSize: 20,
        color: 'lightblue',
        marginLeft: '4%',
        marginTop: '5%'
    },
})