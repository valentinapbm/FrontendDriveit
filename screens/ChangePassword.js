import React, {useState} from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Image, ImageBackground} from 'react-native';
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
import Toast from 'react-native-root-toast';


const ChangePassword = ({navigation, route}) => {
    const [invalidPass, setInvalidPass] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
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
        if (!inputs.password) {
        handleError('Por favor ingresa su antigua contraseña', 'password');
        isValid = false;
        }
        if (!inputs.newPassword) {
            handleError('Por favor ingresa su nueva contraseña', 'newPassword');
            isValid = false;
        }else if (!inputs.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            handleError('La contraseña no cumple con los requisitos', 'newPassword');
            isValid = false;
        }
        if (!inputs.confirmPassword) {
            handleError('Por favor confirma tu contraseña', 'confirmPassword');
            isValid = false;
        }
        if(inputs.password && inputs.newPassword ){
        if (inputs.password === inputs.newPassword) {
            handleError('Su contraseña no puede ser igual que la anterior', 'newPassword');
            isValid = false;
        }
        if(inputs.confirmPassword && inputs.newPassword ){
            if (inputs.confirmPassword !== inputs.newPassword) {
                handleError('Las contraseñas no coinciden', 'confirmPassword');
                isValid = false;
            }
        }
    }
    if(isValid === true){
            const data ={ 
                password: inputs.password,
                newPassword:inputs.newPassword
            }
            try{
                const token = await AsyncStorage.getItem('token')
                if(token !== null){
                try {
                const data1 = await axios.put(
                    `https://driveit-app.herokuapp.com/users/updatePassword`, 
                    data,
                    {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        
                },
                });
                    
            } catch (err) {
                let toast = Toast.show('Hubo un error', {
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
                if(err.response.data.message === "old password invalid")
                handleError('Contraseña antigua inválida', 'password')
            }
            };
        
        } catch(err){
            let toast = Toast.show('Hubo un error', {
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
        };
    }
    };
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <View style={style.inputContainer}>
            <Text style={{fontSize: 30, paddingBottom:15
            , fontFamily:"Poppins_700Bold"}}>Cambiar contraseña</Text>
            <Input label="Ingresa tu antigua contraseña" iconName="lock-outline" placeholder="Ingresa tu contraseña" password onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')} error={errors.password} required/>
            <Input label="Ingresa tu nueva contraseña" iconName="lock-outline" placeholder="Ingresa tu nueva contraseña" password newpass onChangeText={text => handleOnchange(text, 'newPassword')}
            onFocus={() => handleError(null, 'newPassword')} error={errors.newPassword}  required/>
            <Input label="Confirma tu nueva contraseña" iconName="lock-outline" placeholder="Confirma tu nueva contraseña" password onChangeText={text => handleOnchange(text, 'confirmPassword')}
            onFocus={() => handleError(null, 'confirmPassword')} error={errors.confirmPassword}  required/>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Guardar
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
        fontSize: 25,
    },
});
export default ChangePassword;