import React, { Component } from "react";
import { Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter } from "framework7-react";
import AuthService from "../../../services/auth.service.js";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirectTo: "/",
        };
    }

    componentWillMount() {
        if(typeof(this.props.redirectTo) !== "undefined") {
            this.setState({ redirectTo: "/" + this.props.redirectTo });
        }
    }

    render() {

        let msg;
        if(this.state.message) {
            msg = <BlockFooter>{this.state.message}</BlockFooter>
        }

        return (
            <Page noToolbar noNavbar noSwipeback loginScreen>
            <LoginScreenTitle>2Gaijin</LoginScreenTitle>
                <div className="container">
                    <List form>
                        <ListInput
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        value={this.state.email}
                        onInput={(e) => {
                            this.setState({ email: e.target.value});
                        }}
                        />
                        <ListInput
                        label="Password"
                        type="password"
                        placeholder="Your password"
                        value={this.state.password}
                        onInput={(e) => {
                            this.setState({ password: e.target.value});
                        }}
                        />
                        {msg}
                    </List>
                    <List>
                        <ListButton onClick={this.handleLogin.bind(this)}>Sign In</ListButton>
                        <BlockFooter>Don't have an account? <a href="/register/">Sign Up</a></BlockFooter>
                    </List>
                </div>
            </Page>
        )
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.email, this.state.password).then(
        response => {
            if(!localStorage.getItem("access_token")) {
                console.log(response.message);
                this.setState({
                    loading: false,
                    message: response.message
                });
            } else {
                this.$f7.views.main.router.navigate(this.state.redirectTo);
            }
        });
        
    }
}

export default SignIn;