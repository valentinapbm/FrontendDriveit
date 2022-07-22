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
import AppLoader from '../components/AppLoader';
import { SIZES } from '../assets/styles/theme';
import UsernoPhoto from "../assets/Userphoto.png"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../store/reducers/User.reducer';


const ProfileUser = () => {
  
    const navigation1 =useNavigation();
    const dispatch = useDispatch()
    const { isLoggedIn, name, lastname, role, image, email } = useSelector(
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
    const handleSignOut = () => {
        dispatch(signOutSuccess());
      };
    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor:"#f3f5fb"}}>
        <ScrollView contentContainerStyle={{paddingTop:60, paddingHorizontal:20, paddingBottom:10}}>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_700Bold"}}>Perfil</Text>
        <View style={style.containertop}>
           
                <Image source={image  ? {uri:image} : UsernoPhoto} style={style.logo}/>
            <Text style={{fontSize: 25
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>{name} {lastname}</Text>
            <Text style={{fontSize: 15
            , fontFamily:"Poppins_300Light", color:"#696969"}}>{email}</Text>
        </View>
        <View style={style.containertop1}>

        <TouchableOpacity style={{flex:1, flexDirection:"row", paddingTop:5, paddingHorizontal:15, justifyContent:"space-between", alignItems:"center", marginBottom:5}} onPress={() => navigation1.navigate('EditProfileUser')}>
            <View style={{flexDirection:"row"}}>
                <View style={style.styleicon}>
                    <Icon name='account-edit-outline'size={28} color="white"/> 
                </View>
                <View style={{flex:1, flexDirection:"column", paddingLeft:5, justifyContent:"center", }}>
                <Text style={{fontSize: 15
            , fontFamily:"Poppins_600SemiBold", color:"#696969"}}>Editar tu perfil</Text>
            <Text style={{fontSize: 12
            , fontFamily:"Poppins_300Light", color:"#696969"}}>Configura tus datos personales</Text>
                </View>
            </View>
                <Icon1 name="arrow-forward-ios" size={17} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, flexDirection:"row", padding:5, justifyContent:"space-between", alignItems:"center", marginBottom:5, paddingHorizontal:15}}>
            <View style={{flexDirection:"row"}}>
                <View style={style.styleicon}>
                    <Icon1 name='settings'size={28} color="white"/> 
                </View>
                <View style={{flex:1, flexDirection:"column", paddingLeft:5, justifyContent:"center", }}>
                <Text style={{fontSize: 15
            , fontFamily:"Poppins_600SemiBold", color:"#696969"}}>Cambiar contraseña</Text>
            <Text style={{fontSize: 12
            , fontFamily:"Poppins_300Light", color:"#696969"}}>Configura tu contraseña</Text>
                </View>
            </View>
            <View>
                <Icon1 name="arrow-forward-ios" size={17} />
            </View>
        </TouchableOpacity>
        </View>

        <View style={style.containertop1}>

        <TouchableOpacity onPress={handleSignOut} style={{flex:1, flexDirection:"row", paddingTop:5, paddingHorizontal:15, justifyContent:"space-between", alignItems:"center", marginBottom:5}}>
            <View style={{flexDirection:"row"}}>
                <View style={style.styleicon1}>
                    <Icon name='logout'size={28} color="white"/> 
                </View>
                <View style={{flex:1, flexDirection:"column", paddingLeft:5, justifyContent:"center", }}>
                <Text style={{fontSize: 15
            , fontFamily:"Poppins_600SemiBold", color:"#696969"}}>Cerrar Sesión</Text>
                </View>
            </View>
                <Icon1 name="arrow-forward-ios" size={17} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, flexDirection:"row", padding:5, justifyContent:"space-between", alignItems:"center",paddingHorizontal:15}} onPress={() => navigation1.navigate('DeleteAccount')}>
            <View style={{flexDirection:"row"}}>
                <View style={style.styleicon2}>
                    <Icon name='trash-can-outline'size={28} color="red"/> 
                </View>
                <View style={{flex:1, flexDirection:"column", paddingLeft:5, justifyContent:"center", }}>
                <Text style={{fontSize: 15
            , fontFamily:"Poppins_600SemiBold", color:"#696969"}}>Eliminar cuenta</Text>
                </View>
            </View>
            <View>
                <Icon1 name="arrow-forward-ios" size={17} />
            </View>
        </TouchableOpacity>
        </View>

        </ScrollView>
        </SafeAreaView>
    );

};
const style = StyleSheet.create({
    containertop: {
    padding:10,
    flexDirection: 'column',
    justifyContent:"center",
    alignItems: 'center',
    marginHorizontal: 1,
    backgroundColor:"white",
    elevation:1,
    borderRadius:10
    },
    containertop1: {
        padding:10,
        flexDirection: 'column',
        justifyContent:"center",
        alignItems: 'center',
        marginHorizontal: 1,
        backgroundColor:"white",
        elevation:1,
        borderRadius:10,
        marginTop:10
        },
    logo:{
        width: 100,
        height: 100,
        borderRadius:50
    },
    styleicon:{
        width: 50,
        height: 50,
        backgroundColor:"#E3DCF6",
        borderRadius:50,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    styleicon1:{
        width: 50,
        height: 50,
        backgroundColor:"#FFCBCB",
        borderRadius:50,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    },
    styleicon2:{
        width: 50,
        height: 50,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        textAlign:"center"
    }
})

export default ProfileUser;