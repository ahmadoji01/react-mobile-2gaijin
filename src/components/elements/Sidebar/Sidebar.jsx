import React from "react";
import "./Sidebar.scss";
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
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
                    <a href="#" className="item-link panel-close item-content">
                        <div className="item-media">
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <div className="item-inner">
                            <div className="item-title">Logout</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
)

export default Sidebar;
