import React, { Component } from "react";
import { Page, LoginScreenTitle, List, ListItem, ListInput, ListButton, BlockFooter } from "framework7-react";
import AuthService from "../../../services/auth.service.js";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GaijinLogo from "../../illustrations/GaijinLogo.png";
import "./SignIn.scss";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirectTo: "/",
            valid: false,
        };

        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
        if(typeof(this.props.redirectTo) !== "undefined") {
            this.setState({ redirectTo: "/" + this.props.redirectTo });
        }
    }

    redirect() {
        this.$f7router.navigate(this.state.redirectTo);
    }

    render() {

        let msg;
        if(this.state.message) {
            msg = <BlockFooter>{this.state.message}</BlockFooter>
        }

        return (
            <Page noToolbar noNavbar noSwipeback loginScreen>
            <LoginScreenTitle><div ><img style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }} src={GaijinLogo} /></div></LoginScreenTitle>
            <h4 style={{ textAlign: "center", fontWeight: 700 }}>Secondhand Platform for Foreigners</h4>
            <div className="container">
                <List form>
                    <ListInput
                    label="Email"
                    type="email"
                    placeholder="Your email"
                    required
                    validate
                    value={this.state.email}
                    onInput={(e) => {
                        this.setState({ email: e.target.value});
                    }}
                    onValidate={(isValid) => this.setState({ valid: isValid })}
                    />
                    <ListInput
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    required
                    validate
                    value={this.state.password}
                    onInput={(e) => {
                        this.setState({ password: e.target.value});
                    }}
                    onValidate={(isValid) => this.setState({ valid: isValid })}
                    />
                    {msg}
                    <ListItem><a href={`/reset-password/`}>Forgot password?</a></ListItem>
                </List>
                <List>
                    <ListButton onClick={this.handleLogin.bind(this)}>Sign In</ListButton>
                </List>
                <List>
                    <GoogleLogin
                        clientId="880692175404-smp8q2u85pehekh59lk2pj2n4t39u7ha.apps.googleusercontent.com"
                        buttonText="Sign In with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        appId="936813033337153"
                        autoLoad
                        fields="name,first_name,last_name,email,picture"
                        callback={this.responseFacebook} 
                    />
                </List>
                <List>
                    <BlockFooter>Don't have an account? <a href={`/sign-up${this.state.redirectTo}`}>Sign Up</a></BlockFooter>
                </List>
            </div>
            </Page>
        )
    }

    responseGoogle = (response) => {
        if(typeof(response.accessToken) !== "undefined") {
            var accessToken = response.accessToken;
            var self = this;
            AuthService.oauthLogin(accessToken).then(
            response => {
                if(!localStorage.getItem("access_token")) {
                    this.setState({
                        loading: false,
                        message: response.message
                    });
                } else {
                    self.redirect();
                }
            });
        }
    }

    responseFacebook = (response) => {
        console.log(response);
        if(typeof(response.accessToken) !== "undefined") {
            var accessToken = response.accessToken;
            var id = response.id;
            var self = this;
            AuthService.oauthFacebookLogin(id, accessToken).then(
            response => {
                if(!localStorage.getItem("access_token")) {
                    this.setState({
                        loading: false,
                        message: response.message
                    });
                } else {
                    self.redirect();
                }
            });
        }
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        if(this.state.valid) {
            var self = this;
            AuthService.login(this.state.email, this.state.password).then(
            response => {
                if(!localStorage.getItem("access_token")) {
                    this.setState({
                        loading: false,
                        message: response.message
                    });
                } else {
                    self.redirect();
                }
            });
        }
    }
}

export default SignIn;