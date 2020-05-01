import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login, logout } from '../../actions/authActions';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    formSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.tryLogin(username, password);
    }

    logoutButton = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.formSubmit}>
                    <label>Email<input name="username" value={this.state.username} onChange={this.handleChange} required /></label>
                    <label>Password<input name="password" value={this.state.password} onChange={this.handleChange} required /></label>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.logoutButton}>Logout button</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryLogin: (username, password) => dispatch(login(username, password)),
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Login);
