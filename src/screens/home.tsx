import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image, Animated, Alert, SafeAreaView } from 'react-native';
import 'firebase/compat/auth';
import { ScrollView } from 'react-native-gesture-handler';
import Bars from 'react-native-vector-icons/FontAwesome';
import { Input, Button, SocialButton, SidebarButton } from '../components';

const {height, width} = Dimensions.get('screen');

interface props {
    signedIn: string,

}

const Home : FC = () => {

    const [showMenu, setShowMenu] = useState(false); // the slideMenu useState

    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

    return(
        <View style={style.container}>
            <View style={style.sidebarContainer}>
                <ImageBackground source={require('../assets/home_screen_top.jpg')} style={style.sidebarBackGroundContainer}>
                    <View style={style.loginWrapper}>
                    <SidebarButton 
                        iconName='login'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='login'
                        onPress={() => Alert.alert('login')}
                        />
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
            </View>
            <Animated.View style={[style.homeContainer, {transform: [{
                scale: scaleValue}, {translateX: offsetValue}
            ]}
            ]}>
                <ScrollView style={{ width: '100%' }}>
                    <ImageBackground source={require('../assets/HomeBackground.png')} style={style.backGroundContainer}>
                        <View style={style.topImage}>
                            <Bars name="bars" size={36} style={style.barsStyle} onPress={() => {
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
                            <View style={style.textWrapper}>
                                <Text style={style.aboutStyle}>Trying to find</Text>
                                <Text style={style.aboutStyle}>a party tonight?</Text>
                                <Text style={style.aboutStyle}>Look no further</Text>
                            </View>  
                        </View>
                    </ImageBackground>
                </ScrollView>
            </Animated.View>
        </View>
    );
}

export default Home;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
    },
    homeContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    backGroundContainer: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height / 0.95,
    },
    topImage: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    textWrapper: {
        position: 'relative',
        bottom: '60%',
        right: '26%'
    },
    aboutStyle: {
        position: 'relative',
        color: '#fffafa',
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: '4%'
    },
    barsStyle: {
        position: 'relative',
        bottom: '35%',
        right: '42%',
        color: '#fff',
        zIndex: 3
    },
    sidebarContainer: {
        justifyContent: 'flex-start',
        
    },
    sidebarBackGroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    loginWrapper: {
        position: 'relative',
        bottom: '20%',
        left: '4%' 
    },
    navigationButtonWrapper: {
        position: 'relative',
        bottom: '12%',
        left: '4%' 
    },
    logOutWrapper: {
        position: 'relative',
        top: '20%',
        left: '4%'
    },
})





// first home screen 
/* 
return(
        <Animated.View style={style.container}>
            <ScrollView style={style.scrollView}>
                <ImageBackground source={require('../assets/HomeBackground.png')} style={style.backGroundContainer}>
                    <View style={style.topImage}>
                        <Bars name="bars" size={36} style={style.barsStyle} onPress={() => {
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 0.88,
                                duration: 300,
                                useNativeDriver: true
                            }) .start()

                            setShowMenu(!showMenu);
                         }} 
                         />
                        <Image
                            source={require('../assets/home_screen_top.jpg')}
                            style={style.imageStyle}
                        />
                        <View style={style.textWrapper}>
                            <Text style={style.aboutStyle}>Trying to find</Text>
                            <Text style={style.aboutStyle}>a party tonight?</Text>
                            <Text style={style.aboutStyle}>Look no further</Text>
                        </View>  
                    </View>
                </ImageBackground>
            </ScrollView>
        </Animated.View>
    );
}

export default Home;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
            { scale: 1},
            

        ]
    },
    scrollView: {
        width: '100%',
    },
    backGroundContainer: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height / 0.98,
    },
    topImage: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    imageStyle: {
        position: 'relative',
        width: '100%',
        height: '50%',
        resizeMode: 'stretch',
        bottom: '25%'
    },
    textWrapper: {
        position: 'relative',
        bottom: '60%',
        right: '26%'
    },
    aboutStyle: {
        position: 'relative',
        color: '#fffafa',
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        marginTop: '4%'
    },
    barsStyle: {
        position: 'relative',
        bottom: '12%',
        left: '43%',
        color: '#fff',
        zIndex: 3
    }
})
*/