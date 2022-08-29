import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Dimensions, Alert, Platform, Keyboard } from 'react-native';
import { Input, Button, SocialButton } from '../components';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/reducers';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Facebook from 'expo-facebook';
import * as firebaseFunctions from '../constants/firebaseauth';


const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
}

const Login : FC<Props> = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    // facebook login
    const facebookLogIn = async () => {
        try {
            await Facebook.initializeAsync({ 
                appId: '786372692551742',
            });
            const result = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (result.type === 'success') {
                // using facebook graph API here
                fetch(`https://graph.facebook.com/me?access_token=${result.token}&fields=id,name,email`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    dispatch(useActions.setLogedIn());
                    dispatch(useActions.updateName(data.name));
                    props.navigation.navigate('home');
                })
                .catch(e => console.log(e));
            } 
        }  catch ({message}) {
            alert(`Facebook Login Error: ${message}`)
        }
    }

    // google login
    const googleLogin = async () => {

    }

    // apple login
    const appleLogin = async () => {

    }

    // email and password login
    const login = async () => {
        if(email && password) {
            props.navigation.navigate('appLoader');
            const result = await firebaseFunctions.login(email, password);
            if (result) {
                if (email == 'admin@gmail.com') {
                    dispatch(useActions.setAdmin());
                }
                {dispatch(useActions.setLogedIn())}
                props.navigation.navigate('home');
            } else {
                props.navigation.navigate('login');
                Alert.alert("email or password are incurrent");
            }
        } else {
            Alert.alert("Missing Fields");
        }
    }

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <ImageBackground source={require('../assets/signup_1.jpg')} style={style.backGroundContainer}>
                <View style={style.container}>
                    <View style={style.headerStyle}>
                        <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => props.navigation.navigate('home')}/>
                    </View>
                    <View style={style.imageContainer}>
                        <TouchableOpacity style={{width, alignItems: 'center'}} onPress={Keyboard.dismiss}>
                            <Image 
                            source={require('../assets/clubearLogo1.png')}
                            style={style.imageStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={style.inputContainer}>
                        <Input shortInput={false} placeholder='Email*' iconName='mail' onChangeText={(text) => setEmail(text)} />
                        <Input shortInput={false} placeholder='Password*' iconName='lock1' secureTextEntry onChangeText={(text) => setPassword(text)} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('forgotPassword')} >
                            <Text style={style.textDecoration}> Forgot your password?</Text>
                        </TouchableOpacity>
                        <Button color1='#724997' color2='#3F1651' title='Login' onPress={login} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '60%', marginBottom: '3%'}}>
                        <Text style={[style.textDecoration, {textAlign: 'center', alignSelf: 'center',}]}>_________________ </Text>
                        <Text style={[style.textDecoration, {textAlign: 'center', alignSelf: 'center',}]}> Or  </Text>
                        <Text style={[style.textDecoration, {textAlign: 'center', alignSelf: 'center',}]}>_________________</Text>
                    </View>
                    <View style={style.socialButton}>
                        <SocialButton
                            iconName='facebook-square'
                            iconColor='#fff'
                            buttonColor='#1a1aff'
                            onPress={() => facebookLogIn()}
                        />
                        <SocialButton
                            iconName='google'
                            iconColor='#fff'
                            buttonColor='#ff0000'
                            onPress={() => googleLogin()}
                        />
                        {Platform.OS === 'ios' ?
                        <SocialButton
                        iconName='apple'
                        iconColor='#fff'
                        buttonColor='#0d0d0d'
                        onPress={() => appleLogin()}
                        />
                        :
                        <View>
                        
                        </View>
                        }
                    </View>
                    <View style={style.signUp}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('signUp')} >
                            <Text style={style.textDecoration}>Dont Have an Account? Sign Up Here</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Login;

const style = StyleSheet.create({
    backGroundContainer: { // the background image style
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerStyle: { // the header that wrap the back icon
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width,
    },
    backIcon: { // back icon style
        color: '#fff',
        marginLeft: '2%',
       
    },
    imageContainer: { // the image container
        width,
        justifyContent: 'center',
        alignItems: 'center',
        height: '35%',
        
    },
    imageStyle: { // the bear logo image style
        height: '100%',
        width: '80%',
        aspectRatio: 1,
    },
    inputContainer: { // the input style
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5%',
        
    },
    textDecoration: { // decoration of the text on the screen 
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    socialButton: { // the social button style
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    signUp: { // the sign up style
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '12%'
    },
})