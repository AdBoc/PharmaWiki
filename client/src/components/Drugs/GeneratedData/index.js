import React, { Component } from 'react';
import axios from 'axios';

export default class GeneratedData extends Component {
    state = {
        query: '',
        isChecked: false,
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
            .catch(err => {
                console.log(err.message)
                this.setState({
                    data: ''
                })
            });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    toggleChange = (e) => {
        const { name } = e.target;
        this.setState({
            [name]: !this.state.isChecked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('token');
        token = token.replace(/^"(.*)"$/, '$1');

        if (this.state.isChecked) {
            axios.get(`http://localhost:2137/api/products/active/${this.state.query}`, {
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
                    console.log(err.message)
                    this.setState({
                        data: ''
                    })
                });
        } else {
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
                .catch(err => {
                    console.log(err.message)
                    this.setState({
                        data: ''
                    })
                });
        }
        this.setState({
            query: ''
        })
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
                <div> Nothing was found</div>
            );

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Search for Drug<input name="query" value={this.state.query} onChange={this.handleChange} /></label>
                    <input type='checkbox' name="isChecked" checked={this.state.isChecked} onChange={this.toggleChange} />
                    <input type="submit" value="Submit" />
                </form>
                {drugsList}
            </div>
        )
    }
}
