import React, { Component } from "react";
import './Notification.scss';
import { Icon, Link, Page, Navbar, NavLeft, NavTitle } from 'framework7-react';

class Notification extends Component {

    render() {
        return (
        <Page>
            <Navbar>
                <NavLeft>
                    <Link href="/" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
                </NavLeft>
                <NavTitle>Notification</NavTitle>
            </Navbar>
            <div className="notifi segments">
                <div className="container">
                    <div className="title-time">
                        <span>TODAY</span>
                    </div>

                    <div className="content">
                        <img src="images/discount.png" alt="notification-image" />
                        <div className="text">
                            <h6>Discount up to 80% for all product</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint cum voluptates iste!</p>
                        </div>
                    </div>

                    <div className="divider-space-content"></div>

                    <div className="content">
                        <img src="images/user-seller1.png" alt="notification-image" />
                        <div className="text">
                            <h6>John Store <span>Following you</span></h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint cum voluptates iste!</p>
                        </div>
                    </div>

                    <div className="divider-space-content"></div>

                    <div className="content">
                        <img src="images/promo.png" alt="notification-image" />
                        <div className="text">
                            <h6>Promo Code <a href="#"><span>P99DAY19</span></a></h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint cum voluptates iste!</p>
                        </div>
                    </div>

                    <div className="divider-line-half"></div>

                    <div className="title-time">
                        <span>YESTERDAY</span>
                    </div>

                    <div className="content">
                        <img src="images/50-off.png" alt="notification-image" />
                        <div className="text">
                            <h6>50% Off</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint cum voluptates iste!</p>
                        </div>
                    </div>

                    <div className="divider-space-content"></div>

                    <div className="content">
                        <img src="images/90-off.png" alt="notification-image" />
                        <div className="text">
                            <h6>Special for you <a href="#"><span>90% Off</span></a></h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint cum voluptates iste!</p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
        );
    }

}

export default Notification;