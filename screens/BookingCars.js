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
const BookingsCars = () => {
    const navigation1 =useNavigation();
    const dispatch = useDispatch()
    const { cars } = useSelector(
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
    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor:"#f3f5fb"}}>
        <ScrollView contentContainerStyle={{paddingTop:20, paddingHorizontal:20, paddingBottom:10}}>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_700Bold"}}>Tus Reservas</Text>
        
    </ScrollView>
    </SafeAreaView>
    );
};

export default BookingsCars;