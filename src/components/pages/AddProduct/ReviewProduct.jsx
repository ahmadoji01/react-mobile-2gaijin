import React, { Component } from 'react';
import { Button, Popup, Page, Link, Icon, NavTitle, Navbar, NavLeft, BlockTitle, List, ListItem } from 'framework7-react';
import './ReviewProduct.scss';
import PublishingIllustration from "../../illustrations/PublishingIllustration.png";
import axios from 'axios';
import Error from '../Error';

const imagesLimit = 8;

class ReviewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemBrand: "",
            yearsOwned: "",
            itemCondition: "",
            modelName: "",
            itemDescription: "",
            itemPrice: 0,
            selectedCategory: "",
            position: {
                lat: 43.07712,
                lng: 141.3489104
            },
            imgsToUpload: new Array(imagesLimit),
            thumbImgsToUpload: new Array(imagesLimit),
            totalImages: 0,
            isPublishing: false,
            isError: false,
            inputWidth: 150,
        }
        this.onButtonClick = this.onButtonClick.bind(this);
        this.removeAllProductInfo = this.removeAllProductInfo.bind(this);
    }

    componentWillMount() {
        this.setState({ itemName: localStorage.getItem("item_name") });
        this.setState({ itemBrand: localStorage.getItem("item_brand") });
        this.setState({ itemCondition: localStorage.getItem("item_condition") });
        this.setState({ yearsOwned: localStorage.getItem("years_owned") });
        this.setState({ modelName: localStorage.getItem("model_name") });
        this.setState({ itemDescription: localStorage.getItem("item_description") });
        this.setState({ selectedCategory: localStorage.getItem("selected_category") });
        this.setState({ itemPrice: parseInt(localStorage.getItem("price")) });
        
        var lat = parseFloat(localStorage.getItem("latitude"));
        var lng = parseFloat(localStorage.getItem("longitude"));
        this.setState({ position: { lat: lat, lng: lng } });

        var i = 0;
        let images = new Array();
        let thumbs = new Array();
        for(i = 0; i < imagesLimit; i++) {
            var imgKey = "image_" + i;
            var thumbKey = "thumb_" + i;
            var imgData = localStorage.getItem(imgKey);
            var thumbImgData = localStorage.getItem(thumbKey);
            
            if(imgData) {
                let img = imgData;
                let thumb = thumbImgData;

                images.push(img);
                thumbs.push(thumb);
            } else {
                break;
            }
        }
        this.setState({ imgsToUpload: images });
        this.setState({ thumbImgsToUpload: thumbs });
        this.setState({ totalImages: i + 1 });
    }

    updateWindowDimensions() {
        this.setState({ inputWidth: (window.innerWidth/2) - 15 });
    }

    componentDidMount() {
        this.updateWindowDimensions();
    }

    removeAllProductInfo() {
        localStorage.removeItem("item_name");
        localStorage.removeItem("item_brand");
        localStorage.removeItem("item_condition");
        localStorage.removeItem("years_owned");
        localStorage.removeItem("model_name");
        localStorage.removeItem("item_description");
        localStorage.removeItem("selected_category");
        localStorage.removeItem("price");
        
        localStorage.removeItem("latitude");
        localStorage.removeItem("longitude");
        
        for(var i = 0; i < imagesLimit; i++) {
            var imgKey = "image_" + i;
            var thumbKey = "thumb_" + i;

            localStorage.removeItem(imgKey);
            localStorage.removeItem(thumbKey);
        }
    }

    onButtonClick() {

        let imagesArray = new Array();
        for(var i = 0; i < this.state.imgsToUpload.length; i++) {
            let content = { "thumb_data": this.state.thumbImgsToUpload[i], "image_data": this.state.imgsToUpload[i] };
            imagesArray.push(content);
        }

        var payload = {
            "product": {
                "name": this.state.itemName,
                "price": this.state.itemPrice,
                "description": this.state.itemDescription,
                "category_ids": [this.state.selectedCategory],
                "latitude": parseFloat(this.state.position.lat),
                "longitude": parseFloat(this.state.position.lng)
            },
            "product_detail": {
                "brand": this.state.itemBrand,
                "condition": this.state.itemCondition,
                "years_owned": this.state.yearsOwned,
                "model_name": this.state.modelName
            },
            "product_images": imagesArray
        }
        this.setState({ isPublishing: true });
        
        return axios.post(`https://go.2gaijin.com/add_product`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token"),
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.removeAllProductInfo();
                this.setState({ isPublishing: false });
                this.$f7router.navigate("/");
            } else {
                this.setState({ isPublishing: false });
                this.setState({ isError: true });
            }
        });
    }

    render() {

        var imgInputs = new Array();
        var imgPrefix = "data:image/jpeg;base64,";
        for(var i = 0; i < this.state.totalImages - 1; i++) {
            imgInputs[i] = <div className="col-50 img-input-container" style={{ height: `${this.state.inputWidth}px`, width: `${this.state.inputWidth}px` }}>
                <img src={imgPrefix + this.state.thumbImgsToUpload[i]} className="img-input-display" style={{ height: `${this.state.inputWidth - 10}px`, width: `${this.state.inputWidth - 10}px`, outline: "1px solid black" }} />
            </div>
        }

        return (
            <Page name="search-history" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>Tell us the detail of your item</NavTitle>
                </Navbar>
                <div className="container">
                    <BlockTitle>Item's Information</BlockTitle>
                    <List>
                        <ListItem header="Item's Name" title={this.state.itemName} />
                        <ListItem header="Item's Condition" title={this.state.itemCondition} />
                        <ListItem header="Brand Name" title={this.state.itemBrand} />
                        <ListItem header="Years Owned" title={this.state.yearsOwned} />
                        <ListItem header="Model Name" title={this.state.modelName} />
                        <ListItem header="Price" title={this.state.itemPrice} />
                        <ListItem header="Location" title={this.state.position.lat + ", " + this.state.position.lng} />
                    </List>
                    <BlockTitle>Item's Images</BlockTitle>
                    <div className="row">
                        { imgInputs }
                    </div>
                    <div style={{ paddingBottom: 10}}>
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>Publish Item</Button>
                    </div>
                </div>
                <Popup className="demo-popup-push" opened={this.state.isPublishing} push>
                    <Page>
                        <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div>
                                <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Publishing Item...</b></h3></div>
                                <div className="appointment-sent-text">
                                    You will be redirected to home once the publishing is done
                                </div>
                            </div>
                        </div>
                    </Page>
                </Popup>
                <Popup className="demo-popup-push" opened={this.state.isError} push>
                    <Navbar>
                        <NavLeft>
                            <Link onClick={ () => this.setState({ isError: false }) }>Close</Link>
                        </NavLeft>
                        <NavTitle>Oops...</NavTitle>
                    </Navbar>
                    <Error />
                </Popup>
            </Page>
        );
    }

}

export default ReviewProduct;