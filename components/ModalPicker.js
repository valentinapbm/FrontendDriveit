import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Modal} from 'react-native';
import { SIZES } from '../assets/styles/theme';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
    import { useFonts } from "expo-font";

const ModalPicker = (props) => {
    
    const Options = ["Audi", "BMW", "Chevrolet", "Citroen", "Daihatsu", "Dodge", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Kia","Mazda", "Mercedes-Benz", "MINI", "Mitsubishi Motors", "Nissan", "Peugeot", "Porsche", "Renault", "Seat", "Skoda", "SSangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]


    const onPressItem=(option)=>{
        props.changeModalVisibility(false);
        props.setData(option)

    }
    
    const option= props.Options.map((item, index)=>{
        return(
            <TouchableOpacity key={index} style={style.option} onPress={()=> onPressItem(item)}>

                <Text style={style.text}>{item}</Text>
        </TouchableOpacity>
        )
    })
    
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }
    return (
    
        <TouchableOpacity style={style.input} onPress={()=> props.changeModalVisibility(false)}>
                <View style={style.modal}>
                <ScrollView>
                    {option}
                </ScrollView>

                </View>
        </TouchableOpacity>
    );

};
const style = StyleSheet.create({

        input:{
            flex:1,
            alignItems:"center",
            justifyContent:"center"

        },
        modal:{
            backgroundColor:"#fff",
            borderRadius:10,
            width:SIZES.width -40,
            height:SIZES.height/1.5,
            elevation:1
        },
        option:{
            alignItems:"flex-start",

        },
        text:{
            width:"100%",
            fontSize:15,
            fontFamily:"Poppins_400Regular",
            borderBottomWidth:0.2,
            padding:20,
            borderColor:"#C8C8C8"

        }
    
})

export default ModalPicker;