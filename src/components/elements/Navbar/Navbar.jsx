import React from "react";
import "./Navbar.scss";
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <div className="navbar navbar-home">
        <div className="navbar-inner">
            <div className="left">
                <a href="#" className="panel-open" data-panel="left">
                    <i className="fas fa-bars"></i>
                </a>
            </div>
            <div className="title">
                <form className="searchbar searchbar-init" data-search-container=".search-list" data-search-in=".item-title">
                    <div className="searchbar-inner">
                        <div className="searchbar-input-wrap">
                            <input type="search" placeholder="What are you looking for?" />
                            <i className="searchbar-icon"></i>
                            <span className="input-clear-button"></span>
                        </div>
                    </div>
                </form>
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
)

export default Navbar;