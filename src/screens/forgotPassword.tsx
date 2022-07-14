import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import { SidebarButton, ImageButton } from '../components';
import clubsList from '../Data/clubs';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';


const {height, width} = Dimensions.get('screen');

const ForgotPassword : FC = () => {
    return(
        <View style={style.flatListContainer}>
            <FlatList
            style={style.flatList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            data={clubsList}
            renderItem={({item}) => {
                return(
                <View style={style.flatListImageContainer}>
                    <TouchableOpacity onPress={item.onPrees} style={style.flatListBottunContainer}>
                        <Text style={style.flatListClubNameStyle}>{item.name}</Text>
                        <Image style={style.flatListImageStyle} source={{uri: item.url}} />
                    </TouchableOpacity>
                </ View>
                )
            }}
            />
        </View>
    );
}

export default ForgotPassword;

const style = StyleSheet.create({
    flatListContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: { flexGrow: 0 },
    flatListImageContainer: {
        width,
        height: height / 3.5,
    },
    flatListBottunContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    flatListClubNameStyle: {
        fontSize: 20
    },
    flatListImageStyle: { // the image style
        width: '90%',
        height: '89%',
        borderRadius: 20,
        resizeMode: 'cover'
    },
})
