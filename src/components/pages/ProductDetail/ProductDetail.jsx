import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import { App, Button, Navbar, NavLeft, Page, PhotoBrowser, Swiper, SwiperSlide, Icon, Toolbar, Link, List, ListItem, NavTitle, Popover } from "framework7-react";
import './ProductDetail.scss';
import Framework7 from "framework7";
import parse from 'html-react-parser';
import axios from "axios";
import { ReactComponent as NotificationIcon } from "../../icons/NotificationIcon.svg";
import { ReactComponent as SoldOutIcon } from "../../icons/SoldOutIcon.svg";
import GoldCoin from "../../illustrations/GoldCoin.svg";
import SilverCoin from "../../illustrations/SilverCoin.svg";

class ProductDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            photos: [],
            windowWidth: 350,
            isLoading: false,
            activeIndex: 0,
        };
        this.handleChat = this.handleChat.bind(this);
        this.populatePhotos = this.populatePhotos.bind(this);
        this.onMarkAsSoldClick = this.onMarkAsSoldClick.bind(this);
    }

    updateWindowDimensions() {
        this.updateWindowDimensions();
        this.setState({ windowWidth: window.innerWidth });
    }

    populatePhotos(images) {
        var photos = new Array();
        images = images.map(function(image, i) { 
            var photo = { url: image["img_url"], caption: "" };
            photos.push(photo);
        });
        this.setState({ photos: photos });
    }

    componentWillMount() {
        fetch('https://go.2gaijin.com/products/' + this.props.productID)
        .then((response) => response.json())
        .then((responseJson) => {
            const jsonData = responseJson.data;
            this.populatePhotos(jsonData.item.images);
            this.setState({ data: jsonData});
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleChat() {
        let config = {
            headers: {'Authorization': localStorage.getItem("access_token") },
            params: {
              receiverid: this.state.data.item.user_id
            }
        }

        return axios
        .get(`https://go.2gaijin.com/initiate_chat`, config)
        .then(response => {
            if(response.data.status == "Success"){
                this.$f7router.navigate("/chatroom/" + response.data.data.room._id);
            } else {

            }
        });
    }

    onMarkAsSoldClick() {
        var payload = {
            "_id": this.state.data.item._id
        }

        this.setState({ isLoading: true });
        axios.post(`https://go.2gaijin.com/mark_as_sold`, payload, {
        headers: {
            "Authorization": localStorage.getItem("access_token")
        }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.setState({ isLoading: false });
                var data = this.state.data;
                if(data.item.availability == "sold") {
                    data.item.availability = "available";
                    this.setState({ data: data });
                } else {
                    data.item.availability = "sold";
                    this.setState({ data: data });
                }
            } else {
                this.setState({ isLoading: false });
            }
        });
    }

    render() {
        const mapStyle = {
            width: "100%",
            height: "200px",
        };

        let id, images, name;
        let photos = new Array();
        let appLink1, appLink2;
        var desc = "";
        var lat = 0.0;
        var lng = 0.0;
        var price = 0;
        let brand, condition, yearsOwned, modelName, availability, categoryName;
        if(typeof(this.state.data.item) !== "undefined") {
            var itemInfo = this.state.data.item;
            id = itemInfo._id;
            name = itemInfo.name;
            desc = itemInfo.description;
            lat = itemInfo.location.latitude; 
            lng = itemInfo.location.longitude;
            images = itemInfo.images;
            price = itemInfo.price;
            categoryName = itemInfo.category.name;
            availability = itemInfo.availability;
            images = images.map(function(image, i) {
                var photo = { url: image["img_url"], caption: "" };
                return <SwiperSlide className="image-container" style={{background: `no-repeat center/cover url(${image["img_url"]})`, borderRadius: 0}}></SwiperSlide>
            });

            appLink1 = "/appointment/" + id + "/false";
            appLink2 = "/appointment/" + id + "/true";
            
            if(this.state.data.details.brand != "") {
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

        let imgGallery;
        if(images) {
            var self = this;
            imgGallery = <div onClick={() => this.photoBrowser.open(this.state.activeIndex)} >
                <Swiper
                pagination 
                className="product-gallery" 
                style={{ height: this.state.windowWidth }} 
                params={{speed:500, slidesPerView: 1, spaceBetween: 0, on: {
                    slideChange: function () {
                      self.setState({ activeIndex: this.activeIndex });
                    },
                }}}>
                    {images}
                </Swiper>
            </div>;
        }

        let sellerID, sellerName, avatarURL, goldCoins, silverCoins, appointmentBtn, chatBtn;
        if(typeof(this.state.data.seller) !== "undefined") {
            var sellerInfo = this.state.data.seller;
            sellerID = sellerInfo._id;
            sellerName = sellerInfo.first_name + " " + sellerInfo.last_name;
            avatarURL = sellerInfo.avatar_url;
            goldCoins = sellerInfo.gold_coin;
            silverCoins = sellerInfo.silver_coin;
            if(avatarURL == "") {
                avatarURL = "images/avatar-placeholder.png";
            }

            var currentUser = localStorage.getItem("user_id");
            if(currentUser != sellerInfo._id) {
                chatBtn = <Button raised fill className="chat-button" onClick={this.handleChat}>Chat</Button>;
                if(availability == "available") {
                    appointmentBtn = <Button popoverOpen=".popover-appointment" raised fill className="appointment-button">Request to Buy</Button>;
                } else {
                    appointmentBtn = <Button raised fill className="sold-out-button" style={{color: "#565656"}}>Item Sold Out</Button>;
                }
            } else {
                if(availability == "sold") {
                    appointmentBtn = <Button raised disabled={this.state.isLoading} onClick={this.onMarkAsSoldClick} fill className="appointment-button">Mark As Available</Button>
                } else {
                    appointmentBtn = <Button raised disabled={this.state.isLoading} onClick={this.onMarkAsSoldClick} fill className="appointment-button">Mark As Sold</Button>
                } 
            }
        }

        let soldOutContainer;
        if(availability == "sold") {
            soldOutContainer = <div className="sold-out-container" style={{ height: this.state.windowWidth }}>
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
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>{name}</NavTitle>
                </Navbar>
                <Toolbar id="toolbar-product-detail" tabbar labels position='bottom'>
                    <div className="toolbar-price">¥{price}</div>
                    <div className="toolbar-actions">
                        {appointmentBtn}
                    </div>
                </Toolbar>
                <div className="page-content" style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 30}}>
                    <PhotoBrowser
                        photos={this.state.photos}
                        ref={(el) => {this.photoBrowser = el}}
                    />
                    {imgGallery}
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
                                    <div className="row profile-banner-info" style={{ paddingBottom: 5 }}>
                                        <h5 className="seller-name">{sellerName}</h5>
                                    </div>
                                    <div className="row profile-banner-info" style={{ paddingBottom: 3, marginBottom: 5 }}>
                                        <img src={GoldCoin} />{goldCoins} Gold(s) 
                                        <img src={SilverCoin} />{silverCoins} Silver(s)
                                    </div>
                                    <div className="row profile-banner-info" style={{ marginBottom: 5 }}>
                                        <div style={{ width: "100%" }}>
                                            <Button href={`/profile/${sellerID}`} raised fill className="appointment-button" style={{  width: "75%", fontWeight: 700, color: "white" }}>See Profile</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductDisplaySlider title="Related items you might like" seeAllLink={`/search/ /${categoryName}`} items={this.state.data.relateditems} />
                    <ProductDisplaySlider title="Other items from this seller" seeAllLink={`/profile/${sellerID}`} items={this.state.data.selleritems} />
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