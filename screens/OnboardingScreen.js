import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS1, SIZES } from '../assets/styles/theme';
import AppIntroSlider from "react-native-app-intro-slider";
import logo from "../images/Imagen4.png"
import { 
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic 
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading';

const COLORS = {primary: '#fff', white: '#000'};

const slides = [
    {
    id: '1',
    image: require('../images/Imagen1.png'),
    title: 'Alquila el carro perfecto para cualquier ocasión',
    description: 'Nunca fue tan fácil alquilar un carro en una app.',
    
    },
    {
    id: '2',
    image: require('../images/Imagen2.png'),
    title: 'Bajas tarifas y servicio de calidad',
    description: 'Encuentra las tarifas más bajas y vive una experiencia única.',
    },
    {
    id: '3',
    image: require('../images/Imagen3.png'),
    title: 'Encuentra tu carro más cercano',
    description: 'Filtra tu búsqueda por ciudad para que sea más fácil encontrar tu carro.',
    },
];



const OnboardingScreen = ({navigation}) => {
    
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold
    });
    if (!fontsLoaded) {
        return null
    }

    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor(COLORS.primary);
    const buttonLabel = (label) => {
        return(
            <View style={{
                padding: 12
            }}>
                <Text style={{
                color: COLORS1.title,
                fontWeight: '600',
                fontSize: SIZES.h4,
                fontFamily:"Poppins_700Bold",
                }}>
                {label}
                </Text>
            </View>
            )
        }

        const nextButton = () => {
            return(
                <View style={{
                    padding: 12, 
                }}>
                <Text style={{
                color: COLORS1.title,
                fontWeight: '600',
                fontSize: SIZES.h4,
                fontFamily:"Poppins_700Bold",
                }}>
                Next
                </Text>
                </View>
                )
            }

            const doneButton = () => {
                return(
                    <View style={{
                        padding: 12, 
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}>
                    <Text style={{
                    color: COLORS1.title,
                    fontFamily:"Poppins_700Bold",
                    fontSize: SIZES.h4,
                    }}>
                    Comenzar
                    </Text>
                    </TouchableOpacity>
                    </View>
                    )
                }

        
    
    return (
            <AppIntroSlider
            data={slides}
            renderItem={({item}) => {
                return(
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 15,
                    paddingTop: 50,
                    backgroundColor: '#fff'
                }}>
                    <Image
                    source={logo}
                    style={{
                        width: SIZES.width - 80,
                        height: 50,
                    }}
                    resizeMode="contain"
                    />
                    <Image
                    source={item.image}
                    style={{
                        width: SIZES.width - 80,
                        height: 350,
                    }}
                    resizeMode="contain"
                    />
                    <Text  style={{
                        color: COLORS1.title,
                        fontSize: SIZES.h2,
                        textAlign:"center",
                        fontFamily:"Poppins_600SemiBold"
                    }}>
                    {item.title}
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        paddingTop: 20,
                        color: "grey",
                        fontSize: SIZES.h5,
                        fontFamily:"Poppins_400Regular",
                    }} >
                    {item.description}
                    </Text>
                </View>
                )
            }}
            activeDotStyle={{
                backgroundColor: "#4cbbbb",
                width: 30,
            }}
            showSkipButton
            renderNextButton={nextButton}
            renderSkipButton={() => buttonLabel("Skip")}
            renderDoneButton={doneButton}
            />
        )
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;