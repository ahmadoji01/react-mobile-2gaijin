import React, { Component } from "react";
import { Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Block, Preloader } from "framework7-react";
import AuthService from "../../../services/auth.service.js";
import GaijinLogo from "../../illustrations/GaijinLogo.png";

class UpdatePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirmPassword: "",
            email: "",
            resetToken: "",
            isLoading: false,
        };
        this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
        if(typeof(this.props.email) !== "undefined" && typeof(this.props.resetToken) !== "undefined") {
            this.setState({ email: this.props.email, resetToken: this.props.resetToken });
        }
    }

    redirect() {
        this.$f7router.navigate("/sign-in");
    }

    render() {

        let msg;
        if(this.state.message) {
            msg = <BlockFooter>{this.state.message}</BlockFooter>
        }

        let loading;
        if(this.state.isLoading) {
            loading = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        return (
            <Page noToolbar noNavbar noSwipeback loginScreen>
            <LoginScreenTitle><div ><img style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }} src={GaijinLogo} /></div></LoginScreenTitle>
            <h4 style={{ textAlign: "center", fontWeight: 700 }}>Secondhand Platform for Foreigners</h4>
                <div className="container">
                    <List form>
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
                        {loading}
                        {msg}
                    </List>
                    <List>
                        <ListButton onClick={this.handleReset.bind(this)}>Update Password</ListButton>
                    </List>
                </div>
            </Page>
        )
    }

    handleReset(e) {
        e.preventDefault();
        
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({ message: "Password does not match", isLoading: false });
            return;
        }

        if(this.state.password === "") {
            this.setState({ message: "Password is empty", isLoading: false });
            return;
        }

        this.setState({
            message: "",
            isLoading: true
        });

        var self = this;
        AuthService.updatePassword(this.state.email, this.state.password, this.state.resetToken).then(
        response => {
            if(response.status == "Success") {
                self.redirect();
            } else {
                this.setState({ message: response.message });
                self.setState({ isLoading: false });
            }
        });
    }
}

export default UpdatePassword;