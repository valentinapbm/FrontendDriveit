import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold, Poppins_300Light
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Input from '../components/Input';
import { SIZES } from '../assets/styles/theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteAccount } from '../store/reducers/User.reducer';
import AppLoader from '../components/AppLoader';
const DeleteAccount = () => {
    const navigation =useNavigation();
    const dispatch = useDispatch();
    const {loading } = useSelector(
        (state) => state.userReducer
    );
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold, Poppins_300Light
    });
    if (!fontsLoaded) {
        return null
    }

    const validate = () => {
        
            dispatch(deleteAccount())
        
    };

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            {loading === true && <AppLoader/>}
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <View contentContainerStyle={{paddingTop:40, paddingHorizontal:20}}>
                <View style={{marginVertical:20, marginHorizontal:20}}>
                    <Text style={{fontSize: 40, fontFamily:"Poppins_700Bold"}}>Eliminar Cuenta</Text>

                    <Text style={{fontSize: 20, fontFamily:"Poppins_300Light", marginTop:20}}>Si eliminas tu cuenta, ya no podrás acceder en un futuro y todos tus anuncios y reservas se eliminaran automaticamente</Text>
                    <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Eliminar
                    </Text></TouchableOpacity>
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
            backgroundColor: '#FF6347',
            marginTop:50
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

export default DeleteAccount;