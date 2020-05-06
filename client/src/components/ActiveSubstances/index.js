import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GeneratedData from './GeneratedData'
import axios from 'axios';

class Drugs extends Component {
    state = {
        query: '',
        data: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentDidUpdate(prevProps) {
        let token = localStorage.getItem('token');
        if (token) token = token.replace(/^"(.*)"$/, '$1');
        if (this.props.location !== prevProps.location) {
            console.log('now url is changed');
            const path = this.props.location.pathname.match(/(\w|\d){1,}$/);
            if (path) {
                axios.get(`http://localhost:2137/api/active/${path[0]}`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    .then(res =>
                        this.setState({
                            data: res.data
                        })
                    )
                    .catch(err => {
                        console.log(err.message);
                        this.setState({
                            data: ''
                        })
                    });
            }
            else {
                axios.get(`http://localhost:2137/api/active/`, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    .then(res =>
                        this.setState({
                            data: res.data
                        })
                    )
                    .catch(err => {
                        console.log(err.message);
                        this.setState({
                            data: ''
                        })
                    });
            }
        }
    }

    componentDidMount() {

        let token = localStorage.getItem('token');
        if (token)
            token = token.replace(/^"(.*)"$/, '$1');
        axios.get(`http://localhost:2137/api/active/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res =>
                this.setState({
                    data: res.data
                })
            )
            .catch(err => {
                console.log(err.message);
                this.setState({
                    data: ''
                })
            });
    }

    render() {
        return this.props.isLogged ? (
            <div>
                <p>Welcome to Drug Wiki</p>

                <form onSubmit={this.handleSubmit}>
                    <label>Search for Active Substances<input name="query" onChange={this.handleChange} /></label>
                    <Link to={`/active/${this.state.query}`}><button>Submit</ button></Link>
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

export default connect(mapStateToProps)(Drugs);