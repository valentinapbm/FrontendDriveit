import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native';
import { 
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";

const Input =({label, iconName, error, password,number, required, newpass, OnFocus=()=>{},...props})=>{
    
    const [hidePassword, setHidePassword] = React.useState(password);
    const [isFocused, setIsFocused] = React.useState(false);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_600SemiBold,
        Poppins_300Light,
    });
    if (!fontsLoaded) {
        return null
    }

    return(
        <View style={{marginBottom:15}}>
            <Text style={style.label}>{label}{required && <Text style={{color:"red"}}> *</Text>}</Text>
            {newpass && <Text style={{fontSize: 12, paddingTop:5, paddingBottom:5,
        color: "black",
        fontFamily:"Poppins_300Light"}}>La contraseña debe tener mínimo 8 caracteres, una minuscula, una mayuscula, un numero o un caracter especial</Text>}
            <View style={[
            style.inputContainer,
            {
                borderColor: error
                ? "red"
                : isFocused
                ? "#072F4A"
                : "#F3F4FB",
                alignItems: 'center',
            },
            ]}>
                <Icon name={iconName} style={{fontSize:22, marginRight:10}}  />
                <TextInput autoCorrect={false} 
                    onFocus={()=>{
                        OnFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    keyboardType={number ? "numeric" :"default" }
                    style={{flex:1, fontFamily:"Poppins_300Light"}} {...props}/>
                    {password && (
            <Icon
                onPress={() => setHidePassword(!hidePassword)}
                name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                style={{color: "#072F4A", fontSize: 22}}
            />
            )}
            </View>
            {error && (
            <Text style={{marginTop: 7, color: "red", fontSize: 12, fontFamily:"Poppins_300Light"}}>
            {error}
            </Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    label: {
        fontSize: 16,
        color: "#808080",
        fontFamily:"Poppins_400Regular",
        },
        inputContainer: {
        height: 55,
        backgroundColor: "#F3F4FB",
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems:"center",
        borderRadius:10
        },
    });

export default Input;