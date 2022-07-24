import React, {useState, useRef} from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Image, ImageBackground, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Input from '../components/Input';
import * as RootNavigation from "../components/RootNavigation"
import Toast from 'react-native-root-toast';
import AppLoader from '../components/AppLoader';

const VerifyToken = ({navigation, route}) => {
    const [invalidPass, setInvalidPass] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading]= useState(false);
    const{ email, token}=route.params
    const [tokenchange, setTokenChange]=useState(token)
    console.log(email)
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
    console.log(Object.values(otp).join("") === token)
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    
const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const validate = async() => {
        
        let isValid = true;
        if (Number(Object.values(otp).join("") !== Number(tokenchange))){
        setErrors("Lo sentimos, el token que ha ingresado es inválido");
        isValid = false;
        }
        if(Number(Object.values(otp).join("")) === Number(tokenchange)){
            console.log("qapasamen")
            RootNavigation.navigate('ResetPassword', { usermail:email });
        }
        
    };



    const resend = async ()=>{
        const data ={ 
            email:email
        }
        setLoading(true)
            try {
            const data1 = await axios.post(
                `https://driveit-app.herokuapp.com/users/recoverypass`, 
                data                
            );
                console.log("respuesta",data1)
                setLoading(false)
                setTokenChange(data1.data.data)
                let toast = Toast.show('Correo reenviado', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: false,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor:"#C1C0C9",
                    textColor:"#000",
                    opacity:0.8,
                    delay: 0,
                });

                // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                setTimeout(function () {
                    Toast.hide(toast);
                }, 2000);
        } catch (err) {
            console.log(err.response)
            setLoading(false)
            let toast = Toast.show('Ocurrió un error', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: false,
                animation: true,
                hideOnPress: true,
                backgroundColor:"#C1C0C9",
                textColor:"#000",
                opacity:0.8,
                delay: 0,
            });

            // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
            setTimeout(function () {
                Toast.hide(toast);
            }, 2000);
        }
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            {loading === true && <AppLoader/>}
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <View style={style.inputContainer}>
            <Text style={{fontSize: 30
            , fontFamily:"Poppins_700Bold"}}>Verificar el token</Text>
            <View>
            <Text style={{fontSize: 15
            , fontFamily:"Poppins_300Light"}}>Ingresa el token que te enviamos al correo</Text>
            <Text style={{fontSize: 15, paddingBottom:15
                , fontFamily:"Poppins_700Bold"}}> {email} </Text>
            </View>
            </View>
            <View style={style.otpContainer}>
        <View style={style.otpBox}>
          <TextInput
            style={style.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
              setErrors("")
            }}
          />
        </View>
        <View style={style.otpBox}>
          <TextInput
            style={style.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
              setErrors("")
            }}
          />
        </View>
        <View style={style.otpBox}>
          <TextInput
            style={style.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
              setErrors("")
            }}
          />
        </View>
        <View style={style.otpBox}>
          <TextInput
            style={style.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
                setOtp({...otp, 4: text});
                !text && thirdInput.current.focus();
                setErrors("")
            }}
            />
        </View>
        
        </View>
        {errors !== "" &&  <Text style={{fontSize: 17, fontFamily:"Poppins_300Light", color:"red", paddingHorizontal:25, paddingTop:25,}}>{errors}</Text>}
        <View style={{paddingHorizontal:25, paddingTop:25, flexDirection:"row"}}>
            <Text style={{fontSize: 15
            , fontFamily:"Poppins_300Light"}}>No recibiste ninguón código?</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={resend}>
            <Text style={{fontSize: 15, paddingBottom:15
                , fontFamily:"Poppins_700Bold"}}>  Reenviar</Text></TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Confirmar
            </Text></TouchableOpacity>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    header: {
    paddingTop:40,
    paddingBottom:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    },
    inputContainer: {
        marginVertical:10,        marginHorizontal:25,

    },
    left:{
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        borderRadius: 4,
        backgroundColor: '#072F4A',
        margin:25
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
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
      },
      otpBox: {
        borderRadius: 5,
        borderWidth: 0.5,
      },
      otpText: {
        fontSize: 25,
        color: "black",
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
      },
      textLeft2:
      {
          paddingTop:10,
          color: "#072F4A",
          fontFamily:"Poppins_700Bold",
          fontSize:20,
      },
});
export default VerifyToken;