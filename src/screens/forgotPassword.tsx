import React, { FC, useState } from 'react';
import { ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { Input, Button } from '../components';
import * as firebaseFunctions from '../constants/firebaseauth';
import BackIcon from 'react-native-vector-icons/Ionicons';


const {height, width} = Dimensions.get('screen'); // the screen Dimensions

interface Props {
  navigation: any;
}

const ForgotPassword : FC<Props> = (props) => {

  const [email, setEmail] = useState<string>('');

  const handlePasswordReset = async () => {
      const result = await firebaseFunctions.handlePasswordReset(email);
      if (result) {
        Alert.alert('Please check your email...');
      } else {
        Alert.alert('The email does not exist Please try again');
      }
    }
    
    return (
      <KeyboardAvoidingView style={style.container} behavior='height'>
        <ImageBackground style={style.container} source={require('../assets/signup_1.jpg')} >
          <View style={style.headerStyle}>
            <BackIcon name="arrow-back" size={38} style={style.backIcon} onPress={() => props.navigation.navigate('login')}/>
          </View>
          <View style={style.imageContainer}>
            <TouchableOpacity style={{width, alignItems: 'center'}} onPress={Keyboard.dismiss}>
              <Image 
                source={require('../assets/clubearLogo1.png')}
                style={style.imageStyle}
                />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '5%', alignItems: 'center'}}>
              <Text style={{fontSize: 24, color: 'white', textAlign: 'center'}}>Enter your email</Text>
              <Input shortInput={false} placeholder='Your email* ' iconName='mail' onChangeText={(mail) => setEmail(mail)} />
              <Button smallButton={false} color1='#724997' color2='#3F1651' title='Submmit' onPress={() => handlePasswordReset()} />
          </View>
          <TouchableOpacity style={{width, height, alignItems: 'center'}} onPress={Keyboard.dismiss}> 
              
          </TouchableOpacity>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
}

export default ForgotPassword

const style = StyleSheet.create({
  container: { // the bear photo on the top of the screen
    flex: 1,
    width: '100%',
    height: height,
    alignItems: 'center'
  },
  headerStyle: { // the header that wrap the back icon
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width,
    marginTop: '7%'
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
    marginTop: '5%',
    
},
imageStyle: { // the bear logo image style
  height: '100%',
  width: '80%',
  aspectRatio: 1,
  },
});