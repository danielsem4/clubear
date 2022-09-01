import React, { FC, FunctionComponent, useRef, useState } from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, Animated } from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('screen');

interface Props {
    clubLocation: string;
    navigation: any;
    clubList: {
        name: string;
        url: string;
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

interface DotValues {
    scale: number | Animated.Value | Animated.AnimatedInterpolation;
    color: any;
}
 
const ClubsScroll : FC<Props> = (props) => {

    const animatedValue = useRef( new Animated.Value(0)).current;
    
    
    return(
        <View>
            <Text style={style.flatListClubCity}>{props.clubLocation}</Text>
            <Animated.FlatList
                style={style.flatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                data={props.clubList}
                decelerationRate={'fast'}
                snapToInterval={width}
                bounces={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: animatedValue}}}],
                    {useNativeDriver: false}
                    )}
                renderItem={({item}) => {
                    return(
                        <View style={style.flatListImageContainer}>
                            <TouchableOpacity style={style.flatListBottunContainer} onPress={() => props.navigation.navigate('clubInfo', {theClub: item})}>
                                <Image style={style.flatListImageStyle} source={{uri: item.url}} />
                                <Text style={[style.flatListClubNameStyle, {marginLeft: '2.5%'}]}>{item.name}</Text>
                                <Text style={[style.flatListClubNameStyle, {fontSize: 14}]}> <Icons name={'map-marker'} style={style.iconStyle} /> {item.city}</Text>
                            </TouchableOpacity>
                        </ View>
                    )
                }}
            />
            <Animated.FlatList
                style={style.flatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                data={props.clubList}
                decelerationRate={'fast'}
                snapToInterval={width}
                bounces={false}
                pagingEnabled
                renderItem={({index}) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,   
                        ];
                    const colorOutputRange = ['white', '#ccccff', 'white']
                    const scaleOutputRange = [0.5, 0.9, 0.5];
                    const dotScale = animatedValue.interpolate({
                        inputRange,
                        outputRange: scaleOutputRange,
                        extrapolate: 'clamp'
                    });
                    const colorScale = animatedValue.interpolate({
                        inputRange,
                        outputRange: colorOutputRange,
                        extrapolate: 'clamp'
                    })
                    return(
                        <View style={style.dotContainer}>
                            <PagingDot scale={dotScale} color={colorScale} />
                        </View>
                    );
                }}
            />
        </View>
    )
}

const PagingDot : FC<DotValues> = ({scale, color}) => {
    return <Animated.View style={[style.pagingDot, {backgroundColor: color ,transform: [{scale}]}]}></Animated.View>
}


export default ClubsScroll;

const style = StyleSheet.create({
    flatListContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
   
    },
    flatList: { flexGrow: 0, alignSelf: 'center' },
    flatListImageContainer: {
        width,
        height: height / 3.5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    flatListClubCity: {
        fontSize: 20,
        color: 'lightblue',
        marginRight: '73%',
        marginTop: '5%',
        marginLeft: '5%',
    },
    flatListBottunContainer: {
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
        backgroundColor: '#262626'
    },
    flatListClubNameStyle: {
        display: 'flex',
        flex: 1,
        fontSize: 18,
        color: 'white',
        marginLeft: '2%',
        marginTop: '1%',
        alignSelf: 'flex-start',
        
    },
    iconStyle: {
        color: 'red',
        fontSize: 14,
    },
    flatListImageStyle: { // the image style
        width: '100%',
        height: '75%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    dotContainer: {
        width: 30,
        padding: 10
    },
    pagingDot: {
        width: 14,
        height: 14,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'black',
    }
})

