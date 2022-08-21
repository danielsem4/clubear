import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './firebase'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import firebaseConfig from './firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

interface Club { // the club info structre
    name: string;
    url:string;
    city: string;
    age: string;
    musicType: string;
    openingTime: string;
    about: string;
    mapCoordinates: {
        latitude: 32.05506,
        longitude: 34.77488
    };
}

interface User { // the user info structre
    email: string;
    name: string;
    phoneNumber: string;
    password: string;
}

const users = firebase.firestore().collection('users');
const clubs = firebase.firestore().collection('clubs');


// check if club exist
export const checkIfTheClubExist = async (clubName: string) => {
    let result = false;
    await clubs.get().then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if ((snapshot.data() as Club).name === clubName) {
                result = true;
            }
        });
    });
    return result;
}

// check if user exist
export const checkIfTheUserExist = async (email: string) => {
    let result = false;
    await users.get().then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            if ((snapshot.data() as User).email === email) {
                result = true;
            }
        });
    });
    return result;
}

// email and password login 
export const login = async (email: string, password: string) => {  
    try {
        const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
        if ({user}) {
            console.log('true');
            return true;
        } else {
            return false;
        }
    } catch(error) {
        return false;
    }
}

// sign up new user
export const signUp = async (name: string, email: string, password: string, phoneNumber: string) => {
    try {
        const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if(user) {
            await firebase.firestore().collection('users').doc(user.uid).set({name, email, password, phoneNumber});
            return true
        }
    } catch(error) {
        return false
    }
}

// image upload function
export const uploadImage  = async (url: string, clubName: string) => {  

    const storage = getStorage();
    const reffernce = ref(storage, `home_image/${clubName}_main.png`);

    const image = await fetch(url);
    const bytes = await image.blob();

    await uploadBytes(reffernce, bytes);
}

// new club add function 
export const addNewClub = async (clubName: string, city: string, age: string, musicType: string, openingTime: string, about: string, latitude: string, longitude: string, url: string) => {
    if (clubName && city && age && musicType && openingTime && about && latitude && longitude) { 
        const theLatitude: number = Number(latitude);
        const theLongitude: number = Number(longitude);  
        await firebase.firestore().collection('clubs').doc().set({
        about: about,
        age: age,
        city: city,
        name: clubName,
        musicType: musicType,
        openingTime: openingTime,
        mapCoordinates: {
            latitude: theLatitude,
            longitude: theLongitude
        },
        url: url
    });
    return true;
    } else {
        return false;
    }
}

// get the image url
export const getImageUrl = async (clubName: string) => {
    const storage = getStorage();
    const reffernce = ref(storage, `home_image/${clubName}_main.png`);

    let imageUrl = ''

    await getDownloadURL(reffernce).then((url) => {
        imageUrl = url;
    });

    return imageUrl;
}

// forgot password handle
export const handlePasswordReset = async(email: string) => {
    let result = false;
    await firebase.auth().sendPasswordResetEmail(email).then((user) => {
        result = true;
    }).catch((e) => {
        console.log(e);
    });
    return result;
}

// get user by email
export const getUserByUserEmail = async (email: string) => {
    return await users
        .where('email', '==', email)
        .get();
}

// get user id by email
export const getUserIdByEmail = async (email: string) => { 
    let id = '';
    await getUserByUserEmail(email).then( async (value) => {
        id = value.docs[0].id;
      });
      console.log(id);
      return id;
}

// get club by name
export const getClubByName = async (clubName: string) => {
    return await clubs
        .where('name', '==', clubName)
        .get();
}

// get club id by the club name
export const getClubIdByName = async (clubName: string) => {
    let id = '';
    await getClubByName(clubName).then( async (value) => {
        id = value.docs[0].id;
      });
      console.log(id);
      return id;
}

// delete club by name
export const deleteClub = async (clubName: string) => {
    let result = false;
    await clubs.doc(await getClubIdByName(clubName)).delete().then(() => {
        result = true;
    }).catch((error) => {
        console.log(error);
        result = false;
    });
    return result;
}

// delete user by email
export const deleteUser = async (email: string) => {
    let result = false;
    await users.doc(await getUserIdByEmail(email)).delete().then(() => {
        result = true;
    }).catch((error) => {
        console.log(error);
        result = false;
    });
    return result;
}

// edit club by name                                               to do
export const updateClub = async (clubName: string) => {
    let result = false;
    await clubs.doc(await getClubIdByName(clubName)).update({
        
    })
}

