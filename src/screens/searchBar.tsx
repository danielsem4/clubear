import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import { Input, Button, SocialButton } from '../components';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

const SearchBar : FC = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState(false); // the state that 

    return(
        <View>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => navigation.goBack()}/>
                <View style={style.searchInputContainer} >
                    <Input placeholder='Search' iconName='search1' onChangeText={() => Alert.alert("") } />
                </View>
            </ImageBackground>
        </View>
    )
}

export default SearchBar;

const style = StyleSheet.create({
    imageBackgroundContainer: { // background image container for the home screen
        position: 'relative',
        flex: 1,
        width: '100%',
        height: height / 0.99
    },
    backIcon: {
        position: 'absolute',
        color: '#fff',
        marginTop: '13%',
    },
    searchInputContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: '12%',
        marginTop: '11%',
        marginRight: '25%'
    },
    buttonContainer: {
        left: '10%',
        marginTop: '25%',
    },
    switchStyle: {
        color: '#fff',
        
        backgroundColor: 'red'
    },
    switchText: {
        position: 'absolute',
        color: '#fff',
        left: '77%',
        top: '73%',
    },
})