import React, { Component } from 'react';
import authService from './authService';
import axios from 'axios';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        isLogged: false,
        response: ''
    }

    handleUserChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin = (e) => {
        e.preventDefault();
        authService.login(this.state.username, this.state.password);
        this.setState({ isLogged: true })
    }

    logout = (e) => {
        e.preventDefault();
        authService.logout();
    }

    getUserInfo = (e) => {
        e.preventDefault();
        let parser = JSON.parse(localStorage.getItem('user'));

        axios.get('http://localhost:2137/api/user/me', { headers: { Authorization: `Bearer ${parser.token}` } })
            .then(response => {
                this.setState({ response: JSON.stringify(response.data) })
            })
            .catch(err => { console.log(err.message) });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin} className="login">
                    <label>Email<input onChange={this.handleUserChange} value={this.state.username} required /></label>
                    <label>Password<input onChange={this.handlePasswordChange} value={this.state.password} required /></label>
                    <input type="submit" value="Submit" />
                </form>
                <input type="submit" value="logout" onClick={this.logout} />
                <input type="submit" value="getInfo" onClick={this.getUserInfo} />
                <p>Response: {this.state.response}</p>
            </div>
        )
    }
}
