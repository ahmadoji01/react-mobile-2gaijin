import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import { App, Button, Navbar, NavLeft, Page, Swiper, SwiperSlide, Icon, Toolbar, Link, NavTitle } from "framework7-react";
import './ProductDetail.scss';
import Framework7 from "framework7";
import parse from 'html-react-parser';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from "axios";

class ProductDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleChat = this.handleChat.bind(this);
    }

    componentWillMount() {
        fetch('https://go.2gaijin.com/products/' + this.props.productID)
        .then((response) => response.json())
        .then((responseJson) => {
            const jsonData = responseJson.data;
            this.setState({ data: jsonData});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        if(document.getElementById("navbar-home")){
            document.getElementById("navbar-home").style.display = "none";
        }
    }

    handleChat() {
        var payload = {}

        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              receiverid: this.state.data.item.user_id
            }
        }

        return axios
        .get("/initiate_chat", config)
        .then(response => {
            this.$f7router.navigate("/chatroom/" + response.data.data._id);
        });
    }

    render() {
        const mapStyle = {
            width: "100%",
            height: "200px",
        };

        let images, name;
        var desc = "";
        var lat = 0.0;
        var lng = 0.0;
        var price = 0;
        if(typeof(this.state.data.item) !== "undefined") {
            var itemInfo = this.state.data.item;
            name = itemInfo.name;
            desc = itemInfo.description;
            lat = itemInfo.location.latitude; 
            lng = itemInfo.location.longitude;
            images = itemInfo.images;
            price = itemInfo.price;
            images = images.map(function(image, i) {
                return <SwiperSlide className="image-container" style={{background: `no-repeat center/cover url(${image["img_url"]})`, borderRadius: 0}}></SwiperSlide>
            });
        }

        return (
            <div className="page page-product">
                <Navbar transparent>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="white"></Icon></Link>
                    </NavLeft>
                    <NavTitle>{name}</NavTitle>
                </Navbar>
                <Toolbar id="toolbar-product-detail" tabbar labels position='bottom'>
                    <div className="toolbar-price">¥{price}</div>
                    <div className="toolbar-actions">
                        <Button raised fill className="chat-button" onClick={this.handleChat}>Chat</Button>
                        <Button raised fill className="appointment-button">Make Appointment</Button>
                    </div>
                </Toolbar>
                <div className="page-content" style={{padding: 0}}>
                    <Swiper pagination className="product-gallery" params={{speed:500, slidesPerView: 1, spaceBetween: 0}}>
                        {images}
                    </Swiper>
                    <div className="container">
                        <h3>{name}</h3>
                        <table className="product-details">
                            <tr>
                                <td className="detail-label"><Icon f7="tag_fill" size="12px" /> Brand</td>
                                <td className="detail-info">IKEA</td>
                            </tr>
                            <tr>
                                <td className="detail-label"><Icon f7="checkmark_shield_fill" size="12px" /> Condition</td>
                                <td className="detail-info">99% normal usage. The text is a demo for how it looks like in 2 rows</td>
                            </tr>
                            <tr>
                                <td className="detail-label"><Icon f7="clock_fill" size="12px" /> Years Owned</td>
                                <td className="detail-info">1.5 Years</td>
                            </tr>
                            <tr>
                                <td className="detail-label"><Icon f7="barcode" size="12px" /> Model Name</td>
                                <td className="detail-info">Schuberth</td>
                            </tr>
                        </table>
                        <div className="product-description">
                            <h6>DESCRIPTION</h6>
                            <p className="desc-content">{parse(desc)}</p> 
                        </div>
                    </div>
                    <ProductDisplaySlider title="Related items you might like" items={this.state.data.relateditems} />
                    <ProductDisplaySlider title="Other items from this seller" items={this.state.data.selleritems} />
                </div>
            </div>
        );    
    }
}

export default ProductDetail;