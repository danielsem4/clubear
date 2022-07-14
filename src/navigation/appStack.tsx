import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Home, SignUp, Login, ForgotPassword } from '../screens';

const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            {/* <Screen name="forgotPassword" component={ForgotPassword} /> */}
            <Screen name="home" component={Home}/> 
            <Screen name="login" component={Login}/>  
           <Screen name="signup" component={SignUp}/>
        </Navigator>
    );
}

export default AppStack;