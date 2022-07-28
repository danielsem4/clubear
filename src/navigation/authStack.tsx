import React, { FC } from 'react';
import { AppLoader } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen} = createStackNavigator();

const AuthStack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
           <Screen name="appLoader" component={AppLoader}/>  
        </Navigator>
    );
}

export default AuthStack;