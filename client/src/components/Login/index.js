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

                <p>Info isLogged: {this.props.isLogged.toString()}</p>
                <p>Info isLogging: {this.props.isLogging.toString()}</p>
                <p>Info data: {this.props.data}</p>
                <p>Info error: {this.props.error}</p>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.authentication.isLogged,
        isLogging: state.authentication.isLogging,
        data: state.authentication.data,
        error: state.authentication.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryLogin: (username, password) => dispatch(login(username, password)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
