import React, {useState} from 'react';
import axios from "axios";
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Image, ImageBackground} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Input from '../components/Input';
import * as RootNavigation from "../components/RootNavigation"
import AppLoader from '../components/AppLoader';
import Toast from 'react-native-root-toast';
const RecoveryPassword = ({navigation, route}) => {
    const [invalidPass, setInvalidPass] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading]= useState(false);

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
        if (!inputs) {
        handleError('Por favor ingresa su correo', 'email');
        isValid = false;
        }
    if(isValid === true){
            const data ={ 
                email:inputs
            }   
            setLoading(true)
                try {
                const data1 = await axios.post(
                    `https://driveit-app.herokuapp.com/users/recoverypass`, 
                    data                
                );
                    setLoading(false)
                    RootNavigation.navigate('VerifyToken', {token: data1.data.data, email:inputs});

            } catch (err) {
                let toast = Toast.show('Huboun error', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: false,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor:"#C1C0C9",
                    textColor:"#000",
                    opacity:0.8,
                    delay: 0,
                    onShow: () => {
                        // calls on toast\`s appear animation start
                    },
                    onShown: () => {
                        // calls on toast\`s appear animation end.
                    },
                    onHide: () => {
                        // calls on toast\`s hide animation start.
                    },
                    onHidden: () => {
                        // calls on toast\`s hide animation end.
                    }
                });
          
                // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                setTimeout(function () {
                    Toast.hide(toast);
                }, 2000);
                setLoading(false)
                if(err.response.data.message === "Email not found")
                handleError('No se encontró ninguna cuenta con el correo', 'email')
            }
            };
        
    };
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
            <Text style={{fontSize: 30, paddingBottom:15
            , fontFamily:"Poppins_700Bold"}}>Encuentra tu correo</Text>
            <Input label="Email" iconName="email-outline" placeholder="Ingresa tu correo electrónico" onChangeText={text => setInputs(text)}
            onFocus={() => handleError(null, 'email')}  error={errors.email} required/>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Buscar
            </Text></TouchableOpacity>
        </SafeAreaView>
    );
};
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
});
export default RecoveryPassword;