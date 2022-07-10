import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Dimensions, Alert } from 'react-native';
import { Input, Button, SocialButton } from '../components';
import BackIcon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
}

const Login : FC<Props> = (props) => {

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const login = async () => {
        if(email && password) {
            const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
        } else {
            Alert.alert("Missing Fields");
        }
    }

    return(
        <View style={style.container}>
            <ScrollView style={style.scrollView}>
                <ImageBackground source={require('../assets/signup_1.jpg')} style={style.backGroundContainer}>
                    <View style={style.logoWrapper}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => alert("hi")}/>
                        <Image 
                        source={require('../assets/clubearLogo1.png')}
                        style={style.imageStyle}
                        />
                    </View>
                    <View style={style.contentContainer}>
                        <View style={style.inputContainer}>
                            <Input placeholder='Email*' iconName='mail' onChangeText={(text) => setEmail(text)} />
                            <Input placeholder='Password*' iconName='lock1' onChangeText={(text) => setPassword(text)} />
                            <TouchableOpacity onPress={() => props.navigation.navigate('signup')} >
                                <Text style={style.textDecoration}> Forgot your password?</Text>
                            </TouchableOpacity>
                            <Button title='Login' onPress={login} />
                        </View>
                        <View style={style.socialButton}>
                            <SocialButton
                                iconName='facebook-square'
                                iconColor='#1a1aff'
                                buttonColor='#b3b3ff'
                                title='Sign In with Facebook'
                                onPress={() => Alert.alert('facebook')}
                            />
                            <SocialButton
                                iconName='google'
                                iconColor='#ff3333'
                                buttonColor='#ffb3b3'
                                title='Sign In with Google'
                                onPress={() => Alert.alert('Google')}
                            />
                        </View>
                        <View style={style.signUp}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('signup')} >
                                <Text style={style.textDecoration}>Dont Have an Account? Sign Up Here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

export default Login;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        width: '100%',
    },
    logoWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        position: 'absolute',
        color: '#fff',
        paddingRight: '85%',
        top: '3%'
    },
    imageStyle: {
        position: 'absolute',
        width: '88%',
        height: '45%',
        resizeMode: 'stretch',
        top: '5%'
    },
    contentContainer: {
        position: 'absolute',
        bottom: '3%',
        height: '50%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    facebookIcon: {
        color: '#1a1aff'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBo: '10%'
    },
    textDecoration: {
        color: '#fff',
        fontWeight: '500'
    },
    socialButton: {
        marginBottom: '10%',
        marginTop: "10%"
    },
    signUp: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10%'
    },
    backGroundContainer: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height / 0.98,
    }
})