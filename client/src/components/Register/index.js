import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';

class Drugs extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    registerButton = (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;
        this.props.tryRegister(username, email, password);
    }

    render() {
        return (
            <div>
                <form className="login" onSubmit={this.registerButton}>
                    <label className="login__element">User<input name="username" required onChange={this.handleChange} value={this.state.username} /></label>
                    <label className="login__element">Email<input name="email" required onChange={this.handleChange} value={this.state.email} /></label>
                    <label className="login__element">Password<input name="password" required onChange={this.handleChange} value={this.state.password} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryRegister: (username, email, password) => dispatch(register(username, email, password))
    }
}

export default connect(null, mapDispatchToProps)(Drugs);