import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Sidebar } from '../screens';


const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="home" component={Home}/> 
           <Screen name="sidebar" component={Sidebar}/> 
        </Navigator>
    );
}

export default AppStack;