import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Input from '../components/Input';
import { SIZES } from '../assets/styles/theme';
import { postLogin } from '../store/reducers/User.reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUser } from '../store/reducers/User.reducer';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import AppLoader from '../components/AppLoader';

const LoginSesion = () => {
    const navigation =useNavigation();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({email: '', password: ''});
    const [errors, setErrors] = useState({});
    const { isLoggedIn, name, role, image, loading, errorLogin } = useSelector(
        (state) => state.userReducer
    );

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold
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
    const validate = () => {
        let isValid = true;
        if (!inputs.email) {
        handleError('Por favor ingresa tu correo', 'email');
        isValid = false;
        }
        if (!inputs.password) {
        handleError('Por favor ingresa tu contraseña', 'password');
        isValid = false;
        }
        if(isValid === true){
            const data ={ 
                email: inputs.email,
                password: inputs.password,
            }
            dispatch(postLogin(data))
        }
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            {loading=== true && <AppLoader></AppLoader>}
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{paddingTop:40, paddingHorizontal:20}}>
                <Text style={{fontSize: 40, fontFamily:"Poppins_700Bold"}}>Iniciar  Sesión</Text>
                <View style={{marginVertical:20}}>
                    <Input label="Email" iconName="email-outline" placeholder="Ingresa tu correo electrónico" onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}  error={errors.email} required/>
                    <Input label="Contraseña" iconName="lock-outline" placeholder="Ingresa tu contraseña" password onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}  error={errors.password} required/>
            {errorLogin === "user or password invalid" &&  <Text style={{color:"red",fontFamily:"Poppins_400Regular"}}>Usuario o contraseña invalidos</Text>}
                    <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Login
                    </Text></TouchableOpacity>
                </View>
            </ScrollView>

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
        details: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 60,

        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        },
        iconContainer: {

        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        },
        detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,

        },
        left:{
            width:"100%",
            alignItems: 'center',
            justifyContent: 'center',
            padding:15,
            borderRadius: 4,
            backgroundColor: '#072F4A',
            marginTop:10
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
    });

export default LoginSesion;