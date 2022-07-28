import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ScrollView, Dimensions, Alert } from 'react-native';
import { Input, Button, SocialButton } from '../components';
import BackIcon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase/compat/app';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import  { useActions }  from '../redux/reducers';
import { useNavigation, useRoute } from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

interface Props {
    navigation: any;
}

const Login : FC<Props> = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const login = async () => {
        if(email && password) {
            try {
                {dispatch(useActions.setLoader())}
                const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
                if ( {user} ) {
                    {dispatch(useActions.setLogedIn())}
                } else {
                    Alert.alert("Somthing went wrong");
                }
                {dispatch(useActions.setLoader())}
            } catch(error) {
                {dispatch(useActions.setLoader())}
                
                Alert.alert("the email or the password are incorrect");
            }
        } else {
            Alert.alert("Missing Fields");
        }
    }

    return(
            <ImageBackground style={style.backGroundContainer} source={require('../assets/signup_1.jpg')}>
                <View style={style.contentContainer}>
                    <View style={style.headerStyle}>
                        <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => props.navigation.navigate('home')}/>
                    </View>
                    <Image 
                    source={require('../assets/clubearLogo1.png')}
                    style={style.imageStyle}
                    />
                    <View style={style.inputContainer}>
                        <Input placeholder='Email*' iconName='mail' onChangeText={(text) => setEmail(text)} />
                        <Input placeholder='Password*' iconName='lock1' secureTextEntry onChangeText={(text) => setPassword(text)} />
                        <TouchableOpacity onPress={() => props.navigation.navigate('signUp')} >
                            <Text style={style.textDecoration}> Forgot your password?</Text>
                        </TouchableOpacity>
                        <Button title='Login' onPress={login} />
                    </View>
                    <Text style={style.textDecoration}> Or login with</Text>
                    <View style={style.socialButton}>
                        <SocialButton
                            iconName='facebook-square'
                            iconColor='#fff'
                            buttonColor='#1a1aff'
                            onPress={() => Alert.alert('facebook')}
                        />
                        <SocialButton
                            iconName='google'
                            iconColor='#fff'
                            buttonColor='#ff3333'
                            onPress={() => Alert.alert('Google')}
                        />
                    </View>
                    <View style={style.signUp}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('signUp')} >
                            <Text style={style.textDecoration}>Dont Have an Account? Sign Up Here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
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
    contentContainer: { // container that wrap all the login screen elements
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerStyle: { // the header that wrap the back icon
        width: '100%',
        alignItems: 'flex-start',
    },
    backIcon: { // back icon style
        marginRight: '85%',
        color: '#fff',
        marginLeft: '2%'
    },
    imageStyle: { // the bear logo image style
        height: '38%',
        aspectRatio: 1,
        marginBottom: '5%'
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
        fontSize: 15
    },
    socialButton: { // the social button style
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    signUp: { // the sign up style
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '12%'
    },
})