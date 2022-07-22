const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal;  // this line is only needed if you don't use an .android.js file
import 'react-native-gesture-handler'
import * as React from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import {SafeAreaView, Text, ActivityIndicator, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import SearchScreen from './screens/SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Entypo'
import Icon4 from 'react-native-vector-icons/FontAwesome5'

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import LoginSesion from './screens/LoginSesion';
import RegisterSesion from './screens/RegisterSesion';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { navigationRef } from './components/RootNavigation';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { getUser } from './store/reducers/User.reducer';
import { NativeBaseProvider, extendTheme } from 'native-base';
import ProfileUser from './screens/ProfileUser';
import EditProfileUser from './screens/EditProfileUser';
import { RootSiblingParent } from 'react-native-root-siblings';
import CreateCar from './screens/CreateCar';
import ImageBrowserScreen from './screens/ImageBrowserScreen';
import { getCars } from './store/reducers/Car.reducer';
import DetailsScreen from './screens/DetailsScreen';
import DeleteAccount from './screens/DeleteAccount';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CarsHost from './screens/CarsHost';
import BookingsCars from './screens/BookingCars';
import PaymentScreen from './screens/PaymentScreen';
import EditCar from './screens/EditCar';
import ImageBrowserScreen2 from "./components/ImageBrowser2"
const routeName = getFocusedRouteNameFromRoute("ProfileUser");
const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
let token;


const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};

const theme = extendTheme({ colors: newColorTheme });
if (isHermesEnabled || isAndroid) {  // this line is only needed if you don't use an .android.js file

  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');


  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/add-golden-tz.js');



  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {

    

    //  Are you using Expo, use this instead of previous 2 lines
     Intl.DateTimeFormat.__setDefaultTimeZone(
     require("expo-localization").timezone
    );
  }
} // this line is only needed if you don't use an .android.js file

function MyTabs() {
  return (
    <TabTop.Navigator screenOptions={() =>
    {
      return{
      tabBarStyle: {
        paddingTop:30,
        borderTopWidth: 0,
        elevation: 1,
      },
      tabBarShowLabel:false,
      headerShown:false,
      tabBarActiveTintColor: "#072F4A",
      tabBarHideOnKeyboard:true
      
    }
  
  }
  }>
      <Tab.Screen name="CarsHost" component={CarsHost}   options={{
          tabBarIcon: ({color}) => (
            <Icon4 name="car-side" color={color} size={24} />
          ),
          tabBarItemStyle:{

          },
          tabBarIconStyle:{

            width:30
          }
        }}/>
      <Tab.Screen name="BookingCars" component={BookingsCars}  options={{
          tabBarIcon: ({color}) => (
            <Icon4 name="folder-open" color={color} size={24} />
          ), 
          tabBarItemStyle:{
  
          },
          tabBarIconStyle:{

            width:30
          }
        }}/>
    </TabTop.Navigator>
  );
}


function Navbar({route}) {
  const { isLoggedIn, name, role, image, loading } = useSelector(
    (state) => state.userReducer
  );
  const routeName = getFocusedRouteNameFromRoute(route);
  return (
    isLoggedIn === true ? (
    <Tab.Navigator
    screenOptions={({route}) =>
      { 
        if(routeName=== "ProfileUser"){
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
              zIndex:0,
            },
          tabBarShowLabel: false,
          headerShown:false,
          tabBarActiveTintColor: "#072F4A",
          tabBarHideOnKeyboard:true
          }
        }
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
          zIndex:0,
        },
        tabBarShowLabel: false,
        headerShown:false,
        tabBarActiveTintColor: "#072F4A",
        tabBarHideOnKeyboard:true
      }
    
    }
    }
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="home" color={color} size={28} />
          ),
        }} />
      <Tab.Screen name="Buscar" component={SearchScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon3 name="location" color={color} size={28} />
          ),
        }} />
        {role === "host" &&
              <Tab.Screen name="CreateCar" component={CreateCar} options={{
          tabBarIcon: ({color}) => (
            <Icon name="add-box" color={color} size={28} />
          ),
        }} />
        }
        {role === "host" &&
              <Tab.Screen name="Reservas" component={MyTabs} options={{
                tabBarIcon: ({color}) => (
                  <Icon2 name="car" color={color} size={28} />
                ),
              }} />
        }
        {role !== "host" &&
        <Tab.Screen name="Reservas" component={SearchScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="car" color={color} size={28} />
          ),
        }} />
      }
        
          <Tab.Screen name="ProfileUser" component={ProfileUser} options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="user" color={color} size={28} />
            
          ),
        }}  />
        </Tab.Navigator>
        
        ) : (   
          <Tab.Navigator
            screenOptions={({route}) =>
      {
        if(routeName=== "Cuenta"){
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
              zIndex:0,
            },
          tabBarShowLabel: false,
          headerShown:false,
          tabBarActiveTintColor: "#072F4A",
          tabBarHideOnKeyboard:true
          }
        }
        return{
        tabBarStyle: {
          position:"absolute",
          bottom:25,
          left:20,
          right:20,
          height: 60,
          borderTopWidth: 0,
          elevation: 1,
          borderRadius:15,
        },
        tabBarShowLabel: false,
        headerShown:false,
        tabBarActiveTintColor: "#072F4A",
        tabBarHideOnKeyboard:true
        
      }
    
    }
    }
    >     
      <Tab.Screen name="Inicio" component={HomeScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="home" color={color} size={28} />
          ),
        }} />
      <Tab.Screen name="Buscar" component={SearchScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon3 name="location" color={color} size={28} />
          ),
        }} />
          <Tab.Screen name="Cuenta" component={Login} options={{
          tabBarIcon: ({color}) => (
            <Icon2 name="user" color={color} size={28} />
            
          ),
        }}  />
    </Tab.Navigator>
  )
  )
  }

const Stack = createNativeStackNavigator();

const RootNavigation = ({route}) => {
  const { isLoggedIn, fullname, role, image, isalreadyatoken } = useSelector(
    (state) => state.userReducer
  );
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const [alreadyToken, setAlreadyToken] = React.useState(null)
  const dispatch =useDispatch();
  React.useEffect(()=>{
    const fetchData = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    const token = await AsyncStorage.getItem('token')
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }

  }
  fetchData()

  //AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

 const init = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token !== null) {
      dispatch(getUser("startagain"));
      dispatch(getCars())
  }else{
    dispatch(getCars())
  }
}

  useEffect(() => {
    let abortController = new AbortController();  


    init()
    //AsyncStorage.removeItem('token');
    return () => {  
      abortController.abort();  
      }  
  }, [])


  return (
    isAppFirstLaunched !== null && (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: routeName === "ProfileUser" ? false : true}} >

          {isAppFirstLaunched && (
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}

          <Stack.Screen name="Home" component={Navbar} options={{header: () => null}}/>
          <Stack.Screen name="Search" component={SearchScreen} options={{header: () => null}} />   
          <Stack.Screen name="LoginSesion" component={LoginSesion}  options={{header: () => null}}/> 
          <Stack.Screen name="RegisterSesion" component={RegisterSesion}  options={{header: () => null}}/>
          <Stack.Screen
          name='ImageBrowser'
          component={ImageBrowserScreen}
          options={{
            title: 'Selected 0 files',
          }}
        />
                  <Stack.Screen
          name='ImageBrowser2'
          component={ImageBrowserScreen2}
          options={{
            title: 'Selected 0 files',
          }}
        />
          <Stack.Screen name="EditProfileUser" component={EditProfileUser} options={{header: () => null}} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{header: () => null}} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{header: () => null}} /> 
          <Stack.Screen name="EditCar" component={EditCar} options={{header: () => null}} /> 
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{header: () => null}} />                          
          
        </Stack.Navigator>
        
      </NavigationContainer>
    )
    
  );
}


const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
      <RootSiblingParent> 
      <RootNavigation />
      </RootSiblingParent>
      </NativeBaseProvider>
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});