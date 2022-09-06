import { Dimensions, Platform, StatusBar } from "react-native"

export const LISTMARGIN = 10;
const baseHeight = 160;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 0;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch;

export const HEADERHEIGHT = Platform.OS === 'ios' ? iosHeight : androidHeight;

const serverUrl = '';
const location = "/location";
const user = "/user";
const userEndpoint = serverUrl + user;

export const endpoints = {
    google: userEndpoint + "/google"
}