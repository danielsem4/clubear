import React, { FC } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('screen');

interface Props {
    placeholder: string;
    iconName: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

const Input : FC<Props> = (props) => {
    return(
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={props.iconName} size={24} />
            </View>
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText}  />
        </View>
    );
}

export default Input;

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
    iconStyle: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadiusColor: '#ccc',
        borderRadiusWidth: 1,
        width: '13%'
    },
    input: {
        padding: '3%',
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFielld: {
        width: width / 1.5,
        height: height / 16,
        fontSize: 16,
        borderRadius: 8,
    }
})