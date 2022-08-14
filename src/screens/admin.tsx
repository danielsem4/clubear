import React, { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import ButtonIcon from 'react-native-vector-icons/MaterialIcons';
import { Input } from '../components';
import 'firebase/compat/auth';
import {LinearGradient} from 'expo-linear-gradient';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import firebase from 'firebase/compat/app';
import * as ImagePicker from 'expo-image-picker';
import * as firebaseFunctions from '../constants/firebaseauth';

const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
}

const Admin : FC<Props> = (props) => {

    const todoRef = firebase.firestore().collection('clubs');

    const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
    const [pictureUploaded, setPictureUploaded] = useState(false);

    const [image, setImage] = useState<null | string>(null);

    const [action, setAction] = useState(0); // what action the admin want to do 
    const [clubName, setClubName] = useState<string>(''); // the club name
    const [city, setCity] = useState<string>(''); // the club city
    const [age, setAge] = useState<string>(''); // the age limit
    const [musicType, setMusicType] = useState<string>(''); // music type
    const [openingTime, setOpeningTime] = useState<string>(''); // club opening time
    const [about, setAbout] = useState<string>(''); // the club info 
    const [latitude, setLatitude] = useState<string>('32.02263');
    const [longitude, setLongitude] = useState<string>('34.74079');
    const [url, setUrl] = useState<string>('');

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted === false) {
            Alert.alert('You did not accept access to internal storage');
        } else {
            console.log(permission);
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log(result);
                if (!result.cancelled) {
                    const imageToUploadUri = result.uri;
                    setImage(imageToUploadUri);
                    Alert.alert('picture loaded now upload it to the storage');
                } else {
                    Alert.alert('You did not chose any image');
                }
        }
    };

    const uploadClubPicture = async () => {
        if (image !== null && clubName !== '') {
            await firebaseFunctions.uploadImage(image, clubName);
            console.log("suc");
            setPictureUploaded(!pictureUploaded);
            const picUrl = await firebaseFunctions.getImageUrl(clubName);
            console.log(picUrl);
            setUrl(picUrl);
        }
        else {
            Alert.alert('pls select picture or give the club name');
        }
    }


    const addClub = async () => {
        const result = await firebaseFunctions.addNewClub(clubName, city, age, musicType, openingTime, about, latitude, longitude, url)
        if (!result) {
            Alert.alert('missing fields');
        }
    }

    const dispatch = useDispatch()

    const screenState = useSelector((state: RootState) => state.user); 

    const updateFields = () => {
        switch (action) {
            case 0:
                return(
                    <View style={style.buttonsWrapper}>
                        <View style={style.actionButtonsContainer}>
                            <TouchableOpacity style={style.actionButtonsWrapper} onPress={() => {setAction(1)}}>
                                <ButtonIcon name='nightlife' size={60} style={style.iconStyle}/>
                                <Text style={{fontSize: 18, color: 'white',}}>Add club</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.actionButtonsWrapper} onPress={() => {setAction(2)}}>
                                <ButtonIcon name='nightlife' size={60} style={style.iconStyle}/>
                                <Text style={{fontSize: 18, color: 'white',}}>Edit club</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.actionButtonsWrapper} onPress={() => {setAction(2)}}>
                                <ButtonIcon name='nightlife' size={60} style={style.iconStyle}/>
                                <Text style={{fontSize: 18, color: 'white',}}>Remove club</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 1:
                if (pictureUploaded) {
                return(
                    <View style={style.inputContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                        <Input shortInput={true} placeholder='City*' iconName='enviromento' onChangeText={(text) => setCity(text)} />
                            <Input shortInput={true} placeholder='Age limit*' iconName='team' onChangeText={(text) => setAge(text)} />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                            <Input shortInput={true} placeholder='latitude* ' iconName='pushpino' onChangeText={(num) => setLatitude(num)} />
                            <Input shortInput={true} placeholder='longitude*' iconName='pushpino' onChangeText={(num) => setLongitude(num)} />
                        </View>
                        <Input shortInput={false} placeholder='Music type*' iconName='sound' onChangeText={(text) => setMusicType(text)} />
                        <Input shortInput={false} placeholder='Opening time*' iconName='hourglass' onChangeText={(text) => setOpeningTime(text)} />
                        <Input shortInput={false} placeholder='about*' iconName='infocirlceo' onChangeText={(text) => setAbout(text)} />
                        <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between', width: '80%'}}>
                        <TouchableOpacity  onPress={() => addClub()}>
                                <Text style={{color: 'white', fontSize: 26}}>submmit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={{color: 'white', fontSize: 26}}>back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );} else {
                    return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{marginBottom: '10%', marginTop: '5%'}}>
                            <Text style={{fontSize: 26, color: 'white', textAlign: 'center'}}>First set the club name and upload the club image and then enter the club details with the image url from firebase</Text>
                        </View>
                        <View style={{marginBottom: '30%',}}>
                            <Input shortInput={false} placeholder='Club Name*' iconName='staro' onChangeText={(text) => setClubName(text)} />
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icons name='image' size={70} color="white" onPress={() => pickImage()} />
                                <Text style={{fontSize: 18, color: 'white',}}>select club image</Text>
                            </View>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Icons name='upload' size={70} color="white" onPress={() => uploadClubPicture()} />
                                <Text style={{fontSize: 18, color: 'white',}}>upload club image</Text>
                            </View>
                        </View>
                    </View>
                );}
            case 2:
                return(
                    <View style={{}}>
                        <Text> update </Text>
                    </View>
            );
        }
    }
    
    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/HomeBackground.png')} style={style.imageBackgroundContainer}>
                <LinearGradient colors={['#021925', '#537895']} style={style.headerWrapper}>
                    <TouchableOpacity style={style.logoutStyle} onPress={() => props.navigation.navigate("home")}>
                        <Text style={{fontSize: 22, color: 'white'}}> Back </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: 'center', marginTop: '12%', marginRight: '5%'}} onPress={() => {setAction(0); setPictureUploaded(!pictureUploaded);}}>
                        <Text style={{fontSize: 24, color: 'white'}}> Welcome Back </Text>
                    </TouchableOpacity>
                    <Icons name={'search'} size={30} style={style.searchButtonStyle} onPress={() => {}} />
                </LinearGradient>
                {updateFields()}
            </ImageBackground>
        </KeyboardAvoidingView>
    )

}

export default Admin;

const style = StyleSheet.create({
    imageBackgroundContainer: { // the main container of the pages 
        flex: 1,
        width: '100%',
        height: height
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerWrapper: {
        borderWidth: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '8%',
        borderRadius: 5
    },
    logoutStyle: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20%'
    },
    searchButtonStyle: { // the search icon
        flexDirection: 'row',
        marginTop: '5%',
        marginRight: '4%',
        color: 'white'
    },
    buttonsWrapper: {
        flexDirection: 'column',
        marginBottom: '5%'
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '10%'
    },
    actionButtonsWrapper: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',    
    },
    iconStyle: {
        color: 'white'
    },
    inputContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '5%'
    }, 
})