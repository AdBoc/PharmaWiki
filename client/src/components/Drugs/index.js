import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GeneratedData from './GeneratedData'
import userService from '../../services/user.service'

class Drugs extends Component {
    state = {
        query: '',
        isChecked: false,
        data: '',
        page: 0,
        limit: 5
    }

    componentDidMount() {
        userService.getProducts('').then(data => {
            this.setState({
                data: data
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.isChecked) {
            userService.getActiveProducts(this.state.query).then(data => {
                this.setState({
                    data: data
                })
            })
        } else {
            userService.getProducts(this.state.query).then(data => {
                this.setState({
                    data: data
                })
            })
        }
    }

    toggleChange = (e) => {
        const { name } = e.target;

        this.setState((prevState) => {
            return { [name]: !this.state.isChecked }
        });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return this.props.isLogged ? (
            <div>
                <p>Welcome to Drug Wiki</p>

                <form onSubmit={this.handleSubmit}>
                    <label>Search for Drugs<input name="query" onChange={this.handleChange} /></label>
                    <input type='checkbox' name='isChecked' checked={this.state.isChecked} onChange={this.toggleChange} />
                    {/* <Link to={`/products/${this.state.query}`}><button type="button">Submit</ button></Link> */}
                    {/* <LinkButton to='/products/a'>button</LinkButton> */}
                    <input type="submit" value="submit" />
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

//localhost:2137/api/products?page=1&limit=3