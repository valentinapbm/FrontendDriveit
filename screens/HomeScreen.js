import React,{memo, useState, useRef, useMemo} from 'react';
import {SafeAreaView, Text, View, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, Modal} from 'react-native';
import { useSelector} from 'react-redux';
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
import CarHomeCard from '../components/CarHomeCard';
import Foto from "../assets/images/filter.png"
import { Center, VStack,Skeleton } from 'native-base';
import hand from "../assets/images/hand.png"
import logito from "../assets/images/logito.png"
import RangeSlider, { Slider } from 'react-native-range-slider-expo';


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
    const { isLoggedIn, name, role, image, loading, errorLogin, lastname } = useSelector(
        (state) => state.userReducer
    );

    const [searchBrand, setSearchBrand ]= useState("")
    const [brand, setBrand]= useState("")
    const [modal, setModal] = useState(false)
    const [brand1, setBrand1]= useState('')
    const [value, setValue] = useState('');
    const [transmision, setTransmision] = useState('');
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const changeModalVisibility =(bool)=>{
        setModal(bool)
    }

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });

    if (!fontsLoaded) {
        return null
    }
    const Options1 = ["Audi", 
    "BMW", "Chevrolet", 
    "Citroen","Dodge", 
    "Fiat", "Ford", "Honda", 
    "Hyundai", "Jeep", "Kia","Mazda", 
    "Mercedes-Benz", "Mitsubishi Motors", 
    "Nissan", "Peugeot", "Porsche", "Renault", 
    "SSangYong","Suzuki", "Toyota", "Volkswagen", 
    "Volvo"]

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
    

    const list = (
        <>
        <View style={style.location}>
            <View style={style.locationText}>
            <View style={{flexDirection:"row"}}><Text style={{marginTop: 2, color: "grey", fontSize: 20, fontFamily:"Poppins_300Light"}}>Hola! </Text><Image style={{width:20,height:20}} source={hand}/></View>
            {isLoggedIn === false &&
                <View style={{flexDirection:"row"}}><Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color:"black", paddingTop:1, paddingRight:10}}>Bienvenido a</Text><Image style={{width:80,height:20}} source={logito}/></View>}
            {isLoggedIn === true &&
                <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold", color:"black", paddingTop:1}}>{name} {lastname}</Text>}
            </View>
            
            <View style={style.locationIcon}>
            {isLoggedIn === false &&
                <Icon name='person'/>
            }
            {isLoggedIn === true && image !== null &&
        
                <Image style={{width:50,height:50, borderRadius:10}} source={{uri:image}}/>}
            

            </View>
        </View>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_300Light", paddingLeft:20, paddingVertical:20}}>Encuentra tu vehículo favorito.</Text>
        <View style={style.body}>
            <View style={style.input}>
                <InputSearch  placeholder="Busca tu vehículo por marca" onChangeText={text => setSearchBrand(text)}/>
            </View>
        <View style={{paddingTop:70, width:"100%"}}>
        <View style={{width:"100%", flexDirection:"row", paddingHorizontal:20, justifyContent:"space-between", alignItems:"center"}}>
        <Text style={{fontSize: 18, fontFamily:"Poppins_600SemiBold"}}>Top marcas</Text>
        <TouchableOpacity onPress={()=> changeModalVisibility(true)}><Text style={{fontSize: 15, fontFamily:"Poppins_600SemiBold", color:"#5297ff"}}>Ver todas</Text></TouchableOpacity>
        </View>
            <ScrollView horizontal={true} style={{width:"100%", padding:0}} showsHorizontalScrollIndicator={false}>
            {
                Options.map((name, key)=>{
                    return(
                    <TouchableOpacity style={style.locationIcon1} key={key} onPress={()=>{setBrand(name.name)}}>
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
            <TouchableOpacity style={style.locationIcon2} onPress={()=> changeModalVisibility(true)}>
                <Image source={Foto} style={{width:"90%", height:"90%"}}/>
            </TouchableOpacity>
            <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", color:"#072F4A"}}>Filtros de búsqueda</Text>
            <TouchableOpacity style={{flexDirection:"row", paddingLeft:20}} onPress={()=> {setBrand(""), setTransmision(""), setValue(""), setFromValue(0), setToValue(0)}}>
                <Icon size={15} name ="trash"/>
                <Text style={{fontSize: 15, fontFamily:"Poppins_300Light", color:"#072F4A"}}>Borrar filtros</Text>
            </TouchableOpacity>
            <Modal transparent={true} animationType="fade" visible={modal} onRequestClose={()=> changeModalVisibility(false)}>
            <View style={{   flex:1,
            alignItems:"center",
            justifyContent:"center"}}>
            <View style={style.modal}>
            <TouchableOpacity onPress={()=> changeModalVisibility(false)} style={{width:50, alignSelf:"flex-end", margin:10}}><Text style={{fontSize: 15, fontFamily:"Poppins_700Bold", color:"#072F4A", textAlign:"right"}}>Cerrar</Text></TouchableOpacity>
            <View style={{paddingHorizontal:20}}>
            <Text style={{fontSize: 18, fontFamily:"Poppins_300Light", color:"#072F4A"}}>Filtros de búsqueda</Text>

                <ScrollView style={{height:SIZES.height/2}}>
                <Text style={{fontSize: 16
                            , fontFamily:"Poppins_400Regular", color:"#696969"}}>Marca</Text>
                            <View style={style.container}>
                            {Options1.map(res => {
                                    return (
                                        <View key={res} style={style.container}>
                                            <TouchableOpacity
                                                
                                                onPress={() => {
                                                    setBrand(res);
                                                }}>
                                                    {brand === res ? 
                                                    ( <View style={style.selectedRb}>
                                                        <Text style={style.radioText2}>{res}</Text>
                                                        </View>):
                                                        (
                                                            <View style={style.radioCircle}>
                                                        <Text style={style.radioText}>{res}</Text></View>)}
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
            </View>
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
            <Text style={{fontSize: 16, fontFamily:"Poppins_400Regular", color:"#696969"}}>Precio</Text>
                 <RangeSlider min={20000} max={100000}
                            fromValueOnChange={value1 => setFromValue(value1)}
                            toValueOnChange={value1 => setToValue(value1)}
                            styleSize="small"
                            toKnobColor='#072F4A'
                            fromKnobColor='#072F4A'
                    />
                </ScrollView>
                <TouchableOpacity onPress={()=> changeModalVisibility(false)} style={{width:50, alignSelf:"flex-end", margin:10}}><Text style={{fontSize: 15, fontFamily:"Poppins_700Bold", color:"#072F4A", textAlign:"right"}}>Aplicar</Text></TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>
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
                cars.filter((value) => {
                    if (searchBrand === "") {
                        return value;
                        } else if (
                        value.brand.toLowerCase().includes(searchBrand.toLowerCase())
                        ) {
                        return value;
                        }
                    }).filter((value) => {
                        if (brand === "") {
                        return value;
                        } else if (
                        value.brand.toLowerCase().includes(brand.toLowerCase())
                        ) {
                        return value;
                        }
                    }).filter((item) => {
                        if (value === "") {
                        return item;
                        } else if (
                        item.fuel.toLowerCase().includes(value.toLowerCase())
                        ) {
                        return item;
                        }
                    }).filter((item) => {
                        if (transmision === "") {
                        return item;
                        } else if (
                        item.transmision.toLowerCase().includes(transmision.toLowerCase())
                        ) {
                        return item;
                        }
                    }).filter((item) => {
                        if (fromValue === 0 && toValue === 0) {
                        return item;
                        } else if (item.price >= fromValue && item.price <= toValue ) {
                        return item;
                        }
                    }).map((car,index)=>(
                    <TouchableOpacity key={index} style={{backgroundColor:"white", elevation:2, margin:20, borderRadius:15}} onPress={()=> {navigation.navigate("DetailsScreen", {itemId: car._id})}} >
                        <CarHomeCard car={car} screenHome/>
                    </TouchableOpacity>
                ))}
               {cars.filter((value) => {
                    if (searchBrand === "") {
                        return value;
                        } else if (
                        value.brand.toLowerCase().includes(searchBrand.toLowerCase())
                        ) {
                        return value;
                        }
                    }).filter((value) => {
                        if (brand === "") {
                        return value;
                        } else if (
                        value.brand.toLowerCase().includes(brand.toLowerCase())
                        ) {
                        return value;
                        }
                    }).filter((item) => {
                        if (value === "") {
                        return item;
                        } else if (
                        item.fuel.toLowerCase().includes(value.toLowerCase())
                        ) {
                        return item;
                        }
                    }).filter((item) => {
                        if (transmision === "") {
                        return item;
                        } else if (
                        item.transmision.toLowerCase().includes(transmision.toLowerCase())
                        ) {
                        return item;
                        }
                    }).filter((item) => {
                        if (fromValue === 0 && toValue === 0) {
                        return item;
                        } else if (item.price >= fromValue && item.price <= toValue ) {
                        return item;
                        }
                    }).length === 0 && 
                    
                    <View style={{margin:20, height:250, alignItems:"center", justifyContent:"center", backgroundColor:"#E8E8E8", borderRadius:15}}>
                        <Text style={{fontSize: 17, fontFamily:"Poppins_300Light", color:"#072F4A", textAlign:"center"}}>No se encontró resultados para tu búsqueda</Text>
                        
                        
                    </View>}
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
    modal:{
        backgroundColor:"#fff",
        borderRadius:10,
        width:SIZES.width -40,
        height:SIZES.height/1.5,
        elevation:1,
    },
    container: {
        flexDirection:"row",
        justifyContent:"flex-start",
        flexWrap:"wrap",
        margin:5
    },
    
    radioText: {
        fontSize: 14,
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
        height:35,
    },
    selectedRb: {
        padding:10,
        width:"auto",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#072F4A",
        color:"white",
        height:35,
        borderRadius:15,

    },
    radioText2: {
        fontSize: 14,
        color: '#fff',
        textAlign:"center",
        fontFamily:"Poppins_300Light"
        
    },
})

export default HomeScreen;