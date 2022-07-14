import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import { SidebarButton, ImageButton } from '../components';
import clubsList from '../Data/clubs';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { ScrollView } from 'react-native-gesture-handler';


const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
    title: string;
    imageName: string;
    onPress: () => void;
}

const Home : FC<Props> = (props) => {

    const [showMenu, setShowMenu] = useState(false); // the slideMenu useState

    const offsetValue = useRef(new Animated.Value(0)).current; // side bar animation
    const scaleValue = useRef(new Animated.Value(1)).current; // side bar animation
    const closeButtonOffset = useRef(new Animated.Value(0)).current; // side bar animation

    

    return(
        <View style={style.container}>
            <View style={style.sidebarContainer}>
                <ImageBackground source={require('../assets/sidebar_pic3.jpg')} style={style.sidebarBackGroundContainer}>
                    <View style={style.loginButtonWrapper}> 
                    <SidebarButton 
                        iconName='login'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='login'
                        onPress={() => props.navigation.navigate('login')}
                        />
                    </View>
                    <View style={style.navigationButtonWrapper}>
                        <SidebarButton 
                        iconName='home'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='Home'
                        onPress={() => props.navigation.navigate('home')}
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
                    <View style={style.logOutButtnonWrapper}>
                        <SidebarButton 
                            iconName='logout'
                            iconColor='#fff'
                            buttonColor='#b3b3ff'
                            title='Logout'
                            onPress={() => Alert.alert('logout')}
                            />
                    </View>
                </ImageBackground>
            </View>
            <Animated.View style={[style.homeContainer, {transform: [
                { scale: scaleValue }, { translateX: offsetValue }
            ]}
            ]}>
                <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                    <View style={style.navbarContainer}>
                        <Icons name= { showMenu ? 'close' : 'bars' } size={30} style={style.barsStyle} onPress={() => {
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 0.87,
                                duration: 300,
                                useNativeDriver: true
                            })
                            .start()
                            Animated.timing(offsetValue, {
                                toValue: showMenu ? 0 : 220,
                                duration: 300,
                                useNativeDriver: true
                            })
                            .start()
                            Animated.timing(closeButtonOffset, {
                                toValue: showMenu ? -30 : 0,
                                duration: 300,
                                useNativeDriver: true
                            })
                            .start()
                            setShowMenu(!showMenu);
                        }} 
                        />
                        <TouchableOpacity style={style.logoButton} onPress={() => {}}>
                            <Text style={style.logoTextStyle}> Clubear </Text>
                        </TouchableOpacity>
                        <Icons name='search' size={30} style={style.searchStyle} onPress={() => Alert.alert('search')} />
                    </View>
                    <ScrollView style={{height: '100%', width: '100%', }}>
                    {/* <Image source={require('../assets/home_screen_top.jpg')} style={{height: '100%', width: '100%'}} /> */}
                    <Text style={style.flatListClubNameStyle}>Tel-Aviv</Text>
                    <View style={style.flatListContainer}>
                        <FlatList
                        style={style.flatList}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        data={clubsList}
                        decelerationRate={'fast'}
                        snapToInterval={width}
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
                    </ScrollView>
                </ImageBackground>
            </Animated.View>
        </View>
    );
}


export default Home;

const style = StyleSheet.create({
    container: { // the main container of the pages 
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        
    },
    homeContainer: { // the home screen container
        flex: 1,
        position: 'absolute',
        backgroundColor: 'black',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%'
    },
    imageBackgroundContainer: { // background image container for the home screen
        width: '100%',
        height: height
    },
    navbarContainer: { // the navbar container in the home screen
        position: 'relative',
        backgroundColor: '#4169e1',
        alignItems: 'center',
        height: '10%',
        borderRadius: 10
    },
    barsStyle: { // the burger icon style
        position: 'absolute',
        right: '90%',
        color: '#fff',
        top: '45%'
    },
    searchStyle: { // the search icon style
        position: 'absolute',
        color: '#fff',
        left: '90%',
        top: '45%'
    },
    logoButton: { // logo button position
        position: 'absolute',
        top: '45%'
    },
    logoTextStyle: { // the logo name  
        color: 'white',
        fontWeight: 'bold',
        fontSize: 26,
    },
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
        fontSize: 20,
        color: 'white'
    },
    flatListImageStyle: { // the image style
        width: '90%',
        height: '89%',
        borderRadius: 20,
        resizeMode: 'cover'
    },
    sidebarContainer: { justifyContent: 'flex-start'} // the side bar container 
    ,
    sidebarBackGroundContainer: { // background image container for the sidebar screen
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    loginButtonWrapper: { // login button wrapper (sidebar)
        position: 'relative',
        bottom: '13%',
        left: '4%' 
    },
    navigationButtonWrapper: { // the other 3 buttons (sidebar)
        position: 'relative',
        bottom: '7%',
        left: '4%' 
    },
    logOutButtnonWrapper: { // logout button wrapper (sidebar)
        top: '22%',
        left: '4%'
    },
})
