import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
const StripeApp = (props) => {
    return (
        <View
        style={styles.container}>
            <Text style={{color: "black",
            fontFamily:"Poppins_400Regular",
            fontSize: 15, marginTop:15}}>Ingresa tu información bancaria</Text>
        <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
            setCardDetails(cardDetails);
        }}
      />
       <TouchableOpacity style={[styles.inputabled,{
                            borderColor: "white",
                            alignItems: 'center',
                            borderWidth:0.5,
                            marginTop:5,
                            marginBottom:15
                            
                        },
                        ]}  >
                            <Text style={{color: "white",
            fontFamily:"Poppins_700Bold",
            fontSize: 20,}}>Realizar Pago</Text>
              </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      
    },
    input: {
      backgroundColor: "#efefefef",
  
      borderRadius: 8,
      fontSize: 20,
      height: 50,
      padding: 10,
    },
    card: {
      backgroundColor: "#efefefef",
      borderRadius:15,
      fontSize:16
    },
    cardContainer: {
      height: 50,
      marginVertical: 10,
      borderRadius:15
    },
    inputabled:{
        width:"100%",
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        borderRadius: 4,
        backgroundColor: '#072F4A',
    },
  });
export default StripeApp;