import React from "react";
import "./Toolbar.scss"

const Toolbar = () => (
    <div className="toolbar tabbar tabbar-labels toolbar-bottom">
        <div className="toolbar-inner">
            <a href="#tab-home" className="tab-link tab-link-active">
                <i className="fas fa-home"></i>
                <span className="tabbar-label">Home</span>
            </a>
            <a href="#tab-appointment" className="tab-link">
                <i className="fas fa-map-marker-alt"></i>
                <span className="tabbar-label">Appointment</span>
            </a>
            <a href="#tab-sell" className="tab-link">
                <i className="fas fa-medal"></i>
                <span className="tabbar-label">Start Selling</span>
            </a>
            <a href="#tab-wishlist" className="tab-link">
                <i className="fas fa-heart"></i>
                <span className="tabbar-label">Wishlist</span>
            </a>
            <a href="#tab-account" className="tab-link">
                <i className="fas fa-user"></i>
                <span className="tabbar-label">Account</span>
            </a>
        </div>
    </div>
);

export default Toolbar;