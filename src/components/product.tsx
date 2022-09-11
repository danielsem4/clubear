import React, { FC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import Amount from 'react-native-vector-icons/Feather';


const {height, width} = Dimensions.get('screen');

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


const Product : FC<ProductProps> = (props) => {

    useEffect(() => {
        console.log("useeffect productb");
        
    })

    const minus = (price: number) => {
        if (amountOfProducts > 0) {
            setAmountOfProducts(amountOfProducts - 1);
            setOrderPrice(orderPrice - price);
            console.log(orderPrice);
        }  
    }

    const add = (price: number, id: string) => {
        setAmountOfProducts(amountOfProducts + 1);
        setOrderPrice(orderPrice + price);
        console.log(orderPrice);
        console.log(id);
    }

    const [amountOfProducts, setAmountOfProducts] = useState<number>(0);
    const [orderPrice, setOrderPrice] = useState<number>(0);

    return (
        <View>
            <Text style={style.flatListClubCity}>{props.productCategory}</Text>
            <FlatList
            style={{ flexGrow: 1 }}
            keyExtractor={(_, index) => index.toString()}
            data={props.product}
            ListFooterComponent={<View style={{height: 20}}/>}
            renderItem={({item}) => {
                return(
                    <ImageBackground imageStyle={{ borderRadius: 22, width: '90%', marginLeft: '5%' }} source={require('../assets/card33.png')} style={{width, height: height / 5.8, alignItems: 'center', justifyContent: 'center', marginBottom: '5%'}}>
                        <View style={style.menuCardStyle}>
                            <View style={{flex: 1, height: '100%',marginLeft: '2%', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <Text style={{color: '#e6e6e6', fontSize: 24, fontWeight: 'bold'}}>{item.name}</Text>
                                <Text style={{color: '#e6e6e6', fontSize: 18}}>{item.describe}</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '40%', marginBottom: '5%'}}>
                                    <Text style={{color: '#e6e6e6', fontSize: 22, fontWeight: 'bold', marginRight: '15%'}}>{item.price} ₪</Text>
                                    <TouchableOpacity onPress={() => minus(item.price)}>
                                        <Amount name="minus" size={26}  style={{color: 'silver', marginTop: '5%', marginRight: '10%'}} />
                                    </TouchableOpacity>
                                    <Text style={{color: '#e6e6e6', fontSize: 24, fontWeight: 'bold'}}>{amountOfProducts}</Text>
                                    <TouchableOpacity onPress={() => add(item.price, item.name)}>
                                        <Amount name="plus" size={26} style={{color: 'silver', marginTop: '5%', marginLeft: '10%'}} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Image source={{uri: item.productPictureUrl}} style={{aspectRatio: 2 / 2, width: '30%'}} />
                        </View>
                    </ImageBackground>
                 )
             }}
            />
        </View>
    ); 
}

export default Product;

const style = StyleSheet.create({
    flatListClubCity: {
        fontSize: 24,
        color: 'lightblue',
        marginRight: '73%',
        marginTop: '5%',
        marginLeft: '5%',
    },
    menuCardStyle: {
        height: '100%',
        width: '90%',
        borderRadius: 14,
        alignItems: 'center',
        marginTop: '3%',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        elevation: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    }
});
