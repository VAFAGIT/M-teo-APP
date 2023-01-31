import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import SplashScreen from '../Screens/SplashScreen';

import { AuthContext } from '../context/AuthContext';


const Stack = createStackNavigator();

const Navigation = () => {
  // const {isLoading, login} = userContext(AuthContext);  
  const {userInfo, splashLoading} = useContext(AuthContext);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{headerShown: false}} 
          />
        ) :  userInfo.data ? (
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> 
        )
         : (
          <>
            <Stack.Screen 
              name="login" 
              component={LoginScreen} 
              options={{headerShown: false}} 
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{headerShown: false}}
            />
          </>
          
         )}
       
        
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default Navigation;


