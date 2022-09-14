import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {Home, SignUp, Login, ClubInfo, About,
        Settings, Admin, AppLoader, ForgotPassword,
        Menu, PickDate, GuestAmount, TablePackage,
        PickFromMenu, Payment, OrderDetails } from '../screens';

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
            <Screen name='pickDate' component={PickDate} />
            <Screen name="guestAmount" component={GuestAmount} />
            <Screen name="tablePackage" component={TablePackage} />
            <Screen name="pickFromMenu" component={PickFromMenu} />
            <Screen name="payment" component={Payment} />
            <Screen name="orderDetails" component={OrderDetails} />
            <Screen name='menu' component={Menu} />
            <Screen name='admin' component={Admin} />
            
        </Navigator>
    );
}

export default AppStack;