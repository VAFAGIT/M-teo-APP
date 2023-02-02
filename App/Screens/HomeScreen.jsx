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

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  // const img = require('../assets/images/bg.png')
  const { userInfo,  isLoading , logout} = useContext(AuthContext);  

  useEffect(() => {
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission not granted');
        }

      const API_KEY = "96701f0b5d8c01ba81f4dabadf59545d"

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
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


  const img = weatherData.weather ? {
    uri: "http://openweathermap.org/img/wn/" +
      weatherData.weather[0].icon +
      "@2x.png",
  } : {};
  

  return (
       <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {loading ? (
        <ActivityIndicator size="large" />
            ) : (
              <> 
                    <Image source={img} 
                    style={styles.weatherIcon}/>

                    <Text style={styles.locationText}>
                      {weatherData.name}, {weatherData.sys.country}
                    </Text>
                    <Text style={styles.weatherText}>
                      {weatherData.weather[0].main}: {weatherData.weather[0].description}
                    </Text>
                    <Text style={styles.temperatureText}>
                       {weatherData.main.temp.toFixed(0)}°C
                    </Text>
                    <Text style={styles.humidityText}>
                       {weatherData.main.humidity}%
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
    padding: 10,
    width: '100%',
    marginTop: 50,
    marginLeft: 1,    
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
    paddingTop: 4,
    paddingBottom: 10,
  },
});

export default HomeScreen;
