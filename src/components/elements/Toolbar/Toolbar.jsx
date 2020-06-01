import React, { Component } from "react";
import "./Toolbar.scss";
import { ReactSVG } from 'react-svg';
import { ReactComponent as PeaceOutline } from "../../../components/icons/PeaceOutline.svg";
import { ReactComponent as StorefrontLogo } from "../../../components/icons/StoreFrontIcon.svg";
import { ReactComponent as HandshakeLogo } from "../../../components/icons/HandshakeIcon.svg";
import { ReactComponent as AccountLogo } from "../../../components/icons/AccountIcon.svg";

class Toolbar extends Component { 
    
    render() {
        if(typeof(this.props.activeTab) !== 'undefined') {
            return(
                <div className="toolbar tabbar tabbar-labels toolbar-bottom custom-toolbar">
                    <div className="toolbar-inner">
                        <a href="/category-select" className="tab-link">
                            <div className="start-selling-btn">
                                <PeaceOutline className="start-selling-icon" />
                            </div>
                            <span className="tabbar-label start-selling-text">Start Selling</span>
                        </a>
                        <a href="/" className="tab-link" data-animate="false">
                            <span className="active-indicator"></span>
                            <StorefrontLogo fill="grey" className="tabbar-icon-svg" />
                            <span className="tabbar-label label-active">Storefront</span>
                        </a>
                        <a href="/see-appointment" className="tab-link" data-animate="false">
                            <HandshakeLogo fill="black" className="tabbar-icon-svg" />
                            <span className="tabbar-label label-active" >Appointment</span>
                        </a>
                        <a href="#tab-sell" className="tab-link" data-animate="false">
                            <AccountLogo fill="grey" className="tabbar-icon-svg" />
                            <span className="tabbar-label label-active" >My Profile</span>
                        </a>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default Toolbar;