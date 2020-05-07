import axios from 'axios';

class UserService {
    getSubstances(url) {
        let token = localStorage.getItem('token');
        if (token) token = token.replace(/^"(.*)"$/, '$1');

        return axios.get(`http://localhost:2137/api/active/${url}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err.message)
                return {}
            });
    }

    getProducts(url) {
        let token = localStorage.getItem('token');
        if (token) token = token.replace(/^"(.*)"$/, '$1');

        return axios.get(`http://localhost:2137/api/products/${url}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err.message)
                return {}
            });
    }

    getActiveProducts(query) {
        let token = localStorage.getItem('token');
        if (token) token = token.replace(/^"(.*)"$/, '$1');

        return axios.get(`http://localhost:2137/api/products/active/${query}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err.message)
                return {}
            });
    }
}

const userService = new UserService();
export default userService;