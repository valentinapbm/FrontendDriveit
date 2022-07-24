import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity,} from 'react-native';
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
import { SIZES } from '../assets/styles/theme';
import { postRegister } from '../store/reducers/User.reducer';
import { useDispatch, useSelector } from 'react-redux';
import AppLoader from '../components/AppLoader';

const RegisterSesion = () => {
    const navigation =useNavigation();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({email: '', password: '', name:'', lastname:''});
    const [errors, setErrors] = useState({});
    const [value, setValue] = React.useState('client');
    const {loading, errorRegister } = useSelector(
        (state) => state.userReducer
    );
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
    const validate = () => {
        
        let isValid = true;
        if (!inputs.email) {
        handleError('Por favor ingresa tu correo', 'email');
        isValid = false;
        }else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Correo no válido', 'email');
            isValid = false;
        }
        if (!inputs.name) {
            handleError('Por favor ingresa tu nombre', 'name');
            isValid = false;
        }
        if (!inputs.lastname) {
            handleError('Por favor ingresa tu apellido', 'lastname');
            isValid = false;
        }
        if (!inputs.password) {
        handleError('Por favor ingresa tu contraseña', 'password');
        isValid = false;
        }else if (!inputs.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            handleError('La contraseña no cumple con los requisitos', 'password');
            isValid = false;
        }
        if(isValid === true){
            const data ={ 
                name: inputs.name,
                lastname:inputs.lastname,
                email: inputs.email,
                password: inputs.password,
                role: value
            }
            dispatch(postRegister(data))
        }
    };
    const PROP = [
        {
            key: 'client',
            text: 'Quiero alquirar un carro',
            icon: "car"
        },
        {
            key: 'host',
            text: 'Quiero prestar mi carro',
            icon : "car-key",
        },
    ];

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            {loading=== true && <AppLoader></AppLoader>}
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{paddingTop:0, paddingHorizontal:20}}>
                <Text style={{fontSize: 35, fontFamily:"Poppins_700Bold"}}>Registrate</Text>
                <View style={{marginVertical:5}}>
                <Input label="Nombre" placeholder="Ingresa tu nombre" onChangeText={text => handleOnchange(text, 'name')}
                        onFocus={() => handleError(null, 'name')}  error={errors.name} required/>
                <Input label="Apellido" placeholder="Ingresa tu apellido" onChangeText={text => handleOnchange(text, 'lastname')}
                        onFocus={() => handleError(null, 'lastname')}  error={errors.lastname} required/>
                <Input label="Email" iconName="email-outline" placeholder="Ingresa tu correo electrónico" onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}  error={errors.email} required/>
                        {errorRegister === "email already exist" && <Text style={{color:"red",fontFamily:"Poppins_400Regular"}}>Correo ya existe</Text>}
                <Input label="Contraseña" iconName="lock-outline" placeholder="Ingresa tu contraseña" password onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}  error={errors.password} required  newpass/>
                    <View style={style.container}>
                    {PROP.map(res => {
					return (
						<View key={res.key} style={styles.container}>
                            <TouchableOpacity
								onPress={() => {
									setValue(res.key);
								}}>
                                    <View key={res.key} style={styles.containerText}>
							<Text style={styles.radioText}>{res.text}</Text>
                            <Icon name={res.icon} style={{fontSize:22}} ></Icon></View></TouchableOpacity>
							<View style={styles.containerRadio}>
                            <TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									setValue(res.key);
								}}>
                                    {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
                            </View>
						</View>
					);
				})}
                    </View>
                    
                   
                </View>
                <View>

                </View>
            </ScrollView>
 <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Registrate
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
            width:"90%",
            alignItems: 'center',
            justifyContent: 'center',
            padding:15,
            borderRadius: 4,
            backgroundColor: '#072F4A',
            margin:20
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
        container: {
            flex: 1,
            flexDirection:"row",
            alignItems: 'center',
            justifyContent: 'center',
            
        }
    });
    const styles = StyleSheet.create({
        container: {
            width:"40%",
            flexDirection:"column-reverse",
            borderWidth: 0.5,
            marginBottom: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            margin:10,
            borderRadius:10,
            borderColor:"#D3D6D6"
        },
        containerText:{
            flexDirection:"column-reverse",
            alignItems: 'center',
        },
        containerRadio: {
            flex:1,
            width:"100%",
            flexDirection:"column-reverse",
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingTop:5,
            paddingRight:5
        },
        radioText: {
            fontSize: 15,
            color: '#000',
            textAlign:"center",
            fontFamily:"Poppins_300Light"
            
        },
        radioCircle: {
            height: 20,
            width: 20,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#072F4A',
            alignItems: 'center',
            justifyContent: 'center',
        },
        selectedRb: {
            width: 10,
            height: 10,
            borderRadius: 50,
            backgroundColor: '#072F4A',
        },
        result: {
            marginTop: 20,
            color: 'white',
            fontWeight: '600',
            backgroundColor: '#F3FBFE',
        },
    });

export default RegisterSesion;