import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, Dimensions, Animated, Alert, TouchableOpacity, Image, FlatList } from 'react-native';
import 'firebase/compat/auth';
import Icons from 'react-native-vector-icons/FontAwesome';
import { SidebarButton, ClubsByCity, Input } from '../components';
import clubsList from '../Data/clubs';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/reducers'


const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
    title: string;
    imageName: string;
    clubCity: string;
}

const cities = ['Tel Aviv', 'Herzelia', 'Rishon Lezion', 'Hod Hasharon', 'Bat-yam']; 

const Home : FC<Props> = (props) => {

    const clubs = clubsList

    const dispatch = useDispatch()

    const screenState = useSelector((state: RootState) => state.user);  

    const [showMenu, setShowMenu] = useState(false); // the slideMenu useState

    const offsetValue = useRef(new Animated.Value(0)).current; // side bar animation
    const scaleValue = useRef(new Animated.Value(1)).current; // side bar animation
    const closeButtonOffset = useRef(new Animated.Value(0)).current; // side bar animation

    const logout = () => {
        Alert.alert("loged out ")
        dispatch(useActions.setLogedIn())
    }

    const search = () => {
        const searchedClubs = clubsList.filter((input) => input.name === clubsList.values.name)
        return clubs
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

    const HomeHeader = () => {
        return(
            <View style={style.homeHeaderContainer}>
                <ImageBackground style={style.topHomeBear} source={require('../assets/bear_pic.png')} >
                    <Icons name= { showMenu ? 'close' : 'bars' } size={30} style={style.barsStyle} onPress={barsHandler} />
                    <View style={style.motoTextWrapper}>
                        <Text style={style.motoTextStyle}>Trying to find </Text>
                        <Text style={style.motoTextStyle}>a party tonight ?</Text>
                        <Text style={style.motoTextStyle}>Look no further</Text>
                    </View>
                </ImageBackground>
                <View style={style.searchInputContainer} >
                    <Input placeholder='Search' iconName='search1' onChangeText={search} />
                </View>
            </View>
        )
    }

    return(
        <View style={style.container}>
            <View style={style.sidebarContainer}>
                <ImageBackground source={require('../assets/sidebar_pic3.jpg')} style={style.sidebarBackGroundContainer}>
                    {
                    !screenState.logedIn ?
                    <View style={style.loginButtonWrapper}> 
                    <SidebarButton 
                        iconName='login'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='login'
                        onPress={() => props.navigation.navigate('login')}
                        />
                    </View>
                    :
                    <View style={style.welcomeContainer}>
                        <Text style={style.wolcomeTextStyle}> Welcome dear {screenState.user} {'\n'} lets have a party tonight</Text>
                    </View>
                    }   
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
                    </View>
                    {screenState.logedIn  ?
                    <View style={style.logOutButtnonWrapper}>
                        <SidebarButton 
                            iconName='logout'
                            iconColor='#fff'
                            buttonColor='#b3b3ff'
                            title='Logout'
                            onPress={logout}
                            />
                    </View>
                    :
                    <View>

                    </View>
                    }         
                </ImageBackground>
            </View>
            <Animated.View style={[style.homeContainer, {transform: [
                { scale: scaleValue }, { translateX: offsetValue }
            ]}
            ]}>
                <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                    <View style={style.flatListContainer}> 
                        <FlatList
                         ListHeaderComponent={HomeHeader}
                         style={style.flatList}
                         keyExtractor={(_, index) => index.toString()}
                         data={cities}
                         ListFooterComponent={<View style={{height: 20}}/>}
                         renderItem={({item}) => {
                            return(
                                <ClubsByCity clubLocation={item} clubList={clubsList} navigation={props.navigation} />
                            )
                        }}
                        />
                    </View> 
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
    homeHeaderContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    topHomeBear: { // the bear photo on the top of the screen
        position: 'relative',
        height: height / 2.55,
        width,
    },
    barsStyle: { // the burger icon style
        position: 'absolute',
        right: '90%',
        color: '#000',
        top: '9%'
    },
    searchInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%'
    },
    motoTextWrapper: { // the moto wrapper
        marginTop: '28%',
        marginLeft: '2%',
    },
    motoTextStyle: { // the logo name  
        color: 'white',
        fontWeight: 'bold',
        marginTop: '3%',
        fontSize: 19,
        textTransform: 'uppercase'
    },
    iconStyle: {
        color: 'red',
        fontSize: 14,
    },
    flatListContainer: {  // the flat list wrapper
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: { flexGrow: 1} // the flat list style
    , 
    flatListImageContainer: { // the image size in the flat list
        width,
        height: height / 3.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListBottunsContainer: { // the button size in the flat list
        height: '92%',
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
        backgroundColor: '#333333'
    },
    flatListClubNameStyle: { // the club name style
        display: 'flex',
        flex: 1,
        fontSize: 18,
        color: 'white',
        marginLeft: '2%',
        marginTop: '2.5%',
        alignSelf: 'flex-start',
    },
    flatListImageStyle: { // the image style
        width: '100%',
        height: '70%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    sidebarContainer: { justifyContent: 'flex-start'} // the side bar container 
    ,
    sidebarBackGroundContainer: { // background image container for the sidebar screen
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    welcomeContainer: {
        bottom: '15%',
        right: '20%',
        maxWidth: '60%'
    },
    wolcomeTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
    },
    loginButtonWrapper: { // login button wrapper (sidebar)
        bottom: '15%',
        left: '3%'
    },
    navigationButtonWrapper: {  // the other 3 buttons (sidebar)
        left: '3%'
    },
    logOutButtnonWrapper: { // logout button wrapper (sidebar)
        top: '20%',  
        left: '3%',
    },
})
