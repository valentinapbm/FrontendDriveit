import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/User.reducer';
import carReducer from './reducers/Car.reducer';

const rootReducer = combineReducers({
    userReducer,carReducer
});

const middleware = applyMiddleware(thunk);
export const store = createStore(rootReducer, middleware);