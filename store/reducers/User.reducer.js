import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RootNavigation from "../../components/RootNavigation"
import Toast from 'react-native-root-toast';


export const USER_ID = 'USER_ID';
export const USER_ROLE = 'USER_ROLE';
export const USER_NAME = 'USER_NAME';
export const USER_LASTNAME = 'USER_LASTNAME';
export const USER_EMAIL = 'USER_EMAIL';
export const USER_PASSWORD = 'USER_PASSWORD';
export const USER_IMAGE = 'USER_IMAGE';
export const USER_CARS = 'USER_CARS';
export const USER_BOOKINGS = 'USER_BOOKINGS';
export const USER_REVIEWS = 'USER_REVIEWS';
export const USER_BIRTHDAY = 'USER_BIRTHDAY';
export const USER_GENDER = 'USER_GENDER';



export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';
export const USER_GETUSER_TOKEN = 'USER_GETUSER_TOKEN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

export const getUser = (route) => {

    return async (dispatch) => {
        try{
            const token = await AsyncStorage.getItem('token')
            if(token !== null){
                if(route==="startagain"){
                dispatch({ type: USER_GETUSER_TOKEN });}
                if(route === "login"){
                    dispatch({ type: USER_LOGIN_REQUEST })
                }
   
            try {
            const data = await axios({
            method: 'GET',
            baseURL: 'https://driveit-app.herokuapp.com/users/getuser',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            const user = data.data;
            dispatch({ type: USER_ROLE, payload: user.role });
            dispatch({ type: USER_NAME, payload: user.name });
            dispatch({ type: USER_LASTNAME, payload: user.lastname });
            dispatch({ type: USER_EMAIL, payload: user.email });
            dispatch({ type: USER_PASSWORD, payload: user.password });
            dispatch({ type: USER_IMAGE, payload: user.image });
            dispatch({ type: USER_BOOKINGS, payload: user.bookings });
            dispatch({ type: USER_REVIEWS, payload: user.reviews });
            dispatch({ type: USER_BIRTHDAY, payload: user.birthday });
            dispatch({ type: USER_GENDER, payload: user.gender });
            dispatch({ type: USER_CARS, payload: user.cars });

            dispatch({ type: USER_LOGIN_SUCCESS });
            
            if(route === "login"){
            RootNavigation.navigate('Inicio')}
            
        } catch (err) {
            dispatch({ type: USER_ERROR, payload: err });
            
        }
        };
    
    } catch(err){
        console.log(error.message)
    };
}
}
    export const postLogin = (loginState) => {
        return async (dispatch) => {
            dispatch({ type: USER_LOGIN_REQUEST })
        try {
        const res = await axios.post(
            'https://driveit-app.herokuapp.com/users/signin',
            loginState
        );
        await AsyncStorage.setItem('token', res.data.data);
        dispatch({ type: USER_LOGIN_SUCCESS });
        dispatch(getUser("login"));
        } catch (error) {
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
        if(error.response.data.message === "user or password invalid" || error.response.data.message === "Password updated" || error.response.data.message === "user / password invalid"){
        dispatch({ type: USER_LOGIN_ERROR, payload: "user or password invalid" });
            }else{
            dispatch({ type: USER_LOGIN_ERROR});}
        }
    };
};
    //action creator: Register
    export const postRegister = (registerState) => {

        return async (dispatch) => {
            dispatch({ type: USER_REGISTER_REQUEST })
        try {
            const res = await axios.post(
            'https://driveit-app.herokuapp.com/users/signup',
            registerState
            );
            await AsyncStorage.setItem('token', res.data.data.token);
            
            dispatch({ type: USER_REGISTER_SUCCESS, payload: res });
            dispatch(getUser("login"));
        } catch (error) {
                if (
                error.response.data.data.errors.email.message === 'email already exist'
                ) {
                dispatch({
                    type: USER_REGISTER_ERROR,
                    payload: error.response.data.data.errors.email.message,
                });
                }
        }
        };
    };

    export const deleteAccount = () => {
        return async (dispatch) => {
            dispatch({ type: USER_REGISTER_REQUEST })
            try{
                const token = await AsyncStorage.getItem('token')
                if(token !== null){
                try {
            const res = await axios.delete(
            'https://driveit-app.herokuapp.com/users/delete',
            {
            headers: {
            
            Authorization: `Bearer ${token}`,
            }});



            RootNavigation.navigate('Login');
            dispatch({ type: USER_REGISTER_SUCCESS, payload: res });
            dispatch(signOutSuccess());
            dispatch(getCars())
        } catch (error) {
            dispatch({
                type: USER_REGISTER_ERROR,
                payload: error,
            });
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
        }
        };
    }catch(err){
        console.log(err)
    };
    }}
    
    //action creator: Register
    export const updateUser = (value) => {

        return async (dispatch) => {
            dispatch({ type: USER_REGISTER_REQUEST })
            try{
                const token = await AsyncStorage.getItem('token')
                if(token !== null){
                try {
                const data = await axios.put(
                    'https://driveit-app.herokuapp.com/users/update', 
                    value,
                    {
                    headers: {
                    
                    Authorization: `Bearer ${token}`,
                    
                    
                },
                });
                
                if(data.status === 200){

                let toast = Toast.show('Perfil actualizado exitosamente', {
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
                dispatch(getUser());
                dispatch({ type: USER_REGISTER_SUCCESS, payload: res });
                
            } catch (err) {
                dispatch({ type: USER_ERROR, payload: err });
            }
            };
        
        } catch(err){
            console.log(err)
        };
    }
    }

    export const updateImageUser = (value) => {

        return async (dispatch) => {
            try{
                const token = await AsyncStorage.getItem('token')
                if(token !== null){
                try {
                const data = await axios.put(
                    'https://driveit-app.herokuapp.com/users/updateImage', 
                    value,
                    {
                    headers: {
                    
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    
                    
                },
                });
                dispatch(getUser());
                
            } catch (err) {
                dispatch({ type: USER_ERROR, payload: err });
            }
            };
        
        } catch(err){
            console.log(error.response,message)
        };
    }
    }
    export const signOutSuccess = () => {
        return async (dispatch) => {
            dispatch({ type: USER_REGISTER_REQUEST })
            try{
                const token = await AsyncStorage.removeItem('token')
                RootNavigation.navigate('Cuenta');
                dispatch({ type: USER_LOGOUT_SUCCESS });
            }catch(err){
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
    };

    const initialState = {
        loading: false,
        isLoggedIn: false,
        isalreadyatoken:false,
        error: null,
        errorLogin: null,
        errorUser:null,
        errorRegister:null,
        role: null,
        name:null,
        lastname:null,
        email: null,
        password: null,
        image: null,
        cars: [],
        bookings: [],
        reviews: [],
        birthday: null,
        gender: null,

    };
    
    const userReducer = (state = initialState, action) => {
        switch (action.type) {
            case USER_GETUSER_TOKEN:
        return {
            ...state,
            isLoggedIn: true,
            isalreadyatoken: true,
            error: null,
        };
        case USER_LOGIN_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            loading: false,
            error: null,
            
            isalreadyatoken: false,
        };
        case USER_LOGIN_REQUEST:
        return {
        ...state,
        loading: true,
        isLoggedIn: false,
        errorLogin: null,
        };

        case USER_LOGIN_ERROR:
        return {
        ...state,
        errorLogin: action.payload,
        token: null,
        loading: false,
        isLoggedIn: false,
        };
        case USER_REGISTER_REQUEST:
        return {
            ...state,
            loading: true,
            isLoggedIn: false,
        };
        case USER_REGISTER_SUCCESS:
        return {
            ...state,
            isLoggedIn: true,
            loading: false,
        };
        case USER_REGISTER_ERROR:
        return {
            ...state,
            errorRegister: action.payload,
            isLoggedIn: false,
            loading: false,
        };
            case USER_ROLE:
        return {
            ...state,
            role: action.payload,
        };
        case USER_NAME:
        return {
            ...state,
            name: action.payload,
        };
        case USER_LASTNAME:
            return {
                ...state,
                lastname: action.payload,
            };
        case USER_EMAIL:
        return {
            ...state,
            email: action.payload,
        };
        case USER_PASSWORD:
        return {
            ...state,
            password: action.payload,
        };
        case USER_IMAGE:
        return {
            ...state,
            image: action.payload,
        };
        case USER_CARS:
        return {
            ...state,
            cars: action.payload,
        };
        case USER_BOOKINGS:
        return {
            ...state,
            bookings: action.payload,
        };
        case USER_REVIEWS:
        return {
            ...state,
            reviews: action.payload,
        };
        case USER_GENDER:
            return {
                ...state,
                gender: action.payload,
            };
        case USER_BIRTHDAY:
            return {
                ...state,
                birthday: action.payload,
        };

        case USER_ERROR:
            return {
                ...state,
                errorUser: action.payload,
                isLoggedIn: false,
                loading: false,
            };
        case USER_LOGOUT_SUCCESS:

                return {
                ...state,
                loading: false,
                isLoggedIn: false,
                isalreadyatoken:false,
                error: null,
                errorLogin: null,
                errorUser:null,
                errorRegister:null,
                role: null,
                fullname:null,
                email: null,
                password: null,
                image: null,
                cars: [],
                bookings: [],
                reviews: [],
                birthday: null,
                gender: null,
                };
        default:
            return state;
        }
    };
    
    export default userReducer;