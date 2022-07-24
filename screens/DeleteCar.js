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
import { SIZES } from '../assets/styles/theme';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppLoader from '../components/AppLoader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-root-toast';
 import * as RootNavigation from "../components/RootNavigation"
 import axios from 'axios';
import { getUser } from '../store/reducers/User.reducer';
import { getCars } from '../store/reducers/Car.reducer';



const DeleteCar = ({route, navigation}) => {
    const dispatch = useDispatch();
    const [loading, setLoading]= useState(false);
    const {car}=route.params;
    
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold, Poppins_300Light
    });
    if (!fontsLoaded) {
        return null
    }

    const validate = async () => {
        
        try{
            const token = await AsyncStorage.getItem('token')
            if(token !== null){
            setLoading(true)
            try {
            const data1 = await axios.delete(
                `https://driveit-app.herokuapp.com/cars/delete/${car._id}`, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
            },
            });

                let toast = Toast.show('Se eliminó tu anuncio', {
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
                setLoading(false)
                dispatch(getUser())
                dispatch(getCars())
                RootNavigation.navigate("CarsHost")
                
        } catch (err) {
            
            setLoading(false)
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
            });

            // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
            setTimeout(function () {
                Toast.hide(toast);
            }, 2000);
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
                    <Text style={{fontSize: 40, fontFamily:"Poppins_700Bold"}}>Eliminar Anuncio</Text>

                    <Text style={{fontSize: 20, fontFamily:"Poppins_300Light", marginTop:20}}>¿Estás seguro(a) de eliminar este anuncio?</Text>
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

export default DeleteCar;