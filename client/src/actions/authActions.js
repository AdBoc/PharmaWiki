import axios from 'axios';
import { history } from '../helpers/history'
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS
} from '../constants';

export function login(username, password) {
    return dispatch => {
        dispatch(requestUser())
        axios.post('http://localhost:2137/api/user/login', {}, {
            auth: {
                username: username,
                password: password
            }
        })
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', JSON.stringify(token));
                dispatch(success())
                history.push('/');
            })
            .catch(error => {
                dispatch(failure(error.message))
            });
    };

    function requestUser() { return { type: LOGIN_REQUEST } }
    function success() { return { type: LOGIN_SUCCESS } }
    function failure(error) { return { type: LOGIN_FAILURE, payload: error } }
}

export function register(username, email, password) {
    return dispatch => {
        dispatch(requestUser());
        axios.post('http://localhost:2137/api/user/signup', {
            username: username,
            email: email,
            password: password
        })
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', JSON.stringify(token));
                dispatch(success())
                history.push('/');
            })
            .catch(error => {
                dispatch(failure(error.message))
            })
    }

    function requestUser() { return { type: REGISTER_REQUEST } }
    function success() { return { type: REGISTER_SUCCESS } }
    function failure(error) { return { type: REGISTER_FAILURE, payload: error } }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_SUCCESS
    }
}