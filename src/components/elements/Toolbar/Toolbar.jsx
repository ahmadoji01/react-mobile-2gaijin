import React from "react";
import "./Toolbar.scss"

const Toolbar = () => (
    <div className="toolbar tabbar tabbar-labels toolbar-bottom">
        <div className="toolbar-inner">
            <a href="#tab-home" className="tab-link tab-link-active">
                <i className="fas fa-home"></i>
                <span className="tabbar-label">Home</span>
            </a>
            <a href="#tab-search" className="tab-link">
                <i className="fas fa-search"></i>
                <span className="tabbar-label">Search</span>
            </a>
            <a href="#tab-brand" className="tab-link">
                <i className="fas fa-medal"></i>
                <span className="tabbar-label">Official Brand</span>
            </a>
            <a href="#tab-cart" className="tab-link">
                <i className="fas fa-shopping-cart"></i>
                <span className="tabbar-label">Cart</span>
            </a>
            <a href="#tab-account" className="tab-link">
                <i className="fas fa-user"></i>
                <span className="tabbar-label">Account</span>
            </a>
        </div>
    </div>
);

export default Toolbar;