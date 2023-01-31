import React,{useContext, useState} from "react";
import { 
    Pressable, 
    View, 
    Image,
    Text, 
    TextInput, 
    TouchableOpacity,  
    StyleSheet 
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from 'react-native-loading-spinner-overlay';



const LoginScreen = ({navigation}) =>{

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {isLoading, login} =useContext(AuthContext);
    // const val = useContext(AuthContext);
    const img = require('../assets/images/LogIn.jpg')



    return (
        <View style={styles.container}>
            
            <Spinner visible={isLoading} />
            {/* <Text>Login</Text> */}
            <Image source={img} style={{width: 300, height: 300,marginBottom: 30}}/>
            <View style={styles.wrapper}>
                {/* <Text>{val}</Text> */}
                <TextInput 
                    style={styles.input} 
                    value={email}
                    placeholder="Enter Email" 
                    onChangeText={text => setEmail(text)}
                />

                <TextInput 
                    style={styles.input}  
                    value={password}
                    placeholder="Enter Password" 
                    secureTextEntry 
                    onChangeText={text => setPassword(text)}
                />

                <Pressable  
                    style={styles.Button} 
                    onPress={() => login(email, password)}
                    >
                    <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
                </Pressable>



                    <View style={{flexDirection: 'row', marginTop: 20,justifyContent:"center"}}>
                    <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.link} >Sign Up</Text>
                            </TouchableOpacity>
                    </View>
              
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width:'80%',
        marginBottom: 20,
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


export default LoginScreen;

