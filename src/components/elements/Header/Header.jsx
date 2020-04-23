import React from "react";
import "./Header.scss";
import { NavLink } from 'react-router-dom';

const Header = () => (
    <React.Fragment>
        <div className="navbar navbar-home">
            <div className="navbar-inner">
                <div className="left">
                    <a href="#" className="panel-open" data-panel="left">
                        <i className="fas fa-bars"></i>
                    </a>
                </div>
                <div className="title">
                    <h2>Evone</h2>
                </div>
                <div className="right">
                    <a href="/wishlist/">
                        <i className="fas fa-heart"></i>
                    </a>
                    <a href="/notification/">
                        <i className="fas fa-bell"></i>
                        <span></span>
                    </a>
                </div>
            </div>
        </div>
        <div className="subnavbar">
            <form className="searchbar searchbar-init" data-search-container=".search-list" data-search-in=".item-title">
                <div className="searchbar-inner">
                    <div className="searchbar-input-wrap">
                        <input type="search" placeholder="Search for products for stores"/>
                        <i className="searchbar-icon"></i>
                        <span className="input-clear-button"></span>
                    </div>
                    <span className="searchbar-disable-button">Cancel</span>
                </div>
            </form>
        </div>
        <div className="panel-backdrop"></div>
        <div className="panel panel-left panel-cover sidebar">
            <div className="list accordion-list">
                <ul>
                    <li className="accordion-item">
                        <a href="#" className="item-link item-content">
                            <div className="item-media">
                                <i className="fas fa-tshirt"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Shop Pages</div>
                            </div>
                        </a>
                        <div className="accordion-item-content">

                            <div className="divider-space-text"></div>

                            <a href="/shopping-cart/" className="panel-close"><i className="fas fa-shopping-cart"></i>Shopping Cart</a>
                            <a href="/all-categories/" className="panel-close"><i className="fas fa-layer-group"></i>Categories</a>
                            <a href="/wishlist/" className="panel-close"><i className="fas fa-heart"></i>Wishlist</a>
                            <a href="/checkout/" className="panel-close"><i className="fas fa-cart-arrow-down"></i>Checkout</a>
                            <a href="/account-buyer/" className="panel-close"><i className="fas fa-user"></i>Account Buyer</a>
                            <a href="/account-seller/" className="panel-close"><i className="fas fa-user"></i>Account Seller</a>
                            <a href="/tracking-order/" className="panel-close"><i className="fas fa-truck"></i>Tracking Order</a>
                            <a href="/order-history/" className="no-mb panel-close"><i className="fas fa-history"></i><span>Order History</span></a>

                            <div className="divider-space-text"></div>

                        </div>
                    </li>
                    <li>
                        <a href="/blog/" className="item-link item-content panel-close">
                            <div className="item-media">
                                <i className="fas fa-blog"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Blog</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/blog-single/" className="item-link item-content panel-close">
                            <div className="item-media">
                                <i className="fas fa-rss"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Blog Single</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/sign-in/" className="item-link item-content panel-close">
                            <div className="item-media">
                                <i className="fas fa-sign-in-alt"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Sign In</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/sign-up/" className="item-link item-content panel-close">
                            <div className="item-media">
                                <i className="fas fa-user-plus"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Sign Up</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/contact-seller/" className="item-link item-content panel-close">
                            <div className="item-media">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="item-inner">
                                <div className="item-title">Contact Seller</div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="item-link item-content panel-close">
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
    </React.Fragment>
);

export default Header;