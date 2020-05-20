import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import { App, Button, Navbar, NavLeft, Page, Swiper, SwiperSlide, Icon, Toolbar, Link, List, ListItem, NavTitle, Popover } from "framework7-react";
import './ProductDetail.scss';
import Framework7 from "framework7";
import parse from 'html-react-parser';
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

    componentDidUpdate() {
        if(document.getElementById("navbar-home")){
            document.getElementById("navbar-home").style.display = "none";
        }
        if(document.getElementById("navbar-search")) {
            document.getElementById("navbar-search").style.display = "none";
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

        let id, images, name;
        let appLink1, appLink2;
        var desc = "";
        var lat = 0.0;
        var lng = 0.0;
        var price = 0;
        if(typeof(this.state.data.item) !== "undefined") {
            var itemInfo = this.state.data.item;
            id = itemInfo._id;
            name = itemInfo.name;
            desc = itemInfo.description;
            lat = itemInfo.location.latitude; 
            lng = itemInfo.location.longitude;
            images = itemInfo.images;
            price = itemInfo.price;
            images = images.map(function(image, i) {
                return <SwiperSlide className="image-container" style={{background: `no-repeat center/cover url(${image["img_url"]})`, borderRadius: 0}}></SwiperSlide>
            });
            appLink1 = "/appointment/" + id + "/false";
            appLink2 = "/appointment/" + id + "/true";
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
                        <Button popoverOpen=".popover-appointment" raised fill className="appointment-button">Make Appointment</Button>
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
                        <iframe style={{width: "100%", height: 200, borderRadius: 16}}
                            frameborder="0" 
                            scrolling="no" 
                            src={mapSrc}
                            >
                        </iframe>
                        <div className="profile-container">
                            
                        </div>
                    </div>
                    <ProductDisplaySlider title="Related items you might like" items={this.state.data.relateditems} />
                    <ProductDisplaySlider title="Other items from this seller" items={this.state.data.selleritems} />
                </div>
                <Popover className="popover-appointment">
                    <List className="appointment-list">
                        <ListItem title="Make Appointment" />
                        <ListItem link={appLink1} popoverClose title="Create Appointments" footer="Set a schedule to meet with owner">
                            <Icon slot="media" f7="bell_fill"></Icon>
                        </ListItem>
                        <ListItem link={appLink2} popoverClose title="Deliver to Me" footer="Send with our courier's partners to my place">
                            <Icon slot="media" f7="bell_fill"></Icon>
                        </ListItem>
                    </List>
                </Popover>
            </div>
        );    
    }
}

export default ProductDetail;