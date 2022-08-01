import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AppStack from './appStack';
import AuthStack from './authStack';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


const MainNav : FC = () => {

    const screenState = useSelector((state: RootState) => state.user);

    return(
        <NavigationContainer>
            { screenState.load ?  <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    );
}

// AppStack AuthStack

export default MainNav;
