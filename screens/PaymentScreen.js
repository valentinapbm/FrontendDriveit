import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Modal, FlatList, Image} from 'react-native';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { getUser } from '../store/reducers/User.reducer';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, DefaultTheme, Provider as PaperProvider,  TextInput, TouchableRipple } from 'react-native-paper';
// e.g in your index.js
import {
    registerTranslation,
  } from 'react-native-paper-dates'
  registerTranslation("pl", {
    save: 'Confirmar',
    selectSingle: 'Select date',
    selectMultiple: 'Select dates',
    selectRange: 'Selecciona las fechas',
    notAccordingToDateFormat: (inputFormat) =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'Day is not allowed',
    previous: 'Previous',
    next: 'Next',
    typeInDate: 'Type in date',
    pickDateFromCalendar: 'Pick date from calendar',
    close: 'Close',
    })

import { DatePickerModal } from 'react-native-paper-dates';
import { useTheme } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates'
import BottomSheet from '@gorhom/bottom-sheet';
import credicar from "../assets/images/credit.png"
import cash from "../assets/images/cash.png"
import StripeApp from '../components/StripeApp';
import { StripeProvider } from '@stripe/stripe-react-native';
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#072F4A',
        accent: '#ff1744',
    },
    };

const PaymentScreen = ({navigation, route}) => {
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const[dates, setDates]=useState({ startDate: undefined, endDate: undefined })
    const [dateTextIn, setDateTextIn]=useState("Fecha Inicial")
    const [dateTextOut, setDateTextOut]=useState("Fecha Final")
    const [hours, setHours]= useState({hours:10, minutes:30})
    const [hoursOut, setHoursOut]= useState({hours:17, minutes:30})
    const [open, setOpen] = React.useState(false);
    const [visible, setVisible] = React.useState(false)
    const [visible1, setVisible1] = React.useState(false)
    const [modal, setModal] = useState(false)
    const [paymentMethod, setPaymentMethod]=useState("Selecciona una opción")
    const [index, setIndex]=useState(-1)
    const {carId, carPrice}=route.params
    const [errors, setErrors] = useState({});
    const [totalPrice, setTotalPrice]= useState(0);

    function getDates(startDate, endDate) {
      const dates = [];
      let currentDate = startDate;
      const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      return dates;
    }
    
    
    

    const onDismiss = React.useCallback(() => {
        setOpen(false);
      }, [setOpen]);

      function subtractDays(numOfDays, date = new Date()) {
        date.setDate(date.getDate() - numOfDays);
      
        return date;
      }
      function addctDays(numOfDays, date = new Date()) {
        date.setDate(date.getDate() + numOfDays);
      
        return date;
      }
      const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {

          setOpen(false);
          const endate= subtractDays(1, new Date(endDate))
          setRange({ startDate:startDate, endDate });
          setDates({startDate:startDate, endDate:endate})
          setDateTextIn(`${startDate.toLocaleDateString()}`)
          setDateTextOut(`${endDate.toLocaleDateString()}`)
          const datesTotal = getDates(startDate, endDate)
          const pric = Number(carPrice)*Number(datesTotal.length)
          setTotalPrice(Number(carPrice)*Number(datesTotal.length))
        },
        [setOpen, setRange]
      );
      const onDismiss1 = React.useCallback(() => {
        setVisible(false)
      }, [setVisible])
    
      const onConfirm1 = React.useCallback(
        ({ hours, minutes }) => {
          setVisible(false);
          setHours({ hours, minutes });
        },
        [setVisible]
      );

      const onDismiss2 = React.useCallback(() => {
        setVisible1(false)
      }, [setVisible1])
    
      const onConfirm2 = React.useCallback(
        ({ hours, minutes }) => {
          setVisible1(false);
          setHoursOut({ hours, minutes });
        },
        [setVisible1]
      );

      // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

 // callbacks
 const handleSheetChanges = useCallback((index) => {
    setIndex(0)
  }, []);
      
  async function validate () {
    
    const data ={
      carId: carId,
      startDate: dates.startDate,
      endDate: dates.endDate,
      pickupHour: Object.values(hours),
      leftHour: Object.values(hoursOut),
      priceTotal: totalPrice,
      payment: "cash",
      statusBooking:"Active"
    }
    console.log(data)

    try{
        const token = await AsyncStorage.getItem('token')
        if(token !== null){
        try {
        const data1 = await axios.post(
            `https://driveit-app.herokuapp.com/bookings/create/`, 
            data,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                
        },
        });

            console.log("respuesta",data1)
            
    } catch (err) {
        console.log(err.response)
    }
    };

} catch(err){
    console.log(err.response)
};
}

