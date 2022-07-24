import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Modal, FlatList, Image, Platform} from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Marker, Callout } from "react-native-maps"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { SIZES } from '../assets/styles/theme';
const SearchScreen = ({navigation}) => {
    const { loadingCars, cars } = useSelector(
        (state) => state.carReducer
    );
    const[carsupdated, setCars]=useState([])

    const [ region, setRegion ] = React.useState({
		latitude: 3.43722,
		longitude: -76.5225,
        latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
        city:null
	})
    const list = (
        <>

        </>
    )
    let newArray
        function filter (city){
            newArray = cars.filter((item)=> removeAccents(item.city) === removeAccents(city))
            setCars(newArray)
        }
        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          } 
    function currencyFormat(num) {
            return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }
    return (
        <SafeAreaView
        style={{flex: 1,  backgroundColor:"#f3f5fb"}}>
        	<GooglePlacesAutocomplete
				placeholder={`¿A dónde vas?`}
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
                renderRow={results => (
                    <>
                     <Icon1 name="location-on"/>
                     <Text style={{fontFamily:"Poppins_300Light"}}>{results.description}</Text>
                   </>
                   )}
				onPress={(data, details = null) => {
                    const city=details.address_components.filter((item)=>item.types.includes("locality") || item.types.includes("administrative_area_level_2"))

                    let city2;
                    if(city[0].types.includes("locality")){
                       city2=city[0].long_name}else{
                        city2=city[0].long_name
                       }

					// 'details' is provided when fetchDetails = true
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
                        city:city2
					}),
                    filter(city2)
				}}
				query={{
					key: "AIzaSyCsW9trmjliEY9-Qz_uuAK8C2DRCUFzDqs",
					language: "en",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { position: "absolute", width: "100%", zIndex: 2, paddingHorizontal:20, paddingTop:60},
					listView: { backgroundColor: "white" },
                    textInput:{borderWidth:0.5, fontFamily:"Poppins_300Light", borderColor:"#DCDCDC",borderColor:"#DCDCDC", height:55 }
				}}
			/>{/*
            <TouchableOpacity style={{position: "absolute", right:0, borderWidth:0.5, zIndex: 2, marginHorizontal:20, marginTop:60, height:55, padding:10,backgroundColor: '#072F4A', borderTopRightRadius:5, borderBottomRightRadius:5, alignItems:"center"}}
            onPress={filter}>
                <Text style={{fontFamily:"Poppins_300Light", color:"white", paddingTop:10}}><Icon1 name="search"/> Buscar</Text>
            </TouchableOpacity>*/}
			<MapView
				style={{width:SIZES.width, height:SIZES.height}}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
                region={{ latitude: region.latitude, longitude: region.longitude, latitudeDelta: 0.0922,
					longitudeDelta: 0.0421}}
				provider="google"
                onRegionChangeComplete={() => setRegion(region)}
			>
                {carsupdated.map((item, index)=>(
				<Marker image={{uri:"https://res.cloudinary.com/dmg4ecgsq/image/upload/v1658625746/pcy5g735svjhaudwlhnu.png"}} key={index} coordinate={{ latitude: item.lat, longitude: item.lng }}
                >
                    <Callout tooltip={true} >
                        <View >
                            <View style={{backgroundColor:"white", padding:10, width:100, height:50, flexDirection:"column", alignSelf:"flex-start"}}>
                            <Text style={{fontFamily:"Poppins_300Light", fontSize:12}}>{item.brand} {item.model}</Text>
                            <Text style={{fontFamily:"Poppins_300Light",  fontSize:12}}>{currencyFormat(item.price)}</Text>
                            </View>
                        </View>
                    </Callout>
                </Marker>
                    ))}
				
				
			</MapView>
            <View style={{position:"absolute", bottom:Platform.OS === 'ios' ? 100 : 90, width:"100%"}}>

            <ScrollView horizontal={true} style={{width:"100%", padding:0}} showsHorizontalScrollIndicator={false}>

                {carsupdated.map((item, index)=>{
                    return(
                        <TouchableOpacity style={style.location} key={index} onPress={()=> {navigation.navigate("DetailsScreen", {itemId: item._id})}}>
                        <Image
                            style={{ height: 100, width:"100%", resizeMode:'cover', marginTop:10}}
                            source={{ uri: item.images[0] }}
                            resizeMode="contain"
            
                        />
                         <View style={{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between",alignItems:"center", flexWrap:"wrap"}}>
                <Text style={{fontSize: 16, fontFamily:"Poppins_600SemiBold", color: "#100f42"}}>{item.brand} {item.model}</Text>
                <Text style={{fontSize: 14, fontFamily:"Poppins_300Light", color: "#100f42", paddingLeft:5}}>{currencyFormat(item.price)}/día</Text>
            </View>

               
        
                    </TouchableOpacity>)
                    
                })}
            </ScrollView>
            </View>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    location:{
        flex:1,
        width:SIZES.width * 0.5,
        height:170,
        backgroundColor:"white",
        elevation:10,
        borderRadius:15,
        marginHorizontal:20,
    },

})

export default SearchScreen;