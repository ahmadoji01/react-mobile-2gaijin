import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";

import { isEmail } from "validator";

const required = value => {
    if (!value) {
        return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
        <div className="alert alert-danger" role="alert">
            This is not a valid email.
        </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.email, this.state.password).then(
            () => {
                //this.props.history.push("/profile");
                console.log(localStorage.getItem('user'));
            },
            error => {
                const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

                this.setState({
                loading: false,
                message: resMessage
                });
            }
            );
        } else {
            this.setState({
            loading: false
            });
        }
    }
    
    render() {
        return (
            <div className="App">
                <div className="page">
                    <div className="navbar navbar-page">
                        <div className="navbar-inner sliding">
                            <div className="left">
                                <a href="/" className="link back">
                                    <i className="fas fa-arrow-left"></i>
                                </a>
                            </div>
                            <div className="title">
                                Sign In
                            </div>
                            <div className="right"></div>
                        </div>
                    </div>
                    <div className="page-content">
                        <div className="sign-in segments">
                            <div className="container">
                                <Form className="list"
                                    onSubmit={this.handleLogin}
                                    ref={c => {this.form = c;}}
                                    >
                                    <ul>
                                        <li className="item-content item-input">
                                            <div className="item-inner">
                                                <div className="item-input-wrap">
                                                    <Input
                                                        placeholder="Email"
                                                        type="text"
                                                        onChange={this.onChangeEmail}
                                                        className="form-control"
                                                        validations={[required, email]}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="item-content item-input">
                                            <div className="item-inner">
                                                <div className="item-input-wrap">
                                                    <Input
                                                        placeholder="Password"
                                                        type="password"
                                                        onChange={this.onChangePassword}
                                                        className="form-control"
                                                        validations={[required]}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="wrap-link-action">
                                        <ul>
                                            <li>
                                                <label className="item-checkbox item-content">
                                                    <input type="checkbox" />
                                                    <i className="icon icon-checkbox"></i>
                                                    <div className="item-inner">
                                                        <div className="item-title">Remember me</div>
                                                    </div>
                                                </label>
                                            </li>
                                            <li><a href="#">Forgot Password</a></li>
                                        </ul>
                                    </div>
                                    <div className="content-button">
                                        <button
                                            className="button primary-button"
                                            disabled={this.state.loading} >
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                            <span>Sign In</span>
                                        </button>
                                    </div>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={c => {this.checkBtn = c;}}
                                    />
                                </Form>

                                <div className="divider-space-content"></div>

                                <div className="wrap-sign-in-with">
                                    <div className="title">
                                        <p>or sign in with</p>
                                        <span></span>
                                    </div>
                                    <div className="wrap-media-sign-in">
                                        <div className="row">
                                            <div className="col-33">
                                                <a href="#">
                                                    <div className="content bg-facebook">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-33">
                                                <a href="#">
                                                    <div className="content bg-twitter">
                                                        <i className="fab fa-twitter"></i>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="col-33">
                                                <a href="#">
                                                    <div className="content bg-google">
                                                        <i className="fab fa-google"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="divider-space-content"></div>

                                <div className="wrap-link-sign-in">
                                    <p>Don't have an account? <a href="/register/">Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Login; 