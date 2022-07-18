import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Modal} from 'react-native';
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
import { useState } from 'react';
import ModalPicker from '../components/ModalPicker';
import Input from '../components/Input';
import CurrencyInput from 'react-native-currency-input';
import { ImageBrowser } from 'expo-image-picker-multiple';

const CreateCar = () => {
    const Options = ["Audi", "BMW", "Chevrolet", "Citroen", "Daihatsu", "Dodge", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Kia","Mazda", "Mercedes-Benz", "MINI", "Mitsubishi Motors", "Nissan", "Peugeot", "Porsche", "Renault", "Seat", "Skoda", "SSangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]
    const Colors = ["Beige", "Negro", "Azul", "Marrón", "Vinotinto", "Crema", "Dorado", "Verde", "Gris", "Anaranjado", "Morado", "Rojo","Plateado", "Blanco", "Amarillo"]
    const navigation1 =useNavigation();
    const dispatch = useDispatch()
    const { isLoggedIn, fullname, role, image, email } = useSelector(
        (state) => state.userReducer
    );
    const [brand, setBrand]= useState('Selecciona una opción')
    const [model, setModel]=useState("")
    const [year, setYear]=useState()
    const [color, setColor]= useState('Selecciona una opción')
    const  [modalBrand, setModalBrand] = useState(false)
    const  [modalColor, setModalColor] = useState(false)
    const [value, setValue] = useState('gasolina');
    const [transmision, setTransmision] = useState('mecanic');
    const [countDoors, setCountDoors]=useState(0)
    const [countSeats, setCountSeats] = useState(0)
    const [price, setPrice]=useState(30000)
        let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }

    const changeModalVisibility =(bool)=>{
        setModalBrand(bool)
    }
    const changeModalVisibilityColor =(bool)=>{
        setModalColor(bool)
    }
    const setData =(option)=>{
        setBrand(option)
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
    return (
        <SafeAreaView
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingTop:60, paddingHorizontal:20, paddingBottom:10}}>
        <Text style={{fontSize: 35
            , fontFamily:"Poppins_700Bold"}}>Publica un nuevo vehículo</Text>
        <View style={style.containertop}>
            <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Agrega algunos detalles</Text>
            <Text style={{fontSize: 16
            , fontFamily:"Poppins_400Regular", color:"#696969", marginTop:15}}>Marca <Text style={{color:"red"}}>*</Text></Text>
        <TouchableOpacity style={style.input} onPress={()=> changeModalVisibility(true)}>
                <Text style={{fontSize: 14
            , fontFamily:"Poppins_300Light", color:"#A9A9A9", paddingLeft:10}}>{brand}</Text>
                <Modal transparent={true} animationType="fade" visible={modalBrand} onRequestClose={()=> changeModalVisibility(false)}>
                    <ModalPicker changeModalVisibility={changeModalVisibility} setData={setData} Options={Options}></ModalPicker>
                </Modal>
        </TouchableOpacity>
        {brand !=='Selecciona una opción' &&
        <Input label="Modelo" placeholder="Ingresa el modelo de tu carro" onChangeText={text => setModel(text)}
            value={model}/>}
            <Input label="Año" placeholder="Ingresa el año" onChangeText={text => setYear(text)}
            value={year} required/>
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
                onChangeValue={setPrice}
                prefix="COP $"
                delimiter="."
                separator="."
                precision={0}
                style={style.input}
                />
        </View>
        <View style={style.containertop}>
            <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Sube tus imagenes</Text>
            <Text style={{fontSize: 15
            , fontFamily:"Poppins_300Light", color:"#696969"}}>Marca</Text>
        </View>
        <View style={style.containertop}>
            <Text style={{fontSize: 20
            , fontFamily:"Poppins_600SemiBold", color:"#696969", paddingTop:1}}>Confirma tu ubicación
            </Text>
            <Text style={{fontSize: 15
            , fontFamily:"Poppins_300Light", color:"#696969"}}>Marca</Text>
        </View>


        </ScrollView>
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
        fontSize:15
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
})

export default CreateCar;