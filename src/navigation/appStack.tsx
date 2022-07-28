import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Home, SignUp, Login, SearchBar, ClubInfo } from '../screens';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const {Navigator, Screen} = createStackNavigator();

const RootStack = createStackNavigator();

const AppStack : FC = () => {

    

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='home' component={Home} />
            <Screen name='clubInfo' component={ClubInfo}  /> 
            <Screen name='searchBar' component={SearchBar} />
            <Screen name='login' component={Login} />  
           <Screen name='signUp' component={SignUp} />
        </Navigator>
    );
}

export default AppStack;