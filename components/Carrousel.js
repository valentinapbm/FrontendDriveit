import React, {useRef, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
Image,
StyleSheet,
View,
FlatList,
TouchableOpacity,

} from 'react-native';
import { SIZES } from '../assets/styles/theme';
import { 
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_300Light,
    } from '@expo-google-fonts/poppins'
import { useFonts } from "expo-font";



const Carrousel = ({data}) => {
    
    let flatlistref =useRef()
        const [currentIndex, setCurrentIndex]=useState(0)

        const onViewRef = useRef((changed)=>{

            if(changed){
            setCurrentIndex(changed.viewableItems[0].index)
            }
        })

        const scrolltoIndex = (index)=>{
            if(flatlistref.current){
            flatlistref.current.scrollToIndex({ animated: true, index: index })}
    }
        const renderItem = ({item})=>{
            return (<View activeOpacity={1}>
                <Image source={{uri:item}} style={styles.image}/>
            </View>)
        }
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
        
    return (
        <View style={styles.container}>
            <StatusBar style='auto'/>

            <FlatList 
            data={data} 
            renderItem={renderItem} 
            keyExtractor={((item,index)=> index.toString())}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            removeClippedSubviews={true}


            ref={(ref)=>{
                flatlistref.current = ref}}
            onViewableItemsChanged={onViewRef.current}
            />
            
            <View style={styles.dotview}>
                {data.map((item, index)=>{
                    return(
                    <TouchableOpacity key={index.toString()}
                        style={[styles.circle, {backgroundColor: index == currentIndex ? "#3083ff" : '#c5cdfa'}]} onPress={()=>scrolltoIndex(index)} >
                    </TouchableOpacity>
                    )
                })}

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{flex:1,

    },
    image:{
        width:SIZES.width,
        height:250,
        resizeMode:'cover',
    },
    dotview:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10

    },
    circle:{
        width:7,
        height:7,
        backgroundColor:"#c5cdfa",
        borderRadius:50,
        marginHorizontal:5,
    },
    day:{
        fontSize: 14, fontFamily:"Poppins_400Regular", color: "grey"
    }

    });
export default Carrousel;