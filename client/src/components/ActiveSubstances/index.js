import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GeneratedData from './GeneratedData'
import userService from '../../services/user.service'

class Substances extends Component {
    state = {
        query: '',
        data: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentDidMount() {
        userService.getSubstances('').then(data => {
            this.setState({
                data: data
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const path = this.props.location.pathname.match(/(\w|\d){1,}$/);
            if (path) {
                userService.getSubstances(path[0]).then(data => {
                    this.setState({
                        data: data
                    })
                })
            }
            else {
                userService.getSubstances('').then(data => {
                    this.setState({
                        data: data
                    })
                })
            }
        }
    }

    render() {
        return this.props.isLogged ? (
            <div>
                <p>Welcome to Drug Wiki</p>

                <form onSubmit={this.handleSubmit}>
                    <label>Search for Active Substances<input name="query" onChange={this.handleChange} /></label>
                    <Link to={`/substances/${this.state.query}`}><button>Submit</ button></Link>
                </form>

                <GeneratedData data={this.state.data} />
            </div >
        ) : (
                <div>
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

export default connect(mapStateToProps)(Substances);