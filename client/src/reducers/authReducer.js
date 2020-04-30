import {
    // REGISTER_REQUEST,
    // REGISTER_SUCCESS,
    // REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_FAILURE
} from '../constants';

const initialState = {
    isLogging: false,
    isLogged: false,
    data: '',
    error: ''
}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLogging: true,
                isLogged: false
            }
        case LOGIN_SUCCESS:
            return {
                isLogging: false,
                isLogged: true,
                data: action.payload
            }
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
        default:
            return state;
    }
}