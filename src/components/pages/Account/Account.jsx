import React, { Component } from 'react';
import { Page } from 'framework7-react';
import Toolbar from "../../elements/Toolbar";
import AuthService from '../../../services/auth.service';
import GoldCoin from "../../illustrations/GoldCoin.svg";
import SilverCoin from "../../illustrations/SilverCoin.svg";
import axios from "axios";

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            data: []
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        var user = AuthService.getCurrentUser();

        if(user) {
            AuthService.logout().then(
            () => {
                this.$f7.view.main.router.navigate("/");
                this.setState({isLoggedIn: false});
            });
        } else {
            this.$f7.view.main.router.navigate("/login");
        }
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();

        if(user) {
            this.setState({isLoggedIn: true});
            axios.post(`https://go.2gaijin.com/profile`, {}, {
            headers: {
                "Authorization": localStorage.getItem("access_token")
            }
            }).then(response => {
                if(response.data["status"] == "Success") {
                    var jsonData = response.data.data;
                    console.log(jsonData);
                    this.setState({ data: jsonData });
                }
            });
        } else {
            this.setState({isLoggedIn: false});
            this.$f7router.navigate("/login");
        }
    }
    
    render() {

        let loginBtn;
        if(this.state.isLoggedIn) {
            loginBtn = <React.Fragment><div className="item-media">
                <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="item-inner">
                <div className="item-title">Logout</div>
            </div></React.Fragment>
        } else {
            loginBtn = <React.Fragment><div className="item-media">
                <i className="fas fa-sign-in-alt"></i>
            </div>
            <div className="item-inner">
                <div className="item-title">Login</div>
            </div></React.Fragment>
        }

        let profileName, avatarURL, goldCoins, silverCoins, profileBanner;
        if(this.state.data.profile) {
            avatarURL = this.state.data.profile.avatar_url;
            goldCoins = this.state.data.profile.gold_coin;
            silverCoins = this.state.data.profile.silver_coin;
            profileName = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");

            profileBanner = <div className="profile-container content-shadow">
                <div className="row" style={{marginTop: 10, padding: 10}}>
                    <div className="col-30 seller-img-container" style={{backgroundImage: `url("${avatarURL}")`}}></div>
                    <div className="col-70">
                        <div className="row" style={{marginBottom: 0}}>
                            <h5 className="seller-name">{profileName}</h5>
                        </div>
                        <div className="row trust-coin-container">
                            <img src={GoldCoin} />{goldCoins} Gold(s) 
                            <img src={SilverCoin} />{silverCoins} Silver(s)
                        </div>
                    </div>
                </div>
            </div>;
        }

        return(
            <Page name="account" className="page page-account page-without-navbar" >
                <Toolbar activeTab={3} />
                <div className="account-buyer segments" style={{marginBottom: 100}}>
                    <div className="container">
                        {profileBanner}
                    </div>
                    <div className="container segments">
                        <div className="info-balance content-shadow">
                            <div className="row">
                                <div className="col-50">
                                    <div className="content-text">
                                        <p>Your Balance</p>
                                        <h5>$310.00</h5>
                                    </div>
                                </div>
                                <div className="col-50">
                                    <div className="content-button">
                                        <a href="#" className="button primary-button"><i className="fas fa-wallet"></i>Top Up</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="account-menu">
                        <div className="list media-list">
                            <ul>
                                <li>
                                    <a href="/wishlist/" className="item-link item-content">
                                        <div className="item-media">
                                            <i className="fas fa-heart"></i>
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">Wishlist</div>
                                            </div>
                                            <div className="item-subtitle">All products that you have saved</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/transaction/" className="item-link item-content">
                                        <div className="item-media">
                                            <i className="fas fa-exchange-alt"></i>
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">Transaction</div>
                                            </div>
                                            <div className="item-subtitle">All your transactions are here</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/notification/" className="item-link item-content">
                                        <div className="item-media">
                                            <i className="fas fa-bell"></i>
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">Notification</div>
                                            </div>
                                            <div className="item-subtitle">Transaction, Purchase, Notification update</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/faq/" className="item-link item-content">
                                        <div className="item-media">
                                            <i className="fas fa-question"></i>
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">Help</div>
                                            </div>
                                            <div className="item-subtitle">Need Help, Frequently Asked Questions</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact-seller/" className="item-link item-content">
                                        <div className="item-media">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">Contact Seller</div>
                                            </div>
                                            <div className="item-subtitle">Other questions can contact me</div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.handleLogin} className="item-link item-content">
                                        {loginBtn}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }

}

export default Account;