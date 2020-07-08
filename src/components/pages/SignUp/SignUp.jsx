import React, { Component } from "react";
import { Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter } from "framework7-react";
import AuthService from "../../../services/auth.service.js";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GaijinLogo from "../../illustrations/GaijinLogo.png";
import "./SignUp.scss";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: '',
            password: '',
            confirmPassword: "",
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
                    label="First Name"
                    type="text"
                    placeholder="Your first name"
                    value={this.state.firstName}
                    required
                    validate
                    onValidate={(isValid) => this.setState({ valid: isValid })}
                    onInput={(e) => {
                        this.setState({ firstName: e.target.value});
                    }}
                    />
                    <ListInput
                    label="Last Name"
                    type="text"
                    placeholder="Your last name"
                    value={this.state.lastName}
                    required
                    validate
                    onValidate={(isValid) => this.setState({ valid: isValid })}
                    onInput={(e) => {
                        this.setState({ lastName: e.target.value});
                    }}
                    />
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
                    value={this.state.password}
                    required
                    validate
                    onValidate={(isValid) => this.setState({ valid: isValid })}
                    onInput={(e) => {
                        this.setState({ password: e.target.value});
                    }}
                    />
                    <ListInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    required
                    validate
                    onValidate={(isValid) => this.setState({ valid: isValid })}
                    onInput={(e) => {
                        this.setState({ confirmPassword: e.target.value});
                    }}
                    />
                    {msg}
                </List>
                <List>
                    <ListButton onClick={this.handleRegister.bind(this)}>Sign Up</ListButton>
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
                        callback={() => this.responseFacebook} 
                    />
                </List>
                <List>
                    <BlockFooter>Already have an account? <a href={`/sign-in${this.state.redirectTo}`}>Sign In</a></BlockFooter>
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

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        if(this.state.password !== this.state.confirmPassword) {
            this.setState({ message: "Password does not match", loading: false });
            return;
        }

        if(this.state.valid) {
            var self = this;
            AuthService.register(
                this.state.email,
                this.state.firstname,
                this.state.lastname,
                this.state.password
            ).then( response => {
                if(localStorage.getItem("access_token")) {
                    this.setState({
                        message: response.message,
                        loading: false
                    });
                    self.redirect();
                } else {
                    this.setState({
                        message: response.message,
                        loading: false
                    });
                }
            });
        }
    }
}

export default SignUp;