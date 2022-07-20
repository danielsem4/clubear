import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import { SidebarButton, ClubsByCity, Button } from '../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import clubsList from '../Data/clubs';


const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
    title: string;
    imageName: string;
    clubCity: string;
    onPress: () => void;
}

const cities = ['Tel Aviv', 'Herzelia', 'Rishon Lezion', 'Hod Hasharon']; 

const Home : FC<Props> = (props) => {

    const [arrange, setArrange] = useState(false); // the clubs arrange state   

    const [showMenu, setShowMenu] = useState(false); // the slideMenu useState

    const offsetValue = useRef(new Animated.Value(0)).current; // side bar animation
    const scaleValue = useRef(new Animated.Value(1)).current; // side bar animation
    const closeButtonOffset = useRef(new Animated.Value(0)).current; // side bar animation

    const navigation = useNavigation();

    const search = () => {
        props.navigation.navigate('searchBar')
    }

    const barsHandler = () => {
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
    }

    const arrangeUpdate = () => {
        setArrange(!arrange)
        barsHandler()
    }

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
                        iconName='search'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='Search'
                        onPress={() => props.navigation.navigate('searchBar')}
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
                        <View style={style.togglWrapper}>
                            <Switch
                            style={style.switchStyle}
                            value={arrange}
                            onValueChange={arrangeUpdate}
                            />
                            <Text style={style.switchText}>arrange by city</Text>
                        </View>
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
                        <Icons name= { showMenu ? 'close' : 'bars' } size={30} style={style.barsStyle} onPress={barsHandler} 
                        />
                        <TouchableOpacity style={style.logoButton} onPress={() => {}}>
                            <Text style={style.logoTextStyle}> Clubear </Text>
                        </TouchableOpacity>
                        {/* <Icons name='search' size={30} style={style.searchStyle} onPress={search} /> */}
                    </View>      
                    {
                    arrange !== false ? // check if the user want to sort by city or not
                    <View style={style.flatListContainer}> 
                        <FlatList
                         style={style.flatList}
                         keyExtractor={(_, index) => index.toString()}
                         data={cities}
                         ListFooterComponent={<View style={{height: 20}}/>}
                         renderItem={({item}) => {
                            return(
                                <ClubsByCity clubLocation={item} clubList={clubsList} />
                            )
                        }}
                        />
                    </View> 
                    :
                    <View style={style.flatListContainer}>
                        <FlatList
                         style={style.flatList}
                         keyExtractor={(_, index) => index.toString()}
                         data={clubsList}
                         ListFooterComponent={<View style={{height: 20}}/>}
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
                    }
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
        flex: 1,
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
    flatListContainer: {  // the flat list wrapper
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%'
    },
    flatList: { flexGrow: 1 } // the flat list style
    , 
    flatListImageContainer: { // the image size in the flat list
        width,
        height: height / 3.5,
    },
    flatListBottunContainer: { // the button size in the flat list
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    flatListClubNameStyle: { // the club name style
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
        bottom: '12%',
        left: '3%'
    },
    navigationButtonWrapper: { // the other 3 buttons (sidebar)
        position: 'relative',
        left: '3%'
    },
    togglWrapper: {
        position: 'absolute',
        top: '95%'
    },
    switchStyle: {  // the toggl of the arrange 
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '90%',
    },
    switchText: { // the toggl name
        fontSize: 22,
        color: '#fff',
        bottom: '50%',
        left: '13%'
    },
    logOutButtnonWrapper: { // logout button wrapper (sidebar)
        top: '20%',  
        left: '3%'
    },
})
