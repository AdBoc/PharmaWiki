import React, { Component } from 'react';
import axios from 'axios';

export default class User extends Component {
    state = {
        username: '',
        email: ''
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        token = token.replace(/^"(.*)"$/, '$1');

        axios.get(`http://localhost:2137/api/user/me`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res =>
                this.setState({
                    username: res.data.username,
                    email: res.data.email
                })
            )
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
            </div>
        )
    }
}

