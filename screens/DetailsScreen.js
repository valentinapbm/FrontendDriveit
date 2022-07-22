import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import { SIZES } from '../assets/styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getCarsbyId } from '../store/reducers/Car.reducer';
import Carrousel from '../components/Carrousel';
import ApploaderWhite from '../components/ApploaderWhite';
import MapView, { Marker } from "react-native-maps"
import photo from "../assets/Userphoto.png"
const DetailsScreen = ({ route, navigation }) => {
    const {itemId} = route.params;
    const { carData, loadingCar } = useSelector(
        (state) => state.carReducer
    );

    const [ region, setRegion ] = React.useState({
		latitude: carData.lat,
		longitude: carData.lng,
        latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	})
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCarsbyId(itemId));
        
    }, []);
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    function currencyFormat(num) {
        return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    if (!fontsLoaded) {
        return null
    }
    if(loadingCar === true){
        return (<ApploaderWhite/>)
    } else{
    const list = (
        <>
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row", paddingLeft:20}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <View style={style.body}>
                <Carrousel data={carData.images} screenDetail/>
            </View>
            <View style={{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between", paddingVertical:5, alignItems:"center", backgroundColor:"white"}}>
                <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color: "#100f42"}}>{carData.brand} {carData.model}</Text>
                <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", color: "grey"}}>{carData.transmision === "automatic" ? "Automática" : carData.transmision ==="mecanic" ? "Mecánica" : "Automática Secuencial"  }</Text>
            </View>
            <View style={{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between", marginBottom:15, backgroundColor:"white"}}>
                {carData.reviews.length === 0 &&  <Text style={{fontSize: 15, fontFamily:"Poppins_600SemiBold", color: "grey"}}><Icon name="star" color="#f2b01e"/> Nuevo</Text>}
                {carData.reviews.length > 0 && <Text style={{fontSize: 15, fontFamily:"Poppins_600SemiBold", color: "grey"}}><Icon name="star" color="#f2b01e"/> 4.9</Text>}
                <Text style={{fontSize: 15, fontFamily:"Poppins_400Regular", color: "#100f42"}}>{currencyFormat(carData.price)}<Text style={{fontSize: 14, fontFamily:"Poppins_400Regular", color: "grey"}}>/día</Text></Text>
            </View>
            <View style={{flexDirection:"row", paddingVertical:5, alignItems:"center", backgroundColor:"white", borderTopWidth:0.5, borderBottomWidth:0.5, height:90, borderColor:"#D3D6D6", marginHorizontal:15}}>
                <Image source={carData.userId.image ? {uri:carData.userId.image} : photo} style={{width:60, height:60, borderRadius:15}}/>
                <View style={{paddingLeft:20}}>
                <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color: "#100f42"}}>{carData.userId.name}</Text>
                <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", color: "#100f42"}}>Rentador</Text>
                </View>
            </View>
            <View style={{paddingVertical:5, backgroundColor:"white", marginHorizontal:20, marginHorizontal:15}}>
                <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color: "#100f42"}}>Especificaciones</Text>
                <View style={{flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap",borderBottomWidth:0.5, borderColor:"#D3D6D6"}}>
                    <View style={{flexDirection:"row", paddingTop:10, width:"50%"}}> 
                        <Icon name="car-seat" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>{carData.countSeats} Asientos</Text>
                    </View>
                    <View style={{flexDirection:"row", paddingTop:10, width:"50%"}}> 
                        <Icon name="car-door" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>{carData.countDoors} Puertas</Text>
                    </View>
                    <View style={{flexDirection:"row", paddingTop:10, width:"50%"}}> 
                        {carData.fuel === "electric" && <><Icon name="car-electric" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Eléctrico</Text></>}
                        {carData.fuel === "hybrid" && <><Icon name="car-electric" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Híbrido</Text></>}
                        {carData.fuel === "gasolina" && <><Icon name="gas-station" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Gasolina</Text></>}
                        {carData.fuel === "diesel" && <><Icon name="gas-station" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Diesel</Text></>}
                        {carData.fuel === "GasolinaGas" && <><Icon name="gas-station" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Gasolina y Gas</Text></>}
                    </View>
                    <View style={{flexDirection:"row", paddingTop:10, width:"50%", paddingBottom:10}}> 
                        {carData.transmision === "automatic" && <><Icon name="car-shift-pattern" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Automática</Text></>}
                        {carData.transmision === "mecanic" && <><Icon name="car-shift-pattern" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Mecánica</Text></>}
                        {carData.transmision === "automatic2" && <><Icon name="car-shift-pattern" size={18} color="#3083ff"/>
                        <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>Automática Secuencial</Text></>}
                    </View>
                </View>

            </View>

            <View style={{paddingVertical:5, backgroundColor:"white", marginHorizontal:20, marginHorizontal:15}}>
                <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color: "#100f42"}}>Ubicación</Text>
                <View style={{flexDirection:"row", flexWrap:"wrap",borderBottomWidth:0.5, borderColor:"#D3D6D6"}}>
                <MapView
                    style={{width:"100%", height:200, marginBottom:20,}}
                    initialRegion={{
                        latitude:  carData.lat,
                        longitude: carData.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    region={{ latitude: carData.lat, longitude: carData.lng, latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}}
                    provider="google"
                    onRegionChangeComplete={() => setRegion(region)}
                    >
                        <Marker coordinate={{ latitude: carData.lat, longitude: carData.lng}} />
                </MapView>
                {carData.city && <>
                <Icon2 name="location-arrow" size={18} color="#3083ff"/>
                <Text style={{fontSize: 16, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:10}}>{carData.city}</Text>
                </>}
                </View>

            </View>
            
        </>
    )
    return (
        <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"white"}}>
        <FlatList ListFooterComponent={list} contentContainerStyle={{paddingTop:30,  paddingBottom:50}} initialNumToRender={5} nestedScrollEnabled={true} removeClippedSubviews={true}/>
        <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={()=> {navigation.navigate("PaymentScreen", {car: null, cPhotos: null, carId:carData._id, carPrice:carData.price})}}>
                        <Text style={style.textLeft}>
                    RESERVAR
        </Text></TouchableOpacity>
        </View>
    );
};
}
const style = StyleSheet.create({
    header: {
    paddingTop:20,
    paddingBottom:20,
    flexDirection: 'row',
    alignItems: 'center',
    width:SIZES.width
    },
    left:{
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        backgroundColor: '#072F4A',
        borderTopRightRadius:15,
        borderTopLeftRadius:15
    },
    textLeft:
    {
        color: "white",
        fontFamily:"Poppins_700Bold",
        fontSize: SIZES.h4,
    },
});

export default DetailsScreen;