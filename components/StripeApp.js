import React,{useState} from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-root-toast';
import * as RootNavigation from "../components/RootNavigation"
import AppLoader from './AppLoader';
import { getUser } from '../store/reducers/User.reducer';
import { useDispatch } from 'react-redux';


const StripeApp = (props) => {
  const  dispatch = useDispatch()
  const [cardDetails, setCardDetails] = useState();
  const{carId,startDate, endDate,pickupHour,leftHour, priceTotal,  payment,statusBooking}=props
  const { confirmPayment} = useConfirmPayment();
  const [loading, setLoading]= useState(false);
  const fetchPaymentIntentClientSecret = async () => {
    setLoading(true)
    const response = await axios(`https://driveit-app.herokuapp.com/create-payment-intent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer sk_test_51LORjaDDc38cnPECzpnd76z4oclZZ7uDuMWgxJQ4T07TtIrMpTC17g73QBlKCLdtzY8fEMivBCa7hx9BEmMmJ0S20058KxwRC1`,
      },
    });
    const { clientSecret} = await response.data;
    setLoading(false)
    return { clientSecret};
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: "example@hotmail.com",
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        let toast = Toast.show('Huboun error', {
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
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          
          const data ={
            carId: carId,
            startDate: startDate,
            endDate: endDate,
            pickupHour: pickupHour,
            leftHour: leftHour,
            priceTotal: priceTotal,
            payment: "creditcar",
            statusBooking:"Active"
          }
      
          try{
              const token = await AsyncStorage.getItem('token')
              if(token !== null){
                setLoading(true)
              try {
              const data1 = await axios.post(
                  `https://driveit-app.herokuapp.com/bookings/create/`, 
                  data,
                  {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      
              },
              });
                  setLoading(false)
                  dispatch(getUser())
                  RootNavigation.navigate("SuccessfullBooking")
          } catch (err) {
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
          }
          };
      
      } catch(err){
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
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };
    return (
        <View
        style={styles.container}>
            <Text style={{color: "black",
            fontFamily:"Poppins_400Regular",
            fontSize: 15, marginTop:15}}>Ingresa tu información bancaria</Text>
          {loading === true && <AppLoader/>}
        
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
                        ]}  onPress={handlePayPress} >
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