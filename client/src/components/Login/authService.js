import axios from "axios";

const session_url = "http://localhost:2137/api/";

class AuthService {
  login(username, password) {
    return axios.post(session_url + 'user/login', {}, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => {
        console.log(response.data.token);
        if (response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
      })
      .catch(error => console.log(error.message));
  }

     logout() {
       localStorage.removeItem('user');
     }

  //   register(username, email, password) {
  //     return axios.post(API_URL + "signup", {
  //       username,
  //       email,
  //       password
  //     });
  //   }

  //   getCurrentUser() {
  //     return JSON.parse(localStorage.getItem('user'));;
  //   }
}

export default new AuthService();