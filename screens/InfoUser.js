import React, {useState} from 'react';
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
import UsernoPhoto from "../assets/Userphoto.png"

const InfoUser = ({navigation, route}) => {

    const {userName, userlastName, userEmail, userImage}= route.params
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <View style={style.inputContainer}>
            <Text style={{fontSize: 20, fontFamily:"Poppins_700Bold", textAlign:"center", paddingTop:10}}>Información del contacto</Text>
            <View style={{alignItems:"center", padding:10}}>
            <Image source={userImage ?{uri:userImage}: UsernoPhoto} style={{width:80, height:80, borderRadius:50}}/>
            <Text style={{fontSize: 20, fontFamily:"Poppins_400Regular", textAlign:"center", paddingTop:10}}>{userName} {userlastName}</Text>
            <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", textAlign:"center", paddingTop:10}}>Correo electrónico: {userEmail}</Text>
            </View>
            </View>
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
        backgroundColor: "#f3f5fb",
        marginVertical:10,
        marginHorizontal:20,
        borderRadius:15,
    },
});
export default InfoUser;