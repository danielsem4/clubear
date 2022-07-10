import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, Animated, Alert } from 'react-native';
import { Input, Button, SocialButton, SidebarButton } from '../components';



const {height, width} = Dimensions.get('screen');

const Sidebar : FC = () => {
    return(
        <Animated.View style={style.mainContainer}>
            <ImageBackground source={require('../assets/home_screen_top.jpg')} style={style.backGroundContainer}>
                <View>

                </View>
                <View style={style.navigationButtonWrapper}>
                    <SidebarButton 
                    iconName='home'
                    iconColor='#fff'
                    buttonColor='#b3b3ff'
                    title='Home'
                    onPress={() => Alert.alert('Home')}
                    />
                    <SidebarButton 
                    iconName='info-outline'
                    iconColor='#fff'
                    buttonColor='#b3b3ff'
                    title='About'
                    onPress={() => Alert.alert('About')}
                    />
                    <SidebarButton 
                    iconName='settings'
                    iconColor='#fff'
                    buttonColor='#b3b3ff'
                    title='Settings'
                    onPress={() => Alert.alert('settings')}
                    />
                </View>
                <View style={style.logOutWrapper}>
                    <SidebarButton 
                        iconName='logout'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='Logout'
                        onPress={() => Alert.alert('logout')}
                        />
                </View>
            </ImageBackground>
        </Animated.View>
    )
}

export default Sidebar;

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'red',
        width: '100%',
        height: '100%',
    },
    backGroundContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height / 0.98,
    },
    navigationButtonWrapper: {
        position: 'relative',
        bottom: '12%',


    },
    logOutWrapper: {
        position: 'relative',
        top: '20%',
    }
})