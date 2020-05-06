import React, { Component } from "react";
import "./Sidebar.scss";
import { NavLink } from 'react-router-dom';
import AuthService from "../../../services/auth.service";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoggedIn: false,
        };
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();
        if(user) {
            this.setState({isLoggedIn: true});
        }
    }
    
    render() {
        let loginElement;
        if(this.state.isLoggedIn) {
            loginElement = <a href="/" onClick={AuthService.logout()} className="item-link panel-close item-content"><div className="item-media"><i className="fas fa-sign-out-alt"></i></div><div className="item-inner"><div className="item-title">Logout</div></div></a>
        } else {
            loginElement = <a href="/login" className="item-link panel-close item-content"><div className="item-media"><i className="fas fa-sign-in-alt"></i></div><div className="item-inner"><div className="item-title">Login</div></div></a>
        }

        return (
            <div className="panel panel-left panel-cover sidebar">
                <div className="empty-space"></div>
                <div className="user-view">
                    <div className="box">
                        <div className="title-name">
                            <h5>Bekti Galan</h5>
                        </div>
                        <div className="title-balance">
                            <p><i className="fas fa-yen-sign"></i> 500</p>
                        </div>
                    </div>
                </div>
                <div className="list media-list">
                    <ul>
                        <li>
                            <a href="/wishlist/" className="item-link panel-close item-content">
                                <div className="item-media">
                                    <i className="fas fa-heart"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title-row">
                                        <div className="item-title">Wishlist</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/notification/" className="item-link panel-close item-content">
                                <div className="item-media">
                                    <i className="fas fa-bell"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title-row">
                                        <div className="item-title">Notification</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/transaction/" className="item-link panel-close item-content">
                                <div className="item-media">
                                    <i className="fas fa-credit-card"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title-row">
                                        <div className="item-title">Transaction</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/settings/" className="item-link panel-close item-content">
                                <div className="item-media">
                                    <i className="fas fa-cog"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title-row">
                                        <div className="item-title">Settings</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="/faq/" className="item-link panel-close item-content">
                                <div className="item-media">
                                    <i className="fas fa-question"></i>
                                </div>
                                <div className="item-inner">
                                    <div className="item-title-row">
                                        <div className="item-title">Help Center</div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            {loginElement}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
