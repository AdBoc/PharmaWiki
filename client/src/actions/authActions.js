import axios from 'axios';
import {
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
                console.log(response.data.token);
                const token = response.data.token //badz repsonse.data
                localStorage.setItem('token', JSON.stringify(token));
                dispatch(success(token))
            })
            .catch(error => {
                dispatch(failure(error.message))
            });
    };

    function requestUser() { return { type: LOGIN_REQUEST } }
    function success(token) { return { type: LOGIN_SUCCESS, payload: token } }
    function failure(error) { return { type: LOGIN_FAILURE, payload: error } }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_SUCCESS
    }
}