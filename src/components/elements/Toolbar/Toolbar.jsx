import React, { Component } from "react";
import "./Toolbar.scss";
import { ReactComponent as PeaceOutline } from "../../../components/icons/PeaceOutline.svg";
import { ReactComponent as StorefrontLogo } from "../../../components/icons/StoreFrontIcon.svg";
import { ReactComponent as HandshakeLogo } from "../../../components/icons/HandshakeIcon.svg";
import { ReactComponent as AccountLogo } from "../../../components/icons/AccountIcon.svg";
import { ReactComponent as InactiveStorefrontLogo } from "../../../components/icons/InactiveStoreFrontIcon.svg";
import { ReactComponent as InactiveHandshakeLogo } from "../../../components/icons/InactiveHandshakeIcon.svg";
import { ReactComponent as InactiveAccountLogo } from "../../../components/icons/InactiveAccountIcon.svg";

class Toolbar extends Component { 
    
    render() {
        if(typeof(this.props.activeTab) !== 'undefined') {

            let firstIcon, secondIcon, thirdIcon;
            var activeTab = this.props.activeTab;
            
            if(activeTab == 1) {
                firstIcon = <React.Fragment><span className="active-indicator"></span><StorefrontLogo className="tabbar-icon-svg" /></React.Fragment>;
                secondIcon = <React.Fragment><InactiveHandshakeLogo className="tabbar-icon-svg" /></React.Fragment>;
                thirdIcon = <React.Fragment><InactiveAccountLogo className="tabbar-icon-svg" /></React.Fragment>;
            } else if( activeTab == 2 ) {
                firstIcon = <React.Fragment><InactiveStorefrontLogo className="tabbar-icon-svg" /></React.Fragment>;
                secondIcon = <React.Fragment><span className="active-indicator"></span><HandshakeLogo className="tabbar-icon-svg" /></React.Fragment>;
                thirdIcon = <React.Fragment><InactiveAccountLogo className="tabbar-icon-svg" /></React.Fragment>;
            } else if( activeTab == 3 ) {
                firstIcon = <React.Fragment><InactiveStorefrontLogo className="tabbar-icon-svg" /></React.Fragment>;
                secondIcon = <React.Fragment><InactiveHandshakeLogo className="tabbar-icon-svg" /></React.Fragment>;
                thirdIcon = <React.Fragment><span className="active-indicator"></span><AccountLogo className="tabbar-icon-svg" /></React.Fragment>;
            }

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
                            {firstIcon}
                            <span className="tabbar-label label-active">Storefront</span>
                        </a>
                        <a href="/see-appointment" className="tab-link" data-animate="false">
                            {secondIcon}
                            <span className="tabbar-label label-active" >Appointment</span>
                        </a>
                        <a href="/account" className="tab-link" data-animate="false">
                            {thirdIcon}
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