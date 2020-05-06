import axios from "axios";

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
                localStorage.setItem("user", JSON.stringify(data));
            }
            return data;
        });
    }

    logout() {
        localStorage.removeItem("user");
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
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            console.log(response.data);
            return response.data;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
