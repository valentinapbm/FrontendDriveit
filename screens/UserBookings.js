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


const UserBooking = ({navigation, route}) => {
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
    
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
    
    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor:"#f3f5fb"}}>
        <ScrollView contentContainerStyle={{paddingTop:60, paddingHorizontal:20, paddingBottom:100}}>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_700Bold"}}>Tus Reservas</Text>

                {bookings.length === 0 &&  <View style={{padding:10, height:250, alignItems:"center", justifyContent:"center", backgroundColor:"white", borderRadius:15, paddingTop:10}}>
                        <Text style={{fontSize: 17, fontFamily:"Poppins_300Light", color:"#072F4A", textAlign:"center"}}>No tienes ninguna reserva en el momento</Text>
                        
                        
                    </View>}
                {bookings.map((booking, index2)=>{
                    return(
                        <View key={index2} style={style.inputContainer}>
                        <View style={booking.statusBooking === "Active" ? style.statusContainer : style.statusContainerInactive}>
                            <Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>{booking.statusBooking === "Active" ? "Activa" : "Cancelada"}</Text>
                        </View>
                        <Text style={{fontSize: 12, fontFamily:"Poppins_700Bold", paddingHorizontal:15}}>No. de Referencia: {booking._id}</Text>
                        <View style={{flexDirection:"column",justifyContent:"space-between", alignItems:"baseline"}}>
                            <View style={{flexDirection:"row", width:"100%", paddingHorizontal:15}}><Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>Fecha Inicio: </Text><Text style={{fontSize: 12, fontFamily:"Poppins_300Light"}}>{booking.startDate}</Text></View>
                            <View style={{flexDirection:"row", width:"100%", paddingHorizontal:15, paddingTop:5}}><Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>Fecha Final: </Text><Text style={{fontSize: 12, fontFamily:"Poppins_300Light"}}>{booking.endDate}</Text></View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between", paddingTop:5}}>
                        <View style={{flexDirection:"row",  width:"50%", paddingHorizontal:15}}><Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>Hora Inicial: </Text><Text style={{fontSize: 12, fontFamily:"Poppins_300Light"}}>{booking.pickupHour[0]}:{booking.pickupHour[1]}</Text></View>
                        <View style={{flexDirection:"row", width:"50%", paddingHorizontal:15}}><Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>Hora Final: </Text><Text style={{fontSize: 12, fontFamily:"Poppins_300Light"}}>{booking.leftHour[0]}:{booking.leftHour[1]}</Text></View>
                        </View>
                        <View>
                            <View  style={{flexDirection:"row",alignItems:"baseline", paddingHorizontal:15, paddingTop:5}}><Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>Método de pago:</Text><Text>{booking.payment === "creditcar" ? <><Image source={credicar} style={{width:10, height:10, resizeMode:"contain"}}/>
                                        <Text style={{fontSize: 12
                                    , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>Tarjeta crédito o débito</Text></> : <><Image source={cash} style={{width:10, height:10, resizeMode:"contain"}}/>
                                    <Text style={{fontSize: 12
                                , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>Efectivo</Text></>}</Text></View>
                            <View style={{flexDirection:"row", paddingHorizontal:15, paddingTop:5}}><Text style={{fontSize: 12, fontFamily:"Poppins_700Bold"}}>Total Pagado: </Text><Text style={{fontSize: 12, fontFamily:"Poppins_300Light"}}>{currencyFormat(booking.priceTotal)} COP</Text></View>
                        </View>
                        </View>
                        )
                })}            

        
    </ScrollView>
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
        
    });

export default UserBooking;