import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAILURE,
    AUTHORIZE
} from '../constants';

const initialState = {
    isLogging: false,
    isLogged: false,
    error: ''
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                isLogging: true,
                isLogged: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                isLogging: false,
                isLogged: true
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                isLogging: false,
                isLogged: false,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLogged: false
            }
        case AUTHORIZE:
            return {
                ...state,
                isLogged: true
            }
        default:
            return state;
    }
}