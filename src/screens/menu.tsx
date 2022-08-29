import React, { FC, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
import { useRoute } from "@react-navigation/native";

const {height, width} = Dimensions.get('screen'); // the screen Dimensions

interface Props {
    navigation: any;
    menuUrl: string;
}


const Menu : FC<Props> = (props) => {

    const route = useRoute();
    const pdf = route.params as Props
    console.log(pdf.menuUrl);
    
    return(
        <View style={styles.container}>
             <LinearGradient colors={['#021925', '#537895']} style={styles.headerWrapper}>
                    <View style={styles.headerContainer}>
                        <View></View>
                        <Text style={{color: 'white', fontSize: 28, marginTop: '6%', marginRight: '8%'}}> Menu </Text>
                        <BackIcon name="arrow-back" size={40} style={styles.backIcon}  onPress={() => props.navigation.goBack()}/>
                    </View>
            </LinearGradient>
            {/* <Pdf source={{uri: pdf.menuUrl}} style={{flex: 1}} /> */}
        </View>
    )

}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    headerWrapper: { // the header style
        borderWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        height: '9%',
        borderRadius: 5
    },
    headerContainer: { // the headder content wrapper
        width: width,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    backIcon: { // the back icon style
        color: 'white',
        alignSelf: 'center',
        marginLeft: '2%',
        marginTop: '4%'
    },
    pdf: {
        flex:1,
        width,
        height
    }
});