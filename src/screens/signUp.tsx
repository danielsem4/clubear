import React, { FC, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from '../components';
import BackIcon from 'react-native-vector-icons/Ionicons';
import '../constants/firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/reducers';

const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
}

const SignUp : FC<Props> = (props) => {

    const dispatch = useDispatch()

    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [repeatPassword, setRepeatPassword] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [signedIn, setSignedIn] = useState<boolean>(true);


    const signup = async () => {
        if(name && email && password && repeatPassword && phoneNumber) {
            if((password === repeatPassword) && (phoneNumber.length == 10)) {
            try {
                {dispatch(useActions.setLoader())}
                const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
                if(user) {
                    await firebase.firestore().collection('users').doc(user.uid).set({name, email, password, phoneNumber, signedIn});
                    {dispatch(useActions.setLoader())}
                    {dispatch(useActions.setLogedIn())}
                    {dispatch(useActions.updateName(name))}
                    props.navigation.navigate('home')
                }
            } catch(error) {
                {dispatch(useActions.setLoader())}
                console.log(error);
            }
        } else {
            Alert.alert('The email / password / phone number incurrent', 'try again')
        }
        } else {
            Alert.alert('Error', 'Missing Fields')
        }
    }

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/signup_1.jpg')} style={style.backGroundContainer}>
            <View style={style.contentContainer}>
                <View style={style.headerStyle}>
                    <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => props.navigation.navigate('login')}/>
                </View>
                    <Image 
                    source={require('../assets/clubearLogo1.png')}
                    style={style.imageStyle}
                    />
                    <View style={style.inputContainer}>
                        <Input placeholder='Full Name*' iconName='user' onChangeText={(text) => setName(text)} />
                        <Input placeholder='Email*' iconName='mail' onChangeText={(text) => setEmail(text)} />
                        <Input placeholder='Password*' iconName='lock1' secureTextEntry onChangeText={(text) => setPassword(text)} />
                        <Input placeholder='Repeat Password*' iconName='lock1' secureTextEntry onChangeText={(text) => setRepeatPassword(text)} />
                        <Input placeholder='Phone Number*' iconName='mobile1' onChangeText={(text) => setPhoneNumber(text)} />
                        <Button title='Sign Up' onPress={signup} />
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default SignUp;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backGroundContainer: { // the background image style
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: { // container that wrap all the login screen elements
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerStyle: { // the header that wrap the back icon
        width: '100%',
        height: '10%',
        alignItems: 'flex-start',
    },
    backIcon: { // back icon style
        marginRight: '85%',
        color: '#fff',
        marginLeft: '2%',
        marginTop: '10%'
    },
    imageStyle: { // the bear logo image style
        height: '35%',
        aspectRatio: 1,
    },
    inputContainer: { // the input style
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '7%',
    },
})