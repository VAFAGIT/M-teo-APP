import React, {useContext, useState} from 'react';
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable 
} from 'react-native';

import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imgj = require('../assets/images/Registe.png');


  const {isLoading, register , errorMessage} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
        <Image source={imgj} style={{width: 300, height: 300, borderRadius:200, marginBottom:40}}/>
        <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Pressable 
           style={styles.Button} 
           onPress={() => {
           register(name, email, password);
          //  navigation.navigate('/HomeScreen')
          }}
        >
            <Text style={{color: 'white', textAlign: 'center'}}>Register</Text>
         </Pressable>

        <View style={{flexDirection: 'row', marginTop: 20,justifyContent:"center"}}>
          <Text >Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.link}>Login</Text>
                {errorMessage && <Text>{errorMessage}</Text>}
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 100,
        paddingHorizontal: 20,
  },
  link: {
    color: 'green',
  },
  Button: {
    borderRadius: 200,
    backgroundColor: '#000',
    padding: 10
  }
});

export default RegisterScreen;