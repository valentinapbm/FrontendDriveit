import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../../components/RootNavigation"
import Toast from 'react-native-root-toast';
import { getUser } from "./User.reducer";
import { useDispatch } from "react-redux";

export const CARS_REQUEST = 'CARS_REQUEST';
export const CARS_SUCCESS = 'CARS_SUCCESS';
export const CARS_ERROR = 'CARS_ERROR';

export const CAR_REQUEST= "CAR_REQUEST";
export const CAR_SUCCESS= "CAR_SUCCESS";
export const CAR_ERROR= "CAR_ERROR";


export const CARCREATE_SUCCESS = 'CARCREATE_SUCCESS';
export const CARCREATE_ERROR = 'CARCREATE_ERROR';
export const CARCREATE_REQUEST = 'CARCREATE_REQUEST';


export const createCar = (formData) => {

    return async (dispatch) => {
        try{
            const token = await AsyncStorage.getItem('token')
            if(token !== null){
                dispatch({ type: CARCREATE_REQUEST })
            try {
            const data = await axios.post(
                'https://driveit-app.herokuapp.com/cars/create', 
                formData,
                {
                headers: {
                
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
            },
            });
            if(data.status === 201){
                dispatch(getCars())
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

                dispatch(getUser());
            dispatch({ type: CARCREATE_SUCCESS});
        } catch (err) {
            console.log(err)
        }
        };
    
    } catch(err){
        console.log(error.response,message)
    };
}
};

export const getCars = () => {
    return async (dispatch) => {
        try {
            dispatch({ type:  CARS_REQUEST });
            const data = await axios({
            method: 'GET',
            baseURL: 'https://driveit-app.herokuapp.com/cars',
            });
            dispatch({ type: CARS_SUCCESS, payload: data.data });

        } catch (err) {
            dispatch({ type: CARS_ERROR, payload: err });
        } 
        };
    };
    export const getCarsbyId = (id) => {
        return async (dispatch) => {
            try {
                dispatch({ type:  CAR_REQUEST });
                const data = await axios({
                method: 'GET',
                baseURL: `https://driveit-app.herokuapp.com/cars/${id}`,
                });
                dispatch({ type: CAR_SUCCESS, payload: data.data });
            } catch (err) {
                dispatch({ type: CAR_ERROR, payload: err });
            } 
            };
        };

const initialState = {
    loading: false,
    error: null,
    cars: [],
    loadingCars: false,
    loadingCar:false,
    carData:{},
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARCREATE_REQUEST:
        return {
        ...state,
        loading: true,
        error:null
        };
    case CARCREATE_SUCCESS:
        return {
        ...state,
        loading:false,
        error:null
    };

    case CARCREATE_ERROR:
        return {
        ...state,
        error: action.payload,
        loading:false,

    };
    case CARS_REQUEST:
        return {
        ...state,
        loadingCars: true,
        error:null
        };
    case CARS_SUCCESS:
        return {
        ...state,
        loadingCars:false,
        error:null,
        cars:action.payload,
    };

    case CARS_ERROR:
        return {
        ...state,
        error: action.payload,
        loading:false,

    };
    case CAR_REQUEST:
        return {
        ...state,
        loadingCar: true,
        error:null
        };
    case CAR_SUCCESS:
        return {
        ...state,
        loadingCar:false,
        error:null,
        carData:action.payload,
    };

    case CAR_ERROR:
        return {
        ...state,
        error: action.payload,
        loadingCar:false,

    };

    default:
        return state;
}
};

export default carReducer;
