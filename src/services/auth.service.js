import axios from "axios";
import Cookies from 'js-cookie';

class AuthService {
    login(email, password) {
        var payload = {
            "email": email,
            "password": password,
        }
        return axios
        .post("/sign_in", payload, { 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            var data = response.data.data;
            if (data["authentication_token"]) {
                localStorage.setItem("first_name", data.first_name);
                localStorage.setItem("last_name", data.last_name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("access_token", data.authentication_token);
            }
            return data;
        });
    }

    logout() {
        localStorage.removeItem("first_name");
        localStorage.removeItem("last_name");
        localStorage.removeItem("email");
        localStorage.removeItem("access_token");
    }

    register(email, firstname, lastname, password) {
        var payload = {
            "email": email,
            "password": password,
            "first_name": firstname,
            "last_name": lastname
        }
        return axios.post("/sign_up", payload, {
            headers: { 
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data["authentication_token"]) {
                localStorage.setItem("access_token", response.data["authentication_token"]);
            }
            return response.data;
        });
    }

    getCurrentUser() {
        return localStorage.getItem("access_token");
    }
}

export default new AuthService();
