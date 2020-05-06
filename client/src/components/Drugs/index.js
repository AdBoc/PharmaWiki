import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GeneratedData from './GeneratedData'
import './drugs.scss'

class Drugs extends Component {
    render() {
        return this.props.isLogged ? (
            <div className="body">
                <p>Welcome to Drug Wiki</p>
                <GeneratedData />
            </div>
        ) : (
                <div className="body">
                    <p>Welcome to Drug Wiki</p>
                    <p>To use website you need to be logged in</p>
                    <Link to={'/login'}><button>Login</button></Link>
                    <Link to={'/register'}><button>Register</button></Link>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.authentication.isLogged,
    }
}

export default connect(mapStateToProps)(Drugs);