import React, { FC, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from '../components';
import BackIcon from 'react-native-vector-icons/Ionicons';
import '../constants/firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
}

const SignUp : FC<Props> = (props) => {

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
                const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
                if(user) {
                    await firebase.firestore().collection('users').doc(user.uid).set({name, email, password, phoneNumber, signedIn});
                }
            } catch(error) {
                console.log(error);
            }
        } else {
            Alert.alert('Error', 'try again')
        }
        } else {
            Alert.alert('Error', 'Missing Fields')
        }
    }

    return(
        <KeyboardAvoidingView style={style.container} behavior='height'>
            <View style={{width: '100%'}} >
                <ScrollView style={style.scrollView}>
                    <ImageBackground source={require('../assets/signup_1.jpg')} style={style.backGroundContainer}>
                        <BackIcon name="arrow-back" size={36} style={style.backIcon} onPress={() => props.navigation.navigate('login')}/>
                        <Image 
                        source={require('../assets/clubearLogo1.png')}
                        style={style.imageStyle}
                        />
                        <Input placeholder='Full Name*' iconName='user' onChangeText={(text) => setName(text)} />
                        <Input placeholder='Email*' iconName='mail' onChangeText={(text) => setEmail(text)} />
                        <Input placeholder='Password*' iconName='lock1' secureTextEntry onChangeText={(text) => setPassword(text)} />
                        <Input placeholder='Repeat Password*' iconName='lock1' secureTextEntry onChangeText={(text) => setRepeatPassword(text)} />
                        <Input placeholder='Phone Number*' iconName='mobile1' onChangeText={(text) => setPhoneNumber(text)} />
                        <Button title='Sign Up' onPress={signup} />
                    </ImageBackground>
                </ScrollView>
            </View>
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
    imageStyle: {
        width: '88%',
        height: '45%',
        resizeMode: 'stretch',
    },
    backGroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: height / 0.96
    },
    scrollView: {
        width: '100%',
    },
    backIcon: {
        position: 'absolute',
        color: '#fff',
        right: '90%',
        bottom: '92%'
    },
    logoWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})