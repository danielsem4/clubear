import React, { FC, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Animated, Alert, FlatList } from 'react-native';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import '../constants/firebase'
import Icons from 'react-native-vector-icons/FontAwesome';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { SidebarButton, ClubsByCity, Input } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/reducers';
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebaseFunctions from '../constants/firebaseauth';


const {height, width} = Dimensions.get('screen'); // the screen Dimensions

interface Props { // the home screen title, navigation opption 
    navigation: any;
    title: string;
}

interface Club { // the club info structre
    name: string;
    url:string;
    city: string;
    age: string;
    musicType: string;
    openingTime: string;
    about: string;
    mapCoordinates: {
        latitude: 32.05506,
        longitude: 34.77488
    };
}

const Home : FC<Props> = (props) => {

    const dispatch = useDispatch(); // exe for redux functions
    const screenState = useSelector((state: RootState) => state.user); // get the states from redux

    const [clubs, setClubs] = useState<Club[]>([]); // the clubs 
    const [searchButton, setSearchButton] = useState(false); // search button state
    const [search, setSearch] = useState(''); // the search content state
    const [showMenu, setShowMenu] = useState(false); // the slideMenu useState
    const [clubsCities, setClubsCities] = useState<string[]>(['']); // the club cities state
    const [filterdData, setFilterdData] = useState(clubs); // the clubs state

    const offsetValue = useRef(new Animated.Value(0)).current; // side bar animation
    const scaleValue = useRef(new Animated.Value(1)).current; // side bar animation
    const closeButtonOffset = useRef(new Animated.Value(0)).current; // side bar animation

    useEffect(() => { // get the clubs info from firebase
        const get_clubs = async () => {
            await firebase.firestore().collectionGroup('clubs').get().then((querySnapshot) => {
                querySnapshot.forEach(snapshot => {
                    clubs.push(snapshot.data() as Club);
                });
                setClubs([...clubs]);
            }).then(() => {
                setClubsCities(Array.from(new Set(clubs.map(club => club.city))));
            })
        }
        get_clubs();
    }, [])

    // search club function
    const searchFilter = (text: string) => {
        if (text) {
            const FilterdData = clubs.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : '';
                const textData = text.toUpperCase();
                return itemData.includes(textData);
            });
            const sortedCities = [''];
            FilterdData.filter((item) => {
                if (!sortedCities.includes(item.city)) {
                    sortedCities.push(item.city)
                }
            })
            setSearch(text)
            setClubsCities(sortedCities)
            setFilterdData(FilterdData);
        } else {
            setClubsCities(Array.from(new Set(clubs.map(club => club.city))));
            setFilterdData(clubs);
            setSearch(text);
        }
    }

    // handle log out
    const logout = () => {
        Alert.alert("loged out ")
        dispatch(useActions.setLogedIn())
    }

    // handle the bar open and close
    const barsHandler = () => {
        Animated.timing(scaleValue, {
            toValue: showMenu ? 1 : 0.9,
            duration: 300,
            useNativeDriver: true
        })
        .start()
        Animated.timing(offsetValue, {
            toValue: showMenu ? 0 : 200,
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

    // the bear pic on the top of the home screen
    const HomeHeader = () => {
        return(
            <View style={style.homeHeaderContainer}>
                <ImageBackground style={style.topHomeBear} source={require('../assets/bear_pic.png')} >
                    <View style={style.motoTextWrapper}>
                        <Text style={style.motoTextStyle}>Trying to find </Text>
                        <Text style={style.motoTextStyle}>a party tonight ?</Text>
                        <Text style={style.motoTextStyle}>Look no further</Text>
                    </View>
                    {screenState.admin ? 
                    <View style={{marginLeft: '10%', marginTop: '15%'}}>
                        <Icons name= 'pencil' size= {40} color= 'white' onPress={() => props.navigation.navigate('admin')} />
                    </View>
                    :
                    <View>

                    </View>    
                }
                </ImageBackground>
            </View>
        )
    }

    return(
        <View style={style.container}>
            <ImageBackground source={require('../assets/sidebar_pic3.jpg')} style={style.sidebarBackGroundContainer}>
                <View style={style.sidebarContainer}>
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
                        <Text style={style.wolcomeTextStyle}>Welcome party man lets hang out tonight</Text>
                    </View>
                    }   
                    <View style={style.navigationButtonWrapper}>
                        <SidebarButton 
                        iconName='info-outline'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='About'
                        onPress={() => {
                            props.navigation.navigate('appLoader');
                            props.navigation.navigate('about');
                        }}
                        />
                        <SidebarButton 
                        iconName='settings'
                        iconColor='#fff'
                        buttonColor='#b3b3ff'
                        title='Settings'
                        onPress={() => props.navigation.navigate('settings')}
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
                </View>       
            </ImageBackground>
            <Animated.View style={[style.homeContainer, {transform: [
                { scale: scaleValue }, { translateX: offsetValue }
            ]}
            ]}>
                <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                    <LinearGradient colors={['#021925', '#537895']} style={searchButton ? [style.topBarStyle, {height: '10%'}] : style.topBarStyle}>
                        {!searchButton ?
                        <View style={style.headerStyle}>
                            <Icons name= { showMenu ? 'close' : 'bars' } size={30} style={style.barStyle} onPress={barsHandler} />
                            <TouchableOpacity style={{marginTop: '15%'}} >
                                <Text style={{color: 'white', marginTop: '5%', fontSize: 26}}>CLUBEAR</Text>
                            </TouchableOpacity>
                            <Icons name={'search'} size={30} style={style.searchButtonStyle} onPress={() => setSearchButton(!searchButton)} />
                        </View>
                        :
                         <View style={style.searchInputContainer} >
                            <BackIcon name="arrow-back" size={38} style={style.backIconStyle} onPress={() => {setSearchButton(!searchButton); searchFilter('')}}/>
                            <Input shortInput={false} searchInput={true} blurOnSubmit={false} placeholder='Search' iconName='search1' value={search} onChangeText={(text) => searchFilter(text)} />
                        </View> 
                    }
                    </LinearGradient>
                    <View style={style.flatListContainer}> 
                        <FlatList
                         ListHeaderComponent={HomeHeader}
                         style={style.flatList}
                         keyExtractor={(_, index) => index.toString()}
                         data={clubsCities}
                         ListFooterComponent={<View style={{height: 20}}/>}
                         renderItem={({item}) => {
                            return(
                                <ClubsByCity clubLocation={item} clubList={filterdData} navigation={props.navigation} />
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
    homeHeaderContainer: { // the home top bear image container
        display: 'flex',
        flexDirection: 'column',
    },
    topHomeBear: { // the bear photo on the top of the screen
        height: height / 2.55,
        width,
    },
    topBarStyle: {  // the top navbar container 
        borderWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        height: '9%',
        borderRadius: 5,
    },
    searchInputContainer: { // the search section container 
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '6%'
    },
    backIconStyle: { // the back icon in the search section
        flexDirection: 'row',
        color: 'white',
        marginLeft: '3%',
        alignSelf: 'center'
    },
    headerStyle: { // the main top navbar items
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barStyle: { // the bar icon
        color: 'white',
        marginLeft: '4%',
        marginTop: '5%',
    }, 
    searchButtonStyle: { // the search icon
        flexDirection: 'row',
        marginTop: '5%',
        marginRight: '4%',
        color: 'white'
    },
    motoTextWrapper: { // the moto wrapper
        marginTop: '15%',
        marginLeft: '2%',
    },
    motoTextStyle: { // the logo name  
        color: 'white',
        fontWeight: 'bold',
        marginTop: '5%',
        fontSize: 18,
        textTransform: 'uppercase'
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
        alignItems: 'center',
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
    sidebarContainer: { // the side bar container 
         flexDirection: 'column',
         justifyContent: 'flex-start',
         height: '82%',
    },
    sidebarBackGroundContainer: { // background image container for the sidebar screen
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    welcomeContainer: { // the name display container on the side bar
        alignSelf: 'flex-start',
        width: '50%',
        marginTop: '20%',
        marginLeft: '1%'
    },
    wolcomeTextStyle: { // the name style
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        marginLeft: '2%',
    },
    loginButtonWrapper: { // login button wrapper (sidebar)
        marginLeft: '2%',
        marginTop: '20%'
    },
    navigationButtonWrapper: {  // the other 3 buttons (sidebar)
        marginLeft: '2%',
        marginTop: '20%'
    },
    logOutButtnonWrapper: { // logout button wrapper (sidebar)
        marginTop: '30%',
        marginLeft: '2%'
    },
})
