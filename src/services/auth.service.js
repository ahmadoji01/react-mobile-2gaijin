import axios from "axios";
import Cookies from 'js-cookie';

class AuthService {
    login(email, password) {
        var payload = {
            "email": email,
            "password": password,
        }
        
        return axios
        .post(`https://go.2gaijin.com/sign_in`, payload, { 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            var resData = response.data.data;
            if(resData) {
                var data = response.data.data.user;
                localStorage.setItem("user_id", data._id);
                localStorage.setItem("first_name", data.first_name);
                localStorage.setItem("last_name", data.last_name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("access_token", data.authentication_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                return data;
            } else {
                return response.data;
            }
        });
    }

    oauthLogin(accessToken) {
        var payload = {
            "access_token": accessToken
        }
        
        return axios
        .post(`https://go.2gaijin.com/auth/google/callback`, payload, { 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            var resData = response.data.data;
            if(resData) {
                var data = response.data.data.user;
                localStorage.setItem("user_id", data._id);
                localStorage.setItem("first_name", data.first_name);
                localStorage.setItem("last_name", data.last_name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("access_token", data.authentication_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                return data;
            } else {
                return response.data;
            }
        });
    }

    oauthFacebookLogin(id, accessToken) {
        var payload = {
            "id": id,
            "access_token": accessToken
        }
        
        return axios
        .post(`https://go.2gaijin.com/auth/facebook/callback`, payload, { 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            var resData = response.data.data;
            if(resData) {
                var data = response.data.data.user;
                localStorage.setItem("user_id", data._id);
                localStorage.setItem("first_name", data.first_name);
                localStorage.setItem("last_name", data.last_name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("access_token", data.authentication_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                return data;
            } else {
                return response.data;
            }
        });
    }

    logout() {
        
        return axios.post(`https://go.2gaijin.com/sign_out`, {}, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("access_token")
            }
        }).then(response => {
            localStorage.removeItem("user_id");
            localStorage.removeItem("first_name");
            localStorage.removeItem("last_name");
            localStorage.removeItem("email");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        });
    }

    register(email, firstname, lastname, password) {
        var payload = {
            "email": email,
            "password": password,
            "first_name": firstname,
            "last_name": lastname
        }
        return axios.post(`https://go.2gaijin.com/sign_up`, payload, {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then(response => {
            var resData = response.data.data;
            if(resData) {
                var data = response.data.data.user;
                if (data["authentication_token"]) {
                    localStorage.setItem("user_id", data._id);
                    localStorage.setItem("first_name", data.first_name);
                    localStorage.setItem("last_name", data.last_name);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("access_token", data.authentication_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                }
            }
            return response.data;
        });
    }

    refreshToken() {
        return axios.post(`https://go.2gaijin.com/refresh_token`, {}, {
            headers: {
                "Authorization": localStorage.getItem("refresh_token")
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                var jsonData = response.data.data;
                localStorage.setItem("access_token", jsonData.token["auth_token"]); 
            }
        });
    }

    getCurrentUser() {
        return localStorage.getItem("access_token");
    }
}

export default new AuthService();
