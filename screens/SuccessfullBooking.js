import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import { useSelector} from 'react-redux';
import credicar from "../assets/images/credit.png"
import cash from "../assets/images/cash.png"
import { useDispatch } from 'react-redux';
import booked from "../assets/booked.png"

const SuccessfullBooking = ({navigation, route}) => {
    const navigation1 =useNavigation();
    const dispatch = useDispatch()
    const { cars, bookings } = useSelector(
        (state) => state.userReducer
    );
        console.log(bookings)
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }
    function currencyFormat(num) {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor:"#f3f5fb"}}>
            <View style={{padding:10, height:450, alignItems:"center", justifyContent:"center", borderRadius:15, marginTop:60}}>
            <Image source={booked} style={{width:300, height:300}}/>
                        <Text style={{fontSize: 25, fontFamily:"Poppins_300Light", color:"#072F4A", textAlign:"center", paddingTop:20}}>Reserva creada exitosamente</Text>
                        
                        <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={()=>{navigation.navigate("ReservasUser")}}>
                        <Text style={style.textLeft}>
                        Ver tus reservas
                    </Text></TouchableOpacity>
                    </View>
    </SafeAreaView>
    );
};

const style = StyleSheet.create({
        inputContainer: {
        backgroundColor: "white",
        marginVertical:10,
        borderRadius:2,
        elevation:2
        },
        statusContainer: {
        width:"30%",
        backgroundColor: "#add8e6",
        paddingHorizontal: 15,
        marginVertical:10,
        borderRadius:5,
        alignSelf:"center",
        alignItems:"center",
        padding:5
        },
        left:{
            width:"100%",
            alignItems: 'center',
            justifyContent: 'center',
            padding:15,
            borderRadius: 4,
            backgroundColor: '#072F4A',
            marginTop:20
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
            fontSize: 20,
        },
    });

export default SuccessfullBooking;