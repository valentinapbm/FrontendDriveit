import React from "react";
import { View, StyleSheet } from "react-native";
import { HStack,Spinner, Heading } from "native-base";

const AppLoader =()=>{
    return(
        <View style={[StyleSheet.absoluteFillObject, style.container]}>
        <HStack space={8} justifyContent="center">
            <Spinner size="lg" color="#072F4A"/>
    </HStack>
    </View>
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
export default AppLoader;