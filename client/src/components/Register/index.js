import React, { Component } from 'react';

class Drugs extends Component {
    state = {
        response: ''
    }

    // componentDidMount(){
    //     this.callApi()
    //     .then(res => this.setState({ response: res.product }))
    //     .catch(err => console.log(err));
    // }

    // callApi = async() => {
    //     const response = await fetch('/api/products/');
    //     const body = await response.json();
    //     if(response.status !== 200) throw Error(body.message);
    //     return body;
    // }

    render() {
        return (
            <div>
                <form className="login">
                    <label className="login__element">Email<input required /></label>
                    <label className="login__element">Password<input required /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Drugs;