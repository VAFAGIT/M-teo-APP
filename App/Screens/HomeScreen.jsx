import React, { useContext ,useState, useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import { 
  View, 
  Text, 
  Pressable,
  SafeAreaView,
  StyleSheet, 
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
// import Constants from 'expo-constants';

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  const { userInfo,  isLoading , logout} = useContext(AuthContext);
  // const img = {
  //   uri:
  //     "http://openweathermap.org/img/wn/" +
  //     weather[0].icon +
  //     "@2x.png",
  // }; 

  // change imag based on weather conditions 
  

  useEffect(() => {
    (async () => {
      // if (Constants.isDevice) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission not granted');
        }
      // }

      const API_KEY = "96701f0b5d8c01ba81f4dabadf59545d"

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          setWeatherData(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      

      fetchData();
    })();
  }, []);


  const img = {
    uri:  
      "http://openweathermap.org/img/wn/" +
      weatherData.weather[0].icon +
      "@2x.png",
  }

  return (
       <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {loading ? (
        <ActivityIndicator size="large" />
            ) : (
              <> 
                    <Image source={img} 
                    style={{width: 200, height: 200, marginBottom:40}}/>

                    <Text style={styles.text}>
                      {weatherData.name}, {weatherData.sys.country}
                    </Text>
                    <Text style={styles.text}>
                      {weatherData.weather[0].main}: {weatherData.weather[0].description}
                    </Text>
                    <Text style={styles.text}>
                      Temperature: {weatherData.main.temp}°C
                    </Text>
                    <Text style={styles.text}>
                      Humidity: {weatherData.main.humidity}%
                    </Text>

                
              </>
            )}
          </View>
                    <View style={styles.Button}>
                          <Spinner visible={isLoading} />
                          <Pressable onPress={() => logout()} >
                            <Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
                          </Pressable>
                    </View>
        </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Button:{
    marginEnd: 10,
    backgroundColor: '#A5E3CC',
    // borderRadius: 70,
    padding: 10,
    width: '100%',
    marginTop: 50,
    marginLeft: 5,    
  },
  locationText: {
    fontSize: 30,
    marginTop: 20,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  weatherText: {
    fontSize: 20,
    marginTop: 20,
  },
  temperatureText: {
    fontSize: 20,
    marginTop: 20,
  },
  humidityText: {
    fontSize: 20,
    marginTop: 20,
  },
    safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 1,
  },
});

export default HomeScreen;
