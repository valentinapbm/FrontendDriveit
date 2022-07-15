import React, {useState} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { COLORS1, SIZES } from '../assets/styles/theme';
import logo from "../images/Imagen4.png";
import photo from "../images/login.png"
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';


const COLORS = {primary: '#fff', white: '#000'};

const Login = ({navigation}) => {
    const navigation1 = useNavigation();
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
                        onPress={() => navigation1.navigate('LoginSesion')}>
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
                    source={photo}
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
                        fontFamily:"Poppins_600SemiBold",
                        paddingBottom:20
                    }}>
                    ¡Bienvenido de nuevo!
                    </Text>
                    <View style={styles.fixToText}>
                    <TouchableOpacity style={styles.left}
                        onPress={() => navigation1.navigate('LoginSesion')}>
                        <Text style={styles.textLeft}>
                    Iniciar Sesión
                    </Text></TouchableOpacity>
                    <TouchableOpacity style={styles.rigth}
                        onPress={() => navigation1.navigate('RegisterSesion')}>
                        <Text style={styles.textRigth}>
                    Registrate
                    </Text></TouchableOpacity>
                    </View>
                </View>
                )            
};
    const styles = StyleSheet.create({
        fixToText: {
        width: SIZES.width - 150,
        height:50,
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        },
        left:{
            width:"60%",
            alignItems: 'center',
            justifyContent: 'center',
            padding:15,
            borderRadius: 4,
            backgroundColor: '#072F4A',
            borderRadius:0,
            borderTopLeftRadius:10,
            borderBottomLeftRadius:10
        },
        rigth:{
            width:"60%",
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            padding:15,
            backgroundColor: '#E8E8E8',
            borderRadius:0,
            borderTopRightRadius:10,
            borderBottomRightRadius:10
        },
        textLeft:
        {
            color: "white",
            fontFamily:"Poppins_700Bold",
            fontSize: SIZES.h4,
        },
        textRigth:
        {
            color: "black",
            fontFamily:"Poppins_700Bold",
            fontSize: SIZES.h4,
        }
    });
export default Login;