import React, { Component } from "react";
import "./Toolbar.scss";
import { ReactComponent as PeaceOutline } from "../../../components/icons/PeaceOutline.svg";
import { ReactComponent as StorefrontLogo } from "../../../components/icons/StoreFrontIcon.svg";
import { ReactComponent as HandshakeLogo } from "../../../components/icons/HandshakeIcon.svg";
import { ReactComponent as AccountLogo } from "../../../components/icons/AccountIcon.svg";
import { ReactComponent as InactiveStorefrontLogo } from "../../../components/icons/InactiveStoreFrontIcon.svg";
import { ReactComponent as InactiveHandshakeLogo } from "../../../components/icons/InactiveHandshakeIcon.svg";
import { ReactComponent as InactiveAccountLogo } from "../../../components/icons/InactiveAccountIcon.svg";
import AuthService from "../../../services/auth.service.js";

class Toolbar extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();
        if(user) {
            this.setState({ isLoggedIn: true });
        }
    }
    
    render() {
        if(typeof(this.props.activeTab) !== 'undefined') {

            let firstIcon, secondIcon, thirdIcon;
            var activeTab = this.props.activeTab;

            let addProductLink, appointmentLink, accountLink;
            if(!this.state.isLoggedIn) {
                addProductLink = "/sign-in/category-select";
                appointmentLink = "/sign-in/see-appointment";
                accountLink = "/sign-in/account"; 
            } else {
                addProductLink = "/category-select";
                appointmentLink = "/see-appointment";
                accountLink = "/account"; 
            }
            
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
                <div className="toolbar tabbar tabbar-labels toolbar-bottom custom-toolbar" style={{ zIndex: 9999999999 }}>
                    <div className="toolbar-inner">
                        <a href={addProductLink} className="tab-link">
                            <div className="start-selling-btn">
                                <PeaceOutline className="start-selling-icon" />
                            </div>
                            <span className="tabbar-label start-selling-text">Start Selling</span>
                        </a>
                        <a href="/" className="tab-link" data-animate="false">
                            {firstIcon}
                            <span className="tabbar-label label-active">Home</span>
                        </a>
                        <a href={appointmentLink} className="tab-link" data-animate="false">
                            {secondIcon}
                            <span className="tabbar-label label-active" >Transaction</span>
                        </a>
                        <a href={accountLink} className="tab-link" data-animate="false">
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