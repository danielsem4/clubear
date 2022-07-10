import React from 'react';
import './src/constants/firebase'
import { StyleSheet, Text, View } from 'react-native';
import MainNav from './src/navigation/mainNav';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <MainNav/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
