import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView,  TouchableOpacity, Image, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";
import Input from '../components/Input';
import { SIZES } from '../assets/styles/theme';
import { postRegister } from '../store/reducers/User.reducer';
import { useDispatch, useSelector } from 'react-redux';
import AppLoader from '../components/AppLoader';
import UsernoPhoto from "../assets/Userphoto.png";
import DateField from 'react-native-datefield';
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '../store/reducers/User.reducer';
import { updateImageUser } from '../store/reducers/User.reducer';
import { isImmutableDefault } from '@reduxjs/toolkit';
const EditProfileUser = () => {
    const navigation =useNavigation();
    const dispatch = useDispatch();    
    const {loading, errorRegister, fullname, image, gender, birthday } = useSelector(
        (state) => state.userReducer
    );

    const [inputs, setInputs] = useState(fullname);
    const [birthday1, setBirthday]= useState(birthday === null || birthday === undefined ? new Date() : new Date(birthday));

    const [errors, setErrors] = useState({});
    const [value, setValue] = React.useState(gender === null || gender === undefined ? 'male' : gender);
    const [actualImage, setActualImage]= useState(image)
    const [imageUpdate, setImageUpdate] = useState(null);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }
    const handleOnchange = (text, input) => {
            setInputs(prevState => ({...prevState, [input]: text}));
        };
        
    const handleError = (error, input) => {
            setErrors(prevState => ({...prevState, [input]: error}));
        };
    const validate = () => {
        const data = {
            fullname: inputs,
            birthday:birthday1,
            gender: value
        
        }
        

        if(imageUpdate){
            const image1 = new FormData();
            image1.append("file", 
            {uri:imageUpdate,
                type: 'image/jpeg',
                name: 'profile-picture'
            })
            dispatch((updateImageUser(image1)))
        
        }
        
        dispatch(updateUser(data))
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });
        
        
            if (!result.cancelled) {
            setImageUpdate(result.uri);
            setActualImage(null)
            }
        };
    const deleteImage = ()=>{
        setImageUpdate(null);
    }
    const PROP = [
        {
            key: 'male',
            text: 'Masculino',
        },
        {
            key: 'female',
            text: 'Femenino',
        },
    ];
    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            {loading=== true && <AppLoader></AppLoader>}
            <View style={style.header}>
            <TouchableOpacity onPress={navigation.goBack} style={{flex:1, flexDirection:"row"}}>
            <Icon1 name="arrow-back-ios" size={17} />
            <Text style={{fontSize: 17, fontFamily:"Poppins_700Bold"}}>Volver</Text>
            </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{paddingTop:10, paddingHorizontal:20}}>
                <Text style={{fontSize: 20, fontFamily:"Poppins_700Bold", textAlign:"center"}}>Editar Perfil</Text>
                <View style={{marginVertical:20}}>
                    <TouchableOpacity style={{alignSelf: 'center'}} onPress={pickImage}>
                    <View style={{

                borderRadius:50,
                justifyContent: 'center',
                alignItems: 'center',
                        }}>
                    <ImageBackground source={
                        actualImage ? {uri:actualImage}
                        :imageUpdate !== null  ? {uri:imageUpdate}
                            : UsernoPhoto } style={{height: 100, width: 100}} imageStyle={{ borderRadius: 50}}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex:1,
                            borderRadius:50
                        }}>
                            <View  style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 50,
                        backgroundColor:"black",
                        zIndex:2
                    }}><Icon name='camera' color="white" size={20}/>
                    </View>
                        </View>
                    </ImageBackground>
                    </View>
                    </TouchableOpacity>
                    {imageUpdate !== null &&
                    <View>
                        <TouchableOpacity style={{alignSelf: 'center', padding:10, marginTop:10,  backgroundColor:"#FFCBCB", borderRadius:50}} onPress={deleteImage}>
                            <Icon name='trash-can-outline'size={20} color="white"/>
                        </TouchableOpacity>
                    </View>}
                <Input label="Nombre Completo" placeholder="Ingresa tu nombre completo" onChangeText={text => setInputs(text)}
                        onFocus={() => handleError(null, 'fullname')}  error={errors.fullname} value={inputs}/>
                        {errorRegister === "email already exist" && <Text style={{color:"red",fontFamily:"Poppins_400Regular"}}>Correo ya existe</Text>}
                    <Text style={style.label}>Fecha de nacimiento</Text>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <View style={{ width: '30%'}}>
                        <Text style={{fontSize: 12, fontFamily:"Poppins_700Bold",paddingLeft:5}}>Día</Text>
                        </View>
                        <View  style={{ width: '30%'}}>
                        <Text style={{fontSize: 12, fontFamily:"Poppins_700Bold",paddingLeft:5}}>Mes</Text>
                        </View>
                        <View  style={{ width: '30%'}}>
                        <Text style={{fontSize: 12, fontFamily:"Poppins_700Bold",paddingLeft:5}}>Año</Text>
                        </View>
                    </View>
                    <DateField
                    labelDate="Día"
                    labelMonth="Mes"
                    labelYear="Año"
                    defaultValue={birthday1}
                    styleInput={styles.inputContainer}
                    onSubmit={(value) => setBirthday(value)}
                    />
                    <Text style={style.label}>Género</Text>
                    <View style={style.container}>
                    {PROP.map(res => {
					return (
						<View key={res.key} style={styles.container}>
                            <TouchableOpacity
								onPress={() => {
									setValue(res.key);
								}}>
                                    <View key={res.key} style={styles.containerText}>
							<Text style={styles.radioText}>{res.text}</Text>
                            </View></TouchableOpacity>
							<View style={styles.containerRadio}>
                            <TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									setValue(res.key);
								}}>
                                    {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
                            </View>
						</View>
					);
				})}
                    </View>
                    
                    <TouchableOpacity activeOpacity={0.7} style={style.left} onPress={validate}>
                        <Text style={style.textLeft}>
                    Guardar
                    </Text></TouchableOpacity>
                </View>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
    paddingTop:40,
    paddingBottom:20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    },
    details: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 60,

    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    },
    iconContainer: {

    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    },
    detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,

    },
    left:{
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        borderRadius: 4,
        backgroundColor: '#072F4A',
    },
    rigth:{
        width:"60%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding:15,
        backgroundColor: '#E8E8E8',
        borderRadius:0,
        borderTopRightRadius:10,
        borderBottomRightRadius:10
    },
    textLeft:
    {
        color: "white",
        fontFamily:"Poppins_700Bold",
        fontSize: SIZES.h4,
    },
    container: {
        flex: 1,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    logo:{
        width: 100,
        height: 100,
    },
    containertop: {
        flexDirection: 'column',
        justifyContent:"center",
        alignItems: 'center',
        backgroundColor:"white",
        marginBottom:15
        },
        label: {
            marginVertical: 5,
            fontSize: 16,
            color: "#808080",
            fontFamily:"Poppins_400Regular",
            },
});
const styles = StyleSheet.create({
    container: {
        width:"40%",
        flexDirection:"row-reverse",
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 15,
        margin:5,
        height:35

    },
    containerText:{
        flexDirection:"column-reverse",
        alignItems: 'center',
        height:35,
        paddingBottom:5,
        paddingLeft:5
    },
    containerRadio: {
    
    },
    
    radioText: {
        fontSize: 15,
        color: '#000',
        textAlign:"center",
        fontFamily:"Poppins_300Light"
        
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#072F4A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: '#072F4A',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
    inputContainer: {
        width: '30%',
        height: 55,
        backgroundColor: "#F3F4FB",
        flexDirection: 'column',
        paddingHorizontal: 15,
        alignItems:"center",
        borderRadius:10,
        fontFamily:"Poppins_300Light",
        marginBottom:10
        
        },
});
export default EditProfileUser;