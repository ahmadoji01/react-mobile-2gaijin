import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import { App, Button, Navbar, NavLeft, Page, Swiper, SwiperSlide, Icon, Toolbar, Link, List, ListItem, NavTitle, Popover } from "framework7-react";
import './ProductDetail.scss';
import Framework7 from "framework7";
import parse from 'html-react-parser';
import axios from "axios";
import { ReactComponent as NotificationIcon } from "../../icons/NotificationIcon.svg";
import { ReactComponent as SoldOutIcon } from "../../icons/SoldOutIcon.svg";

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

    handleChat() {
        var payload = {}

        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              receiverid: this.state.data.item.user_id
            }
        }

        return axios
        .get(`https://go.2gaijin.com/initiate_chat`, config)
        .then(response => {
            this.$f7router.navigate("/chatroom/" + response.data.data.room._id);
        });
    }

    render() {
        const mapStyle = {
            width: "100%",
            height: "200px",
        };

        let id, images, name;
        let appLink1, appLink2;
        var desc = "";
        var lat = 0.0;
        var lng = 0.0;
        var price = 0;
        let brand, condition, yearsOwned, modelName, availability;
        if(typeof(this.state.data.item) !== "undefined") {
            var itemInfo = this.state.data.item;
            id = itemInfo._id;
            name = itemInfo.name;
            desc = itemInfo.description;
            lat = itemInfo.location.latitude; 
            lng = itemInfo.location.longitude;
            images = itemInfo.images;
            price = itemInfo.price;
            availability = itemInfo.availability;
            images = images.map(function(image, i) {
                return <SwiperSlide className="image-container" style={{background: `no-repeat center/cover url(${image["img_url"]})`, borderRadius: 0}}></SwiperSlide>
            });
            appLink1 = "/appointment/" + id + "/false";
            appLink2 = "/appointment/" + id + "/true";
            
            if(this.state.data.details.brand != "") {
                console.log(this.state.data.item.brand);
                brand = <tr>
                    <td className="detail-label"><Icon f7="tag_fill" size="12px" /> Brand</td>
                    <td className="detail-info">{this.state.data.details.brand}</td>
                </tr> 
            }
            if(this.state.data.details.condition != "") {
                condition = <tr>
                    <td className="detail-label"><Icon f7="checkmark_shield_fill" size="12px" /> Condition</td>
                    <td className="detail-info">{this.state.data.details.condition}</td>
                </tr> 
            }
            if(this.state.data.details.years_owned != "") {
                yearsOwned = <tr>
                    <td className="detail-label"><Icon f7="clock_fill" size="12px" /> Years Owned</td>
                    <td className="detail-info">{this.state.data.details.years_owned}</td>
                </tr>
            }
            if(this.state.data.details.model_name != "") {
                modelName = <tr>
                    <td className="detail-label"><Icon f7="barcode" size="12px" /> Model Name</td>
                    <td className="detail-info">{this.state.data.details.model_name}</td>
                </tr>
            }
        }

        let sellerName, avatarURL, goldCoins, silverCoins, appointmentBtn;
        if(typeof(this.state.data.seller) !== "undefined") {
            var sellerInfo = this.state.data.seller;
            sellerName = sellerInfo.first_name + " " + sellerInfo.last_name;
            avatarURL = sellerInfo.avatar_url;
            goldCoins = sellerInfo.gold_coin;
            silverCoins = sellerInfo.silver_coin;
            if(avatarURL == "") {
                avatarURL = "images/avatar-placeholder.png";
            }

            var currentUser = localStorage.getItem("user_id");
            if(currentUser != sellerInfo._id) {
                if(availability == "available") {
                    appointmentBtn = <Button popoverOpen=".popover-appointment" raised fill className="appointment-button">Make Appointment</Button>;
                } else {
                    appointmentBtn = <Button raised fill className="sold-out-button" style={{color: "#565656"}}>Item Sold Out</Button>;
                }
            } else {
                appointmentBtn = <Button raised fill className="appointment-button">Mark As Sold</Button>
            }
        }

        let soldOutContainer;
        if(availability != "available") {
            soldOutContainer = <div className="sold-out-container">
                <div className="sold-icon-container">
                    <SoldOutIcon height="64px" />
                </div>
            </div>;
        }

        const mapSrc = "https://maps.google.com/maps?q=" + lat + "," + lng + "&t=&z=13&ie=UTF8&iwloc=&output=embed&hl=en";
        
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
                        {appointmentBtn}
                    </div>
                </Toolbar>
                <div className="page-content" style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 30}}>
                    <Swiper pagination className="product-gallery" params={{speed:500, slidesPerView: 1, spaceBetween: 0}}>
                        {images}
                    </Swiper>
                    {soldOutContainer}
                    <div className="container">
                        <h3>{name}</h3>
                        <table className="product-details">
                            {brand}
                            {condition}
                            {yearsOwned}
                            {modelName}
                        </table>
                        <div className="product-description">
                            <h6>DESCRIPTION</h6>
                            <p className="desc-content">{parse(desc)}</p> 
                        </div>
                        <iframe style={{width: "100%", height: 200, borderRadius: 16}}
                            frameborder="0" 
                            scrolling="no" 
                            src={mapSrc}
                            >
                        </iframe>
                        <div className="profile-container content-shadow">
                            <div className="row" style={{marginTop: 10, padding: 10}}>
                                <div className="col-30 seller-img-container" style={{backgroundImage: `url("${avatarURL}")`}}></div>
                                <div className="col-70">
                                    <div className="row" style={{marginBottom: 0}}>
                                        <h5 className="seller-name">{sellerName}</h5>
                                    </div>
                                    <div className="row trust-coin-container">
                                        <img src="images/gold-coin.png" />{goldCoins} Gold(s) 
                                        <img src="images/silver-coin.png" />{silverCoins} Silver(s)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductDisplaySlider title="Related items you might like" items={this.state.data.relateditems} />
                    <ProductDisplaySlider title="Other items from this seller" items={this.state.data.selleritems} />
                </div>
                <Popover className="popover-appointment">
                    <List className="appointment-list">
                        <ListItem title="Appointment Menu" />
                        <ListItem link={appLink1} popoverClose title="Create Appointments" footer="Set a schedule to meet with owner">
                            
                        </ListItem>
                        <ListItem link={appLink2} popoverClose title="Deliver to Me" footer="Send with our courier's partners to my place">
                            
                        </ListItem>
                    </List>
                </Popover>
            </div>
        );    
    }
}

export default ProductDetail;