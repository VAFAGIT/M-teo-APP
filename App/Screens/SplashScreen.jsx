import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}

export default SplashScreen;