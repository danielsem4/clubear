import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Home, SignUp, Login, ClubInfo, About, Order, Settings, Admin, AppLoader, ForgotPassword, Menu } from '../screens';

const {Navigator, Screen} = createStackNavigator();

const RootStack = createStackNavigator();

const AppStack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='home' component={Home} />
            <Screen name="appLoader" component={AppLoader}/> 
            <Screen name='clubInfo' component={ClubInfo} /> 
            <Screen name='settings' component={Settings} />
            <Screen name='about' component={About} />
            <Screen name='login' component={Login} />
            <Screen name='forgotPassword' component={ForgotPassword} />
            <Screen name='signUp' component={SignUp} />
            <Screen name='order' component={Order} />
            <Screen name='menu' component={Menu} />
            <Screen name='admin' component={Admin} />
            
        </Navigator>
    );
}

export default AppStack;