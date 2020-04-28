import {authentication} from './authReducer';
import { combineReducers } from "redux";
//import errorReducer from './errorReducer';

export default combineReducers({
    auth: authentication
});

// +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()