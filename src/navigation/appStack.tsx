import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Home, SignUp, Login, ClubInfo, About, Order } from '../screens';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const {Navigator, Screen} = createStackNavigator();

const RootStack = createStackNavigator();

const AppStack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='home' component={Home} />
            <Screen name='clubInfo' component={ClubInfo} /> 
            <Screen name='about' component={About} />
            <Screen name='login' component={Login} />  
            <Screen name='signUp' component={SignUp} />
            <Screen name='order' component={Order} />
        </Navigator>
    );
}

export default AppStack;