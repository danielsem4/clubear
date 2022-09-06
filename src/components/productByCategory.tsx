import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  ClubsScroll  from './clubsScroll';

interface ProductProps {
    navigation: string;
    productCategory: string;
    product: {
        category: string;
        clubID: string;
        name: string;
        price: string;
        productPictureUrl: string;
    }[];
}

const ClubsByCity : FC<ProductProps> = (props) => {

    const sortedClubs = props.product.filter((product) => product.category === props.productCategory);
    return(
        <View style={style.clubsContainer}>
            {/* <  navigation={props.navigation} clubLocation={props.productCategory}  /> */}
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