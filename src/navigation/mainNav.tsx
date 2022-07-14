import React, { FC, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import AppStack from './appStack';
import AuthStack from './authStack';


const MainNav : FC = () => {
    const [user, setUser] = useState<any>(null);

    const bootstrap = () => {
        firebase.auth().onAuthStateChanged(_user => {
            if(_user){
                setUser(_user)
            }
        })
    }

    useEffect(() => {
        bootstrap()
    }, [])

    return(
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}

// AppStack AuthStack

export default MainNav;
