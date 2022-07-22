import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  { ClubsScroll } from './index';


interface Props {
    navigation: any;
    clubLocation: string;
    clubList: {
        id: number,
        name: string,
        url: string,
        city: string,
    }[];
}


const ClubsByCity : FC<Props> = (props) => {

    const sortedClubs = props.clubList.filter((club) => club.city === props.clubLocation);
    return(
        <View>
            <Text style={style.flatListClubNameStyle}>{props.clubLocation}</Text>
            <ClubsScroll clubList={sortedClubs} navigation={props.navigation} />
        </View>
    )
}


export default ClubsByCity;


const style = StyleSheet.create({
    flatListClubNameStyle: {
        fontSize: 20,
        color: 'white',
        marginTop: '3%'
    },
})