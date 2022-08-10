import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'firebase/compat/auth';
import AppStack from './appStack';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


const MainNav : FC = () => {

    const screenState = useSelector((state: RootState) => state.user);

    return(
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}

// AppStack AuthStack

export default MainNav;
