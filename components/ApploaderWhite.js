import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { HStack,Spinner, Heading } from "native-base";
import LottieView from 'lottie-react-native';

const ApploaderWhite =()=>{
    return(
        <>
        <LottieView source={require('../assets/88956-carloadinganimation.json')} autoPlay loop />
        </>
    )
}
const style = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.3)",
        zIndex:1
        },
    });
export default ApploaderWhite;