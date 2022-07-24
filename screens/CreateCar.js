import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Modal, FlatList, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Input from '../components/Input';
import CurrencyInput from 'react-native-currency-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Marker } from "react-native-maps"
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { createCar } from '../store/reducers/Car.reducer';
import AppLoader from "../components/AppLoader"
import ModalPicker  from "../components/ModalPicker"
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-root-toast';
 import * as RootNavigation from "../components/RootNavigation"
 import axios from 'axios';
import { getUser } from '../store/reducers/User.reducer';
import { getCars } from '../store/reducers/Car.reducer';
const CreateCar = ({navigation, route}) => {



    const Options = ["Audi", "BMW", "Chevrolet", "Citroen","Dodge", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Kia","Mazda", "Mercedes-Benz", "Mitsubishi Motors", "Nissan", "Peugeot", "Porsche", "Renault", "SSangYong","Suzuki", "Toyota", "Volkswagen", "Volvo"]
    const Colors = ["Beige", "Negro", "Azul", "Marrón", "Vinotinto", "Crema", "Dorado", "Verde", "Gris", "Anaranjado", "Morado", "Rojo","Plateado", "Blanco", "Amarillo"]
    const navigation1 =useNavigation();
    const dispatch = useDispatch()
    const [brand, setBrand]= useState('Selecciona una opción')
    const [model, setModel]=useState("")
    const [year, setYear]=useState()
    const [color, setColor]= useState('Selecciona una opción')
    const [modalBrand, setModalBrand] = useState(false)
    const [modalColor, setModalColor] = useState(false)
    const [value, setValue] = useState('gasolina');
    const [transmision, setTransmision] = useState('mecanic');
    const [countDoors, setCountDoors]=useState(0)
    const [countSeats, setCountSeats] = useState(0)
    const [price, setPrice]=useState(0)
    const [photos, setPhotos]=useState([])
    const [errors, setErrors] = useState({});
    const [loading, setLoading]= useState(false);

	const [ region, setRegion ] = React.useState({
		latitude: 3.43722,
		longitude: -76.5225,
        latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
        city:null
	})
    const changeModalVisibility =(bool)=>{
        setModalBrand(bool)
    }
    const changeModalVisibilityColor =(bool)=>{
        setModalColor(bool)
    }
    const setData =(option)=>{
        setBrand(option)
        setErrors({...errors,"brand":null})
    }
    const setDataColor =(option)=>{
        setColor(option)
    }
    const fuel = [
        {
            key: 'gasolina',
            text: 'Gasolina',
        },
        {
            key: 'diesel',
            text: 'Diesel',
        },
        {
            key: 'electric',
            text: 'Eléctrico',
        },
        {
            key: 'hybrid',
            text: 'Híbrido',
        },
        {
            key: 'GasolinaGas',
            text: 'Gasolina y Gas',
        },
    ];
    const transmisión = [
        {
            key: 'mecanic',
            text: 'Mecánica',
        },
        {
            key: 'automatic',
            text: 'Automática',
        },
        {
            key: 'automatic2',
            text: 'Automática Secuencial',
        }
    ];
        //Huespedes
    const addCountDoors = () => {
        if (countDoors === 4) {
        return;
        }
        setCountDoors(countDoors + 1);
    };
    const removeCountDoors = () => {
        if (countDoors === 0) {
        return;
        }
        setCountDoors(countDoors - 1);
    };
    //Camas
    const addCountSeats = () => {
        if (countSeats === 10) {
        return;
        }
        setCountSeats(countSeats + 1);
    };
    const removeCountSeats = () => {
        if (countSeats === 0) {
        return;
        }
        setCountSeats(countSeats - 1);
        
    };
    
    useEffect(()=>{
        if (route !== undefined){
    
        if (route.params !== undefined) {
            setPhotos(route.params.photos);
            setErrors({...errors,"photos":null})
        }}
    }, [route.params])

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };

    const validate = async() => {
        
        let isValid = true;
        if (brand === "Selecciona una opción") {
        handleError('Por favor ingresa este campo', 'brand');
        isValid = false;
        }

        if (!year) {
            handleError('Por favor ingresa este campo', 'year');
            isValid = false;
        }
        if (price === 0) {
        handleError('Por favor ingresa este campo', 'price');
        isValid = false;
        }
        if (photos.length === 0) {
            handleError('Por favor ingresa este campo', 'photos');
            isValid = false;
        }

        if(region.latitude === (3.43722) && region.longitude === (-76.5225)){
            handleError('Por favor ingresa este campo', 'region');
            isValid = false;
        }



        if(isValid === true){
            const data = new FormData();
            data.append('brand', brand)
            if(model){
                data.append('model', model)
            }
            data.append('year', year)
            data.append('fuel', value)
            if(color !== "Selecciona una opción"){
            data.append('color', color)}
            data.append('transmision', transmision)
            if(countDoors >0){
                data.append('countDoors', countDoors)}
            if(countSeats >0){
                    data.append('countSeats', countSeats)}
            data.append('price', price);
            data.append('lat', region.latitude);
            data.append('lng', region.longitude)
            data.append('city', region.city)
            if(photos){
                for (let i = 0; i < photos.length; i++) {
                    //nombre de la propiedad, archivo y nombre del archivo
                    data.append(`file_${i}`, photos[i]);
                }
            }
            
            try{
            const token = await AsyncStorage.getItem('token')
            if(token !== null){
            setLoading(true)
            try {
            const data1 = await axios.post(
                'https://driveit-app.herokuapp.com/cars/create', 
                data,
                {
                headers: {
                
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
            },
            });
            if(data1.status === 201){

                let toast = Toast.show('Se creó tu anuncio', {
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
                setLoading(false)
                setBrand('Selecciona una opción')
                setModel("")
                setYear()
                setColor('Selecciona una opción')
                setValue('gasolina');
                setTransmision('mecanic');
                setCountDoors(0)
                setCountSeats(0)
                setPrice(0)
                setPhotos(null)
                setErrors({});
                dispatch(getUser());                
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
}
    function renderImage (item, i) {
        return (
        <Image
            style={{ height: 100, width: 100, borderColor: "#A9A9A9",
            borderWidth: 0.5, margin:10}}
            source={{ uri: item.uri }}
            key={i}
            
        />
        )
    
    }
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
            
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_700Bold"}}>Publica un nuevo vehículo</Text>
        <View style={style.containertop}>
            <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Agrega algunos detalles</Text>
            <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969", marginTop:15}}>Marca <Text style={{color:"red"}}>*</Text></Text>
        <TouchableOpacity style={[style.input,{
                borderColor: errors.brand
                ? "red"
                : "white",
                alignItems: 'center',
                borderWidth:0.5
            },
            ]} onPress={()=> changeModalVisibility(true)}>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"#A9A9A9", paddingLeft:10}}>{brand}</Text>
                <Modal transparent={true} animationType="fade" visible={modalBrand} onRequestClose={()=> changeModalVisibility(false)}>
                    <ModalPicker changeModalVisibility={changeModalVisibility} setData={setData} Options={Options}></ModalPicker>
                </Modal>
        </TouchableOpacity>
        {errors.brand && (
            <Text style={{marginTop: 2, color: "red", fontSize: 12, fontFamily:"Poppins_300Light"}}>
            {errors.brand}
            </Text>
            )}
        {brand !=='Selecciona una opción' &&
        <Input label="Modelo" placeholder="Ingresa el modelo de tu carro" onChangeText={text => setModel(text)}
            value={model}/>}
            <Input label="Año" placeholder="Ingresa el año" onChangeText={text => setYear(text)}
            value={year} required number onFocus={() => handleError(null, 'year')}  error={errors.year}/>
        <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969"}}>Combustible</Text>
            <View style={style.container}>
            {fuel.map(res => {
					return (
						<View key={res.key} style={style.container}>
                            <TouchableOpacity
								
								onPress={() => {
									setValue(res.key);
								}}>
                                    {value === res.key ? 
                                    ( <View style={style.selectedRb}>
                                        <Text style={style.radioText2}>{res.text}</Text>
                                        </View>):
                                        (
                                            <View style={style.radioCircle}>
                                        <Text style={style.radioText}>{res.text}</Text></View>)}
							</TouchableOpacity>
						</View>
					);
				})}
            </View>
            <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969"}}>Color</Text>
        <TouchableOpacity style={style.input} onPress={()=> changeModalVisibilityColor(true)}>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"#A9A9A9", paddingLeft:10}}>{color}</Text>
                <Modal transparent={true} animationType="fade" visible={modalColor} onRequestClose={()=> changeModalVisibilityColor(false)}>
                    <ModalPicker changeModalVisibility={changeModalVisibilityColor} setData={setDataColor} Options={Colors}></ModalPicker>
                </Modal>
        </TouchableOpacity>

        <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969"}}>Transmisión</Text>
            <View style={style.container}>
            {transmisión.map(res => {
					return (
						<View key={res.key} style={style.container}>
                            <TouchableOpacity
								
								onPress={() => {
									setTransmision(res.key);
								}}>
                                    {transmision === res.key ? 
                                    ( <View style={style.selectedRb}>
                                        <Text style={style.radioText2}>{res.text}</Text>
                                        </View>):
                                        (
                                            <View style={style.radioCircle}>
                                        <Text style={style.radioText}>{res.text}</Text></View>)}
							</TouchableOpacity>
						</View>
					);
				})}
            </View>
            <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969", paddingTop:5}}>Número de Puertas </Text>
            <View style={style.containerCounter}>
                <TouchableOpacity style={style.counter}	onPress={addCountDoors}>
                            <Text style={{fontSize: 20, fontFamily:"Poppins_600SemiBold", color:"white", paddingTop:2}}>+</Text>    
				</TouchableOpacity>
                <Text style={{fontSize: 15, fontFamily:"Poppins_600SemiBold",paddingTop:2}}>{countDoors}</Text>
                <TouchableOpacity style={style.counter}	onPress={removeCountDoors}>
                            <Text style={{fontSize: 20, fontFamily:"Poppins_600SemiBold", color:"white", paddingTop:2}}>-</Text>    
				</TouchableOpacity>
            </View>
            <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969", paddingTop:5}}>Número de Asientos </Text>
            <View style={style.containerCounter}>
                <TouchableOpacity style={style.counter}	onPress={addCountSeats}>
                            <Text style={{fontSize: 20, fontFamily:"Poppins_600SemiBold", color:"white", paddingTop:2}}>+</Text>    
				</TouchableOpacity>
                <Text style={{fontSize: 15, fontFamily:"Poppins_600SemiBold",paddingTop:2}}>{countSeats}</Text>
                <TouchableOpacity style={style.counter}	onPress={removeCountSeats}>
                            <Text style={{fontSize: 20, fontFamily:"Poppins_600SemiBold", color:"white", paddingTop:2}}>-</Text>    
				</TouchableOpacity>
            </View>
        </View>
        
        

        
        <View style={style.containertop}>
            <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Fija un precio</Text>
            <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969", marginTop:15}}>El precio es por día<Text style={{color:"red"}}>*</Text></Text>
            <CurrencyInput
                value={price}
                onChangeValue={(value)=>{setPrice(value), setErrors({...errors,"price":null})}}
                prefix="COP $"
                delimiter="."
                separator="."
                precision={0}
                style={errors.price ? style.inputerror :style.input}
                />
                {errors.price && (
            <Text style={{marginTop: 2, color: "red", fontSize: 12, fontFamily:"Poppins_300Light"}}>
            {errors.price}
            </Text>
            )}
        </View>


        <View style={style.containertop}>
            <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Sube tus imagenes <Text style={{color:"red"}}>*</Text></Text>
           <TouchableOpacity style={errors.photos ? style.imagesError: style.images} onPress={()=> navigation.navigate("ImageBrowser")}>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"#A9A9A9", paddingLeft:10, textAlign:"center"}}><Icon name="cloud-upload-outline" size={20}/> Sube tus archivos</Text>
                
        </TouchableOpacity>
        {errors.photos && (
            <Text style={{marginTop: 2, color: "red", fontSize: 12, fontFamily:"Poppins_300Light"}}>
            {errors.photos}
            </Text>
            )}
        <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", padding:10}}>
            {photos && photos.map((item, i) => renderImage(item, i))}
        </View>
            
        </View>
        <View style={style.containertop}>
        <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Agrega tu ubicación <Text style={{color:"red"}}>*</Text></Text>
        <View style={{ marginTop: 15, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder={`Busca tu dirección`}
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
                    const city=details.address_components.filter((item)=>item.types.includes("locality"))
                    const city2=city[0].long_name
					// 'details' is provided when fetchDetails = true
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
                        city:city2
					}),
                    setErrors({...errors,"region":null})
				}}
				query={{
					key: "AIzaSyCsW9trmjliEY9-Qz_uuAK8C2DRCUFzDqs",
					language: "en",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { position: "absolute", width: "100%", zIndex: 1},
					listView: { backgroundColor: "white" },
                    textInput:{borderWidth:0.5, fontFamily:"Poppins_300Light", borderColor:"#DCDCDC",borderColor:errors.region ? "red" :"#DCDCDC" }
				}}
			/>
			<MapView
				style={{width:"100%", height:400, marginBottom:20,}}
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
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				
				
			</MapView>
            {errors.region && (
            <Text style={{marginTop: 2, color: "red", fontSize: 12, fontFamily:"Poppins_300Light"}}>
            {errors.region}
            </Text>
            )}
		</View> 
       

            </View>

         <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Crear anuncio
                    </Text></TouchableOpacity>
        
        </>
    )
    return (
        <SafeAreaView
        style={{flex: 1, backgroundColor:"#f3f5fb"}}>
            {loading=== true && <AppLoader></AppLoader>}
        <FlatList keyboardShouldPersistTaps='handled' ListFooterComponent={list} contentContainerStyle={{paddingTop:60, paddingHorizontal:20, paddingBottom:100}}></FlatList>
        </SafeAreaView>
    );

};
const style = StyleSheet.create({
    containertop: {
    padding:10,
    flexDirection: 'column',
    justifyContent:"center",
    marginHorizontal: 1,
    backgroundColor:"white",
    elevation:1,
    borderRadius:10, 
    marginBottom:15,
    paddingLeft:15,
    paddingRight:15
    },
    input:{
        height: 55,
        backgroundColor: "#F3F4FB",
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems:"center",
        borderRadius:10,
        marginBottom:10,
        fontFamily:"Poppins_300Light", 
        paddingLeft:10,
        fontSize:15,
        },
    container: {
        flexDirection:"row",
        justifyContent:"flex-start",
        flexWrap:"wrap",
        margin:5
    },
    
    radioText: {
        fontSize: 15,
        color: '#000',
        textAlign:"center",
        fontFamily:"Poppins_300Light"
        
    },
    radioCircle: {
        padding:10,
        width:"auto",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F3F4FB",
        borderRadius:15,
        height:50,
    },
    selectedRb: {
        padding:10,
        width:"auto",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#072F4A",
        color:"white",
        height:50,
        borderRadius:15,

    },
    radioText2: {
        fontSize: 15,
        color: '#fff',
        textAlign:"center",
        fontFamily:"Poppins_300Light"
        
    },
    containerCounter:
    {
        flexDirection:"row-reverse",
        borderWidth:0.5,
        alignItems:"center",
        justifyContent:"space-between",
        padding:5,
        width:100,
        borderRadius:15,
        borderColor:"#DCDCDC",
        marginBottom:10,
        marginTop:10

    },
    counter:{
        width:30,
        height:30,        
        justifyContent:"center",
        alignItems:"center",
        borderRadius:12,
        backgroundColor:"#072F4A",
        
    }
    ,images:{
        height: 55,
        backgroundColor: "#F3F4FB",
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        marginBottom:10,
        fontFamily:"Poppins_300Light", 
        paddingLeft:10,
        fontSize:15,
        marginTop:10
        },
        left:{
            width:"100%",
            alignItems: 'center',
            justifyContent: 'center',
            padding:15,
            borderRadius: 4,
            backgroundColor: '#072F4A',
        },
        textLeft:
        {
            color: "white",
            fontFamily:"Poppins_700Bold",
            fontSize: 20,
        },
        inputerror:{
            height: 55,
            backgroundColor: "#F3F4FB",
            flexDirection: 'row',
            paddingHorizontal: 15,
            alignItems:"center",
            borderRadius:10,
            marginBottom:10,
            fontFamily:"Poppins_300Light", 
            paddingLeft:10,
            fontSize:15,
            borderWidth:0.5,
            borderColor:"red",
        },
        imagesError:{
            height: 55,
            backgroundColor: "#F3F4FB",
            flexDirection: 'row',
            paddingHorizontal: 15,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:10,
            marginBottom:10,
            fontFamily:"Poppins_300Light", 
            paddingLeft:10,
            fontSize:15,
            marginTop:10,
            borderWidth:0.5,
            borderColor:"red",
            },
})

export default CreateCar;