import React, { Component } from 'react';
import './AppointmentBar.scss';

class AppointmentBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-20">
                        <div className="content-image">
                            <img src="images/product12.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-55">
                        <div className="content-title-product">
                            <a href="/product-details/"><p className="title-product">Loafers with genuine leather, guaranteed</p></a>
                        </div>
                    </div>
                    <div className="col-25">
                        <div className="content-info">
                            <p className="price">$229.99</p>
                            <p className="transaction-status"><i className="fas fa-undo"></i>RETURNED</p>
                        </div>
                    </div>
                </div>

                <div className="divider-line-half"></div>
            </React.Fragment>
        );
    }
}

export default AppointmentBar;