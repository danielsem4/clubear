import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import '../constants/firebase'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../constants/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

firebase.initializeApp(firebaseConfig);

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