function currencyFormat(num) {
  return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}


      const list = (
        <>
        <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_700Bold"}}>Crear reserva</Text>
        <View style={style.containertop}>
        <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingBottom:10}}>Agrega las fechas  <Text style={{color:"red"}}>*</Text></Text>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity style={[style.input,{
                borderColor: "white",
                alignItems: 'center',
                borderWidth:0.5,
                width:"45%"
            },
            ]}  onPress={() => setOpen(true)}>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}><Icon name="calendar" size={15}/> {dateTextIn}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[style.input,{
                borderColor: "white",
                alignItems: 'center',
                borderWidth:0.5,
                width:"45%", 
            },
            ]}  onPress={() => setOpen(true)}>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}><Icon name="calendar" size={15}/> {dateTextOut}</Text>
            </TouchableOpacity>
            </View>
            
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <View style={{flexDirection:"column", width:"45%"}}>
                <Text style={{fontSize: 14
                        , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}><Icon name="clock-outline" size={15}/> Hora Inicio:</Text>
                    <TouchableOpacity style={[style.input,{
                            borderColor: "white",
                            alignItems: 'center',
                            borderWidth:0.5,
                            width:"100%"
                        },
                        ]}  onPress={()=> setVisible(true)}>
                            <Text style={{fontSize: 14
                        , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>{hours.hours}:{hours.minutes}</Text>
                    </TouchableOpacity>
            </View>
            <View style={{flexDirection:"column", width:"45%"}}>
                <Text style={{fontSize: 14
                        , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}><Icon name="clock-outline" size={15}/>  Hora Final:</Text>
                    <TouchableOpacity style={[style.input,{
                            borderColor: "white",
                            alignItems: 'center',
                            borderWidth:0.5,
                            
                        },
                        ]}  onPress={()=> setVisible1(true)}>
                            <Text style={{fontSize: 14
                        , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>{hoursOut.hours}:{hoursOut.minutes}</Text>
                    </TouchableOpacity>
            </View>
            </View>
        </View>
        
        <View style={style.containertop}>
        <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingBottom:10}}>Agrega un método de pago<Text style={{color:"red"}}>*</Text></Text>
            <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
        <TouchableOpacity style={[style.inputpayment,{
                borderColor: "#072F4A",
                alignItems: 'center',
                borderWidth:1,
                width:"100%"
            },
            ]} onPress={handleSheetChanges} >
                {paymentMethod === "Selecciona una opción" && 
                <Text style={{fontSize: 14
                , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>{paymentMethod}</Text>}
                {paymentMethod === "credit" && <><Image source={credicar} style={{width:20, height:20, resizeMode:"contain"}}/>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>Tarjeta crédito o débito</Text></>}
                {paymentMethod === "cash" && <><Image source={cash} style={{width:20, height:20, resizeMode:"contain"}}/>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>Efectivo</Text></>}
            </TouchableOpacity>
            
            </View>
            {paymentMethod === "credit" && 
            <StripeProvider  publishableKey={"pk_test_51LORjaDDc38cnPECodUdlLugrM3eyGGbrzx2MbODPDUiItwRATvcpDfhhWD1xpU1GzncfPJZca8ReJHT9s4Iwd8S00pJRK7bqW"}>
                <StripeApp price={carPrice}/>  
                </StripeProvider>
                }
            
            {paymentMethod === "Selecciona una opción" && 
            <TouchableOpacity style={[style.inputdisabled,{
                            borderColor: "white",
                            alignItems: 'center',
                            borderWidth:0.5,
                            marginTop:15,
                            marginBottom:15,
                            flexDirection:"row"
                            
                        },
                        ]}  >
                            <Text style={{color: "white",
            fontFamily:"Poppins_700Bold",
            fontSize: 15,}}>Pago Total </Text> 
            {dateTextIn !== "Fecha Inicial" && dateTextOut !== "Fecha Final" &&
            <Text style={{color: "white",
            fontFamily:"Poppins_300Light",
            fontSize: 15,}}>| {currencyFormat(totalPrice)}</Text>}
              </TouchableOpacity>}
              {paymentMethod === "cash" && 
            <TouchableOpacity style={[style.inputabled,{
                            borderColor: "white",
                            alignItems: 'center',
                            borderWidth:0.5,
                            marginTop:15,
                            marginBottom:15,
                            flexDirection:"row"
                            
                        },
                        ]} onPress={validate} >
                            <Text style={{color: "white",
            fontFamily:"Poppins_700Bold",
            fontSize: 15,}}>Pago Total </Text> 
            {dateTextIn !== "Fecha Inicial" && dateTextOut !== "Fecha Final" &&
            <Text style={{color: "white",
            fontFamily:"Poppins_300Light",
            fontSize: 15,}}>| {currencyFormat(totalPrice)}</Text>}
              </TouchableOpacity>}
              
        </View>


        <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    
        <PaperProvider theme={theme}>
        <DatePickerModal
        locale="pl"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
      
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        //   disabledDates: [new Date()] // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // uppercase={false} // optional, default is true
        label="Select period" // optional
        startLabel="From" // optional
        // endLabel="To" // optional
        animationType="slide" // optional, default is slide on ios/android and none on web
        />
                <TimePickerModal
        visible={visible}
        onDismiss={onDismiss1}
        onConfirm={onConfirm1}
        hours={hours.hours} // default: current hours
        minutes={hours.minutes} // default: current minutes
        label="Select time" // optional, default 'Select time'
        uppercase={false} // optional, default is true
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale="en" // optional, default is automically detected by your system
      />
      <TimePickerModal
        visible={visible1}
        onDismiss={onDismiss2}
        onConfirm={onConfirm2}
        hours={hoursOut.hours} // default: current hours
        minutes={hoursOut.minutes} // default: current minutes
        label="Select time" // optional, default 'Select time'
        uppercase={false} // optional, default is true
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale="en" // optional, default is automically detected by your system
      />
        </PaperProvider>

        </View>
        
        
        </>)
    return (
        
        <SafeAreaView
        style={{flex: 1, backgroundColor:"#f3f5fb"}}>
            
        <FlatList keyboardShouldPersistTaps='handled' ListFooterComponent={list} contentContainerStyle={{paddingTop:60, paddingHorizontal:20, paddingBottom:100}}></FlatList>
        <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={()=>setIndex(-1)}
        backgroundStyle={{backgroundColor:"#83B8D9"}}
        >
        
        <TouchableOpacity style={[style.inputpayment,{
                borderColor: paymentMethod === "credit" ? 
                "#072F4A" : "white",
                alignItems: 'center',
                borderWidth:1,
                width:"90%",
                margin:20
            },
            ]} onPress={()=>(setPaymentMethod("credit") ,
            setIndex(-1))} >
                <Image source={credicar} style={{width:20, height:20, resizeMode:"contain"}}/>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>Tarjeta crédito o débito</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[style.inputpayment,{
                borderColor: paymentMethod === "cash" ? 
                "#072F4A" : "white",
                alignItems: 'center',
                width:"90%",
                margin:20,
                borderWidth:1,
            },
            ]}onPress={()=>(setPaymentMethod("cash") ,
            setIndex(-1))} >
                <Image source={cash} style={{width:20, height:20, resizeMode:"contain"}}/>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"grey", paddingLeft:10}}>Efectivo</Text>
            </TouchableOpacity>
        
      </BottomSheet>

        </SafeAreaView>
        
    );
};
const style = StyleSheet.create({
    containertop: {
    padding:10,
    flexDirection: 'column',
    justifyContent:"center",
    marginHorizontal: 1,
    backgroundColor:"white",
    elevation:1,
    borderRadius:10, 
    marginBottom:15,
    paddingLeft:15,
    paddingRight:15
    },
    input:{
        height: 55,
        backgroundColor: "#F3F4FB",
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems:"center",
        borderRadius:10,
        marginBottom:10,
        fontFamily:"Poppins_300Light", 
        paddingLeft:10,
        fontSize:15,
        },
    container: {
        flexDirection:"row",
        justifyContent:"flex-start",
        flexWrap:"wrap",
        margin:5
    },
    inputpayment:{
        backgroundColor: "white",
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems:"center",
        borderRadius:10,
        marginBottom:10,
        fontFamily:"Poppins_300Light", 
        padding:20,
        fontSize:15,
        },
        inputdisabled:{
          width:"100%",
          alignItems: 'center',
          justifyContent: 'center',
          padding:15,
          borderRadius: 4,
          backgroundColor: '#A9A9A9',
          },
            inputabled:{
              width:"100%",
              alignItems: 'center',
              justifyContent: 'center',
              padding:15,
              borderRadius: 4,
              backgroundColor: '#072F4A',
          },
  
})


export default PaymentScreen;