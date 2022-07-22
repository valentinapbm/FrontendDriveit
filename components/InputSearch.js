import React from "react";
import Icon2 from 'react-native-vector-icons/AntDesign'
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

const InputSearch =({label, iconName, error, password,number, required, OnFocus=()=>{},...props})=>{
    
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
        <View>
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
                <Icon2 name="search1" style={{fontSize:22, marginRight:10, marginLeft:20}}  />
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
            <Icon2
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
        backgroundColor: "white",
        flexDirection: 'row',
        borderWidth: 0.5,
        alignItems:"center",
        borderRadius:50,
        elevation:2
        },
    });

export default InputSearch;