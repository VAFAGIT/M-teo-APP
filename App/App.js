import React from 'react';
// import {Text, View} from 'react-native';
import 'react-native-gesture-handler';

import Navigation from './Components/Navigation';
import { AuthProvider } from './context/AuthContext';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#06bcee" /> 
      <Navigation />
    </AuthProvider>
  );
};


