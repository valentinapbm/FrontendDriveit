import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import SearchScreen from './screens/SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import LoginSesion from './screens/LoginSesion';
import RegisterSesion from './screens/RegisterSesion';

const Tab = createBottomTabNavigator();


function Navbar() {
  return (
    <Tab.Navigator
    screenOptions={({route}) =>
      {
        if(route.name === "Iniciar sesión"){
          return{
            tabBarStyle: {
              display:"none",
            },
            headerShown:false,
          }
          
        }else{
        return{
        tabBarStyle: {
          position:"absolute",
          bottom:25,
          left:20,
          right:20,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          borderRadius:15,
        },
        tabBarShowLabel: false,
        headerShown:false,
        tabBarActiveTintColor: "#072F4A",
        
      }
    }
    }
    }
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={28} />
          ),
        }} />
      <Tab.Screen name="Buscar" component={SearchScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={28} />
          ),
        }} />
      <Tab.Screen name="Iniciar sesión" component={Login} options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={28} />
          ),
        }}  />
    </Tab.Navigator>
  );
  }

const Stack = createNativeStackNavigator();

export default function App() {

  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  
  React.useEffect(()=>{
    const fetchData = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
  }
  fetchData()
  AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);
  
  
  return (
    isAppFirstLaunched !== null && (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>

          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}

          <Stack.Screen name="Home" component={Navbar} />
          <Stack.Screen name="Search" component={SearchScreen} />   
          <Stack.Screen name="LoginSesion" component={LoginSesion} /> 
          <Stack.Screen name="RegisterSesion" component={RegisterSesion} />    
          
        </Stack.Navigator>
        
      </NavigationContainer>
    )
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: "red"
  }
});
