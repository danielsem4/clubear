import React, { FC } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('screen');

interface Props {
    placeholder: string;
    iconName: string;
    value?: string;
    blurOnSubmit?: boolean;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    searchInput?: boolean;
    shortInput: boolean;
    defaultValue?: string;
    maxLenght: number;
}

const NumericInput : FC<Props> = (props) => {
    return(
        !props.shortInput ?
        <View style={props.searchInput ? styles.searchInputContainer : styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={props.iconName} size={24} />
            </View>
            <TextInput keyboardType="numeric" maxLength={props.maxLenght} blurOnSubmit={props.blurOnSubmit} style={styles.input} value={props.value} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText}  />
        </View>
        :
        <View style={styles.shortinputContainer}>
            <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <AntDesign name={props.iconName} size={24} style={{marginRight: '10%'}}  />
                <TextInput keyboardType="numeric" maxLength={props.maxLenght} defaultValue={props.defaultValue} blurOnSubmit={props.blurOnSubmit} style={{marginRight: '10%', minWidth: '40%'}} value={props.value} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText}  />
            </View>
        </View>
    );
}

export default NumericInput;

const styles = StyleSheet.create({
    inputContainer: {
        width: width / 1.1,
        marginTop: '1.5%',
        marginBottom: '3%',
        height: height / 16,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    searchInputContainer: {
        width: width / 1.2,
        marginBottom: '2%',
        marginTop: '2%',
        marginRight: '2%',
        height: height / 20,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    shortinputContainer: {
        width: width / 3.2,
        marginTop: '1.5%',
        marginBottom: '3%',
        height: height / 16,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    iconStyle: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadiusColor: '#ccc',
        borderRadiusWidth: 1,
        width: '13%',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    
    
})