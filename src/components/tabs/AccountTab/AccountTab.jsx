import React, { Component } from 'react';

class AccountTab extends Component {
    render() {
        return(
            <div className="account-buyer segments">
                <div className="container">
                    <div className="header-account content-shadow">
                        <img src="images/user-buyer6.png" alt="" />
                        <div className="title-name">
                            <h5>Airy Fashion</h5>
                            <p><i className="fas fa-map-marker-alt"></i>Washington</p>
                        </div>
                    </div>
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
                                <a href="#" className="item-link item-content">
                                    <div className="item-media">
                                        <i className="fas fa-power-off"></i>
                                    </div>
                                    <div className="item-inner">
                                        <div className="item-title">Logout</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountTab;