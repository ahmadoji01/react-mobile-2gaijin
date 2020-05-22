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
                localStorage.setItem("user_id", data._id);
                localStorage.setItem("first_name", data.first_name);
                localStorage.setItem("last_name", data.last_name);
                localStorage.setItem("email", data.email);
                localStorage.setItem("access_token", data.authentication_token);
                localStorage.setItem("refresh_token", data.refresh_token);
            }
            return data;
        });
    }

    logout() {
        localStorage.removeItem("user_id");
        localStorage.removeItem("first_name");
        localStorage.removeItem("last_name");
        localStorage.removeItem("email");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
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

    refreshToken() {
        return axios.post("/refresh_token", {}, {
            headers: {
                "Authorization": localStorage.getItem("refresh_token")
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                localStorage.setItem("access_token", response.data.data["auth_token"]); 
            }
        });
    }

    getCurrentUser() {
        return localStorage.getItem("access_token");
    }
}

export default new AuthService();
