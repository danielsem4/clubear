import React from 'react';
import './src/constants/firebase'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MainNav from './src/navigation/mainNav';
import 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/redux/store';






export default function App() {

  return (
    <ReduxProvider store={store}>
      <MainNav/>
    </ReduxProvider>
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
