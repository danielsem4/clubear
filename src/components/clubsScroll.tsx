import React, { FC } from "react";
import { Text ,View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from "react-native";

const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
    clubList: {
        id: number,
        name: string,
        url: string,
        city: string,
    }[];
}
 
const ClubsScroll : FC<Props> = (props) => {
    return(
        <View>
            <View style={style.flatListContainer}>
                <FlatList
                    style={style.flatList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    data={props.clubList}
                    decelerationRate={'fast'}
                    snapToInterval={width}
                    renderItem={({item}) => {
                        return(
                            <View style={style.flatListImageContainer}>
                                <TouchableOpacity style={style.flatListBottunContainer} onPress={() => props.navigation.navigate('clubInfo', {clubId: item.id})}>
                                    <Text style={style.flatListClubNameStyle}>{item.name}</Text>
                                    <Image style={style.flatListImageStyle} source={{uri: item.url}} />
                                </TouchableOpacity>
                            </ View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default ClubsScroll;

const style = StyleSheet.create({
    flatListContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderTopColor: 'white',
        borderBottomWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
    },
    flatList: { flexGrow: 0, },
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
        fontSize: 20,
        color: 'white',
        marginTop: '3%'
        
    },
    flatListImageStyle: { // the image style
        width: '90%',
        height: '80%',
        borderRadius: 10,
        resizeMode: 'cover'
    },
})

