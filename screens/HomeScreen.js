import React,{memo, useState} from 'react';
import {SafeAreaView, Text, View, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import { useSelector} from 'react-redux';
import AppLoader from '../components/AppLoader';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Icon from 'react-native-vector-icons/Ionicons';
import { SIZES } from '../assets/styles/theme';
import InputSearch from '../components/InputSearch';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCars } from '../store/reducers/Car.reducer';
import CarHomeCard from '../components/CarHomeCard';
import Foto from "../assets/images/filter.png"
import { Center, VStack,Skeleton } from 'native-base';
const Options = 
[{name:"Audi", image:"https://i.pinimg.com/originals/8a/ee/cd/8aeecd7493f0f51bd697f935a0588268.png"}, 
{name:"BMW", image:"http://assets.stickpng.com/images/580b57fcd9996e24bc43c46e.png"},
{name:"Chevrolet", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Chevrolet-logo.png/2560px-Chevrolet-logo.png"}, 
{name:"Ford", image:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Ford-Motor-Company-Logo.png"}, 
{name:"Hyundai", image:"http://assets.stickpng.com/images/580b57fcd9996e24bc43c482.png"}, 
{name:"Kia", image:"https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.png"},
{name:"Mazda", image:"https://marcas-logos.net/wp-content/uploads/2020/03/Mazda_logo.png"}, 
{name:"Mercedes-Benz", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png"}, 
{name:"Renault", image:"https://seeklogo.com/images/R/renault-logo-18DB8E9AE7-seeklogo.com.png"}, 
{name:"Toyota", image:"http://assets.stickpng.com/images/580b57fcd9996e24bc43c4a3.png"}, 
]


const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const { loadingCars, cars } = useSelector(
        (state) => state.carReducer
    );


    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });

    if (!fontsLoaded) {
        return null
    }


    const list = (
        <>
        <View style={style.location}>
            <View style={style.locationIcon}>
                <Icon name='ios-location-sharp' size={25} color="lightgrey"/>
            </View>
            <View style={style.locationText}>
            <Text style={{marginTop: 2, color: "grey", fontSize: 13, fontFamily:"Poppins_300Light"}}>Tu ubicación</Text>
            <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color:"black", paddingTop:1}}>Cali, Colombia</Text>
            </View>
            <View style={style.locationIcon}>
                <Icon name='person'/>
            </View>
        </View>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_300Light", paddingLeft:20, paddingVertical:20}}>Encuentra tu vehículo favorito.</Text>
        <View style={style.body}>
            <View style={style.input}>
                <InputSearch   placeholder="Busca tu vehículo por marca"/>
            </View>
        <View style={{paddingTop:70, width:"100%"}}>
        <View style={{width:"100%", flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between", alignItems:"center"}}>
        <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold"}}>Top marcas</Text>
        <TouchableOpacity><Text style={{fontSize: 15, fontFamily:"Poppins_600SemiBold", color:"#5297ff"}}>Ver todas</Text></TouchableOpacity>
        </View>
            <ScrollView horizontal={true} style={{width:"100%", padding:0}} showsHorizontalScrollIndicator={false}>
            {
                Options.map((name, key)=>{
                    return(
                    <TouchableOpacity style={style.locationIcon1} key={key}>
                        <Image
                            style={{ height: "95%", width:"95%"}}
                            source={{ uri: name.image }}
                            resizeMode="contain"
            
                        />
                    </TouchableOpacity>)

                })
            }

            </ScrollView>


        </View>
        <View style={style.location2}>
            <TouchableOpacity style={style.locationIcon2}>
                <Image source={Foto} style={{width:"90%", height:"90%"}}/>
            </TouchableOpacity>
            <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", color:"#072F4A"}}>Filtros de búsqueda</Text>
        </View>
        {loadingCars === true && 
            <Center w="100%">
                <VStack w="90%" maxW="400" space={8} overflow="hidden" rounded="md" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }}>
                        <Skeleton h="250" />
                        <Skeleton h="250" />
                    </VStack>
            </Center>}
            {loadingCars === false && cars.length > 0 &&
                cars.map((car,index)=>(
                    <TouchableOpacity key={index} style={{backgroundColor:"white", elevation:2, margin:20, borderRadius:15}} onPress={()=> {navigation.navigate("DetailsScreen", {itemId: car._id})}} >
                        <CarHomeCard car={car} screenHome/>
                    </TouchableOpacity>
                ))}
                    
        </View>
        
        
        </>
    )

    return (
        <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#f3f5fb"}}>
        <FlatList ListFooterComponent={list} contentContainerStyle={{paddingTop:30,  paddingBottom:100}} initialNumToRender={5} nestedScrollEnabled={true} removeClippedSubviews={true}/>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    location:{
        flexDirection:"row", 
        padding:20,
        alignItems: 'center',
        width:SIZES.width,
        justifyContent:"space-between",
        height:SIZES.height/8
    },
    locationIcon:{
        width:"15%",
        height:"90%",
        backgroundColor:"white",
        elevation:1,
        borderRadius:15,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    locationText:{
        width:"65%",

    },

    body:{
        width:SIZES.width,
        backgroundColor:"white",
        borderTopEndRadius:25,
        borderTopStartRadius:25,
        marginTop:10
    },
    input:{
        width:"80%",
        alignSelf:"center",
        position:"absolute",
        top:-20,
        zIndex: 1,
    },
    locationIcon1:{
        width:60,
        height:60,
        backgroundColor:"white",
        elevation:2,
        borderRadius:15,
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical:5,
        marginLeft:20
    },
    locationIcon2:{
        width:"10%",
        height:"60%",
        backgroundColor:"white",
        borderRadius:5,
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight:10,
    },
    location2:{
        flexDirection:"row", 
        alignItems: 'center',
        width:SIZES.width,
        height:SIZES.height/12,
        paddingHorizontal:20,
        marginTop:10
    },
})

export default HomeScreen;