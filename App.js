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
const Tab = createBottomTabNavigator();
let token;

const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const theme = extendTheme({ colors: newColorTheme });
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
            <Icon name="home" color={color} size={28} />
          ),
        }} />
      <Tab.Screen name="Buscar" component={SearchScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={28} />
          ),
        }} />
        {role === "host" &&
              <Tab.Screen name="CreateCar" component={CreateCar} options={{
          tabBarIcon: ({color}) => (
            <Icon name="add-box" color={color} size={28} />
          ),
        }} />
        }
        <Tab.Screen name="Reservas" component={SearchScreen} options={{
          tabBarIcon: ({color}) => (
            <Icon1 name="car" color={color} size={28} />
          ),
        }} />
        
          <Tab.Screen name="ProfileUser" component={ProfileUser} options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={28} />
            
          ),
        }}  />
        </Tab.Navigator>
        
        ) : (   
          <Tab.Navigator
            screenOptions={({route}) =>
      {
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
          <Tab.Screen name="Cuenta" component={Login} options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={28} />
            
          ),
        }}  />
    </Tab.Navigator>
  )
  )
  }

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const { isLoggedIn, fullname, role, image, isalreadyatoken } = useSelector(
    (state) => state.userReducer
  );
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const dispatch =useDispatch();
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

  //AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  const init = async () => {
    token = await AsyncStorage.getItem('token')
    if (token !== null) {
      dispatch(getUser("startagain"));
  }
}

  useEffect(() => {
    init()
    //AsyncStorage.removeItem('token');
  }, [])
  if(isalreadyatoken === true){
    return(
  <View style={[styles.container, styles.horizontal]}>
  <ActivityIndicator size="large" color="#072F4A" />
  </View>)
}else{
  return (
    isAppFirstLaunched !== null && (
      <NavigationContainer ref={navigationRef}>
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

          <Stack.Screen name="EditProfileUser" component={EditProfileUser} />            
          
        </Stack.Navigator>
        
      </NavigationContainer>
    )
    
  );
}
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