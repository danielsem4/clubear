import React, { FC, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  Product  from './product';

interface ProductProps {
    navigation: string;
    productCategory: string;
    tableMinPrice: number;
    product: {
        category: string;
        clubID: string;
        name: string;
        price: number;
        productPictureUrl: string;
        describe: string;
    }[];
}

const ProductByCategory : FC<ProductProps> = (props) => {

    useEffect(() => {
        console.log("useeffect productbycategory");
        
    });

    const sortedProducts = props.product.filter((product) => product.category === props.productCategory);
    
    return(
        <View style={style.clubsContainer}>
            <Product tableMinPrice={props.tableMinPrice} navigation={props.navigation} productCategory={props.productCategory} product={sortedProducts} />
        </View>
    )
}

export default ProductByCategory;

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