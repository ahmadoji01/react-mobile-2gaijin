import React, { Component } from 'react';
import './WishlistTab.scss';
import AuthService from "../../../services/auth.service";
import ProductCardWithLove from "../../elements/ProductCardWithLove";
import { geolocated } from 'react-geolocated';
import Masonry from 'react-masonry-css';
import axios from "axios";

class WishlistTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        var user = AuthService.getCurrentUser();
        if (user) {
            return axios
            .get("/sign_in", {}, { 
                headers: {
                    'Authorization': user.authentication_token,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                var fetchData = response.data.data;
                this.setState({data: fetchData})
            });
        }
    }

    render() {
        if(typeof(this.state.data) !== "undefined") {
            var currLat = 0.0; var currLng = 0.0;
            if(this.props.isGeolocationEnabled) {
                if(this.props.coords !== null) {
                    currLat = this.props.coords.latitude;
                    currLng = this.props.coords.longitude;
                }
            }

            var items = this.state.data;
            items = items.map(function(item, i) {
                return <div key={i+1}><ProductCardWithLove item={item} lat={currLat} lng={currLng} /></div>
            });

            return(
                <div className="recommended product segments-bottom">
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.title}
                                <a href="#" className="see-all-link">See All</a>
                            </h3>
                        </div>
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            {items}
                        </Masonry>
                    </div>
                </div>
            )
        } else {
            return '';
        }
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(WishlistTab);