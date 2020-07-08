import React, { Component } from "react";
import { Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Block, Preloader } from "framework7-react";
import AuthService from "../../../services/auth.service.js";
import GaijinLogo from "../../illustrations/GaijinLogo.png";

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            redirectTo: "/",
            isLoading: false,
        };
        this.redirect = this.redirect.bind(this);
    }

    componentWillMount() {
        if(typeof(this.props.redirectTo) !== "undefined") {
            this.setState({ redirectTo: "/" + this.props.redirectTo });
        }
    }

    redirect() {
        window.location.href = this.state.redirectTo;
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
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        value={this.state.email}
                        onInput={(e) => {
                            this.setState({ email: e.target.value});
                        }}
                        />
                        {loading}
                        {msg}
                    </List>
                    <List>
                        <ListButton onClick={this.handleReset.bind(this)}>Send Request to Reset</ListButton>
                    </List>
                </div>
            </Page>
        )
    }

    handleReset(e) {
        e.preventDefault();

        this.setState({
            message: "",
            isLoading: true
        });

        var self = this;
        AuthService.resetPassword(this.state.email).then(
        response => {
            this.setState({ message: response.message });
            self.setState({ isLoading: false });
        });
        
    }
}

export default ResetPassword;