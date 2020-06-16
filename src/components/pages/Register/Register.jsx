import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import './Register.scss';
import { isEmail } from "validator";
import AuthService from "../../../services/auth.service";

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
  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confpassword: "",
            successful: false,
            message: "",
            loading: false
        };
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
    }

    onChangeFirstname(e) {
        this.setState({
          firstname: e.target.value
        });
    }
    
    onChangeLastname(e) {
        this.setState({
          lastname: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confpassword: e.target.value
        });
    }
    
    handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false,
          loading: true
        });
    
        this.form.validateAll();

        if (this.state.password != this.state.confpassword) {
            alert("Passwords do not match");
        } else {
            if (this.checkBtn.context._errors.length === 0) {
                AuthService.register(
                    this.state.email,
                    this.state.firstname,
                    this.state.lastname,
                    this.state.password
                ).then(
                    response => {
                        if(localStorage.getItem("access_token")) {
                            this.setState({
                                message: response.data.message,
                                successful: true,
                                loading: false
                            });
                            this.$f7router.navigate("/");
                        } else {
                            this.setState({
                                successful: false,
                                message: response.message,
                                loading: false
                            });
                        }
                    });
            }
        }
    }
    

    render() {
        return (
            <div className="App">
                <div class="page">
                    <div class="navbar navbar-page">
                        <div class="navbar-inner sliding">
                            <div class="left">
                                <a href="/" class="link back">
                                    <i class="fas fa-arrow-left"></i>
                                </a>
                            </div>
                            <div class="title">
                                Sign Up
                            </div>
                            <div class="right"></div>
                        </div>
                    </div>
                    <div class="page-content">
                        <div class="sign-up segments">
                            <div class="container">
                            <Form className="list"
                                    onSubmit={this.handleRegister}
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
                                                        placeholder="First Name"
                                                        type="text"
                                                        onChange={this.onChangeFirstname}
                                                        className="form-control"
                                                        validations={[required]}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="item-content item-input">
                                            <div className="item-inner">
                                                <div className="item-input-wrap">
                                                    <Input
                                                        placeholder="Last Name"
                                                        type="text"
                                                        onChange={this.onChangeLastname}
                                                        className="form-control"
                                                        validations={[required]}
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
                                                        validations={[required, vpassword]}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="item-content item-input">
                                            <div className="item-inner">
                                                <div className="item-input-wrap">
                                                    <Input
                                                        placeholder="Confirm Password"
                                                        type="password"
                                                        onChange={this.onChangeConfirmPassword}
                                                        className="form-control"
                                                        validations={[required]}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="content-button">
                                        <button
                                            className="button primary-button"
                                            disabled={this.state.loading} >
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                            <span>Sign Up</span>
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

                                <div class="divider-space-content"></div>

                                <div class="wrap-sign-up-with">
                                    <div class="title">
                                        <p>or sign up with</p>
                                        <span></span>
                                    </div>
                                    <div class="wrap-media-sign-up">
                                        <div class="row">
                                            <div class="col-50">
                                                <a href="#">
                                                    <div class="content bg-facebook">
                                                        <i class="fab fa-facebook-f"></i>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="col-50">
                                                <a href="#">
                                                    <div class="content bg-google">
                                                        <i class="fab fa-google"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="divider-space-content"></div>

                                <div class="wrap-link-sign-up">
                                    <p>Have an account? <a href="/login/">Sign In</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register; 