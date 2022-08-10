import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  ClubsScroll  from './clubsScroll';


interface Props {
    navigation: any;
    clubLocation: string;
    clubList: {
        name: string,
        url: string,
        city: string,
        about: string,
        age: string,
        openingTime: string,
        musicType: string,
        mapCoordinates: {
            latitude: number,
            longitude: number
        }
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