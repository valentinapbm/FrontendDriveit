import React, {useRef, useState, memo} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
Animated,
Button,
Dimensions,
Image,
StyleSheet,
View,
FlatList,
TouchableOpacity,
Text
} from 'react-native';
import { SIZES } from '../assets/styles/theme';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/AntDesign';
import Carrousel from './Carrousel';
import { useNavigation } from '@react-navigation/native';

const CarHostCard = ({car}) => {
        const navigation = useNavigation();
        let [fontsLoaded] = useFonts({
            Poppins_400Regular,
            Poppins_700Bold,
            Poppins_600SemiBold,Poppins_300Light,
        });
        function currencyFormat(num) {
            return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }

        if (!fontsLoaded) {
            return null
        }
        
    return (
        <View style={styles.container}>
            <Carrousel data={car.images}/>
            <View style={{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between", paddingVertical:5, alignItems:"center", backgroundColor:"white"}}>
                <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color: "#100f42"}}>{car.brand} {car.model}</Text>
                <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", color: "grey"}}>{car.transmision === "automatic" ? "Automática" : car.transmision ==="mecanic" ? "Mecánica" : "Automática Secuencial"  }</Text>
            </View>
            <View style={{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between", marginBottom:15, backgroundColor:"white"}}>
            <TouchableOpacity activeOpacity={0.7} style={styles.left} onPress={()=> {navigation.navigate("EditCar", {car: car, cPhotos: null})}}>
                        <Text style={styles.textLeft}>
                    Editar
                    </Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.left} >
                        <Text style={styles.textLeft}>
                    Eliminar
                    </Text></TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{flex:1,
    backgroundColor:"white",
    borderRadius:15,
    overflow: 'hidden'
    },
    image:{
        width:SIZES.width,
        height:250,
        resizeMode:'cover',
    },
    dotview:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10

    },
    circle:{
        width:7,
        height:7,
        backgroundColor:"#c5cdfa",
        borderRadius:50,
        marginHorizontal:5,
    },
    day:{
        fontSize: 14, fontFamily:"Poppins_400Regular", color: "grey"
    },
    left:{
        width:"40%",
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
        borderRadius: 15,
        backgroundColor: '#f3f5fb',
        borderWidth:2,
        borderColor:"#034f84"
    },
    textLeft:
    {
        color: "#034f84",
        fontFamily:"Poppins_700Bold",
        fontSize: SIZES.h4,
    },

    });
export default  CarHostCard;