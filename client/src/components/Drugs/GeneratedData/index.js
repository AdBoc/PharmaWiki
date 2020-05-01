import React, { Component } from 'react';
import axios from 'axios';

export default class GeneratedData extends Component {
    state = {
        query: '',
        data: []
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        token = token.replace(/^"(.*)"$/, '$1');
        axios.get('http://localhost:2137/api/products/', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res =>
                this.setState({
                    data: res.data
                })
            )
            .catch(err => console.log(err.message));
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token');
        token = token.replace(/^"(.*)"$/, '$1');
        axios.get(`http://localhost:2137/api/products/${this.state.query}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res =>
                this.setState({
                    data: res.data
                })
            )
            .catch(err => console.log(err.message));
    }

    render() {
        const { data } = this.state
        const drugsList = data.length ? (
            data.map((drug, index) => {
                return (
                    <div key={index}>
                        <p>Name: {drug.name}</p>
                        <p>Details: {drug.details}</p>
                    </div>
                )
            })
        ) : (
                <div> No data to show</div>
            );

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Search for Drug<input name="query" onChange={this.handleChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
                {drugsList}
            </div>
        )
    }
}
