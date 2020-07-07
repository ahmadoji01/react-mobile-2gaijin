import React, { Component } from 'react';
import { Button, Popup, Page, Link, Icon, NavTitle, Navbar, NavLeft, BlockTitle, List, ListItem } from 'framework7-react';
import './ReviewEditProduct.scss';
import { ReactComponent as AppointmentIllustration } from "../../illustrations/AppointmentIllustration.svg";
import axios from 'axios';

const imagesLimit = 8;

class ReviewEditProduct extends Component {

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
        if(localStorage.getItem("edit_product_id")) {
            console.log("");
            this.setState({ itemName: localStorage.getItem("edit_item_name") });
            this.setState({ itemBrand: localStorage.getItem("edit_item_brand") });
            this.setState({ itemCondition: localStorage.getItem("edit_item_condition") });
            this.setState({ yearsOwned: localStorage.getItem("edit_years_owned") });
            this.setState({ modelName: localStorage.getItem("edit_model_name") });
            this.setState({ itemDescription: localStorage.getItem("edit_item_description") });
            this.setState({ selectedCategory: localStorage.getItem("edit_selected_category") });
            this.setState({ itemPrice: parseInt(localStorage.getItem("edit_price")) });
                
            
            var lat = parseFloat(localStorage.getItem("edit_latitude"));
            var lng = parseFloat(localStorage.getItem("edit_longitude"));
            this.setState({ position: { lat: lat, lng: lng } }); 
        }
    }

    updateWindowDimensions() {
        this.setState({ inputWidth: (window.innerWidth/2) - 15 });
    }

    componentDidMount() {
        if(localStorage.getItem("edit_product_id")) {
            this.updateWindowDimensions();
        } else {
            this.$f7.view.main.router.navigate("/");
        }
    }

    removeAllProductInfo() {
        localStorage.removeItem("edit_product_id");
        localStorage.removeItem("edit_item_name");
        localStorage.removeItem("edit_item_brand");
        localStorage.removeItem("edit_item_condition");
        localStorage.removeItem("edit_years_owned");
        localStorage.removeItem("edit_model_name");
        localStorage.removeItem("edit_item_description");
        localStorage.removeItem("edit_selected_category");
        localStorage.removeItem("edit_price");
        
        localStorage.removeItem("edit_latitude");
        localStorage.removeItem("edit_longitude");
    }

    onButtonClick() {

        let imagesArray = new Array();
        for(var i = 0; i < this.state.imgsToUpload.length; i++) {
            let content = { "thumb_data": this.state.thumbImgsToUpload[i], "image_data": this.state.imgsToUpload[i] };
            imagesArray.push(content);
        }

        var payload = {
            "product": {
                "_id": localStorage.getItem("edit_product_id"),
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
        
        return axios.post(`https://go.2gaijin.com/edit_product`, payload, {
            headers: {
                "Authorization": localStorage.getItem("access_token"),
                "Content-Type": "application/json"
            }
        }).then(response => {
            if(response.data["status"] == "Success") {
                this.removeAllProductInfo();
                this.setState({ isPublishing: false });
                this.$f7router.navigate("/collections");
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
            <Page name="review-edit-product" className="page page-review-edit-product">
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
                    <div style={{ paddingBottom: 10}}>
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>Edit Item's Information</Button>
                    </div>
                </div>
                <Popup className="demo-popup-push" opened={this.state.isPublishing} push>
                    <Page>
                        <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div>
                                <div style={{display: 'table', margin: '0 auto'}}><AppointmentIllustration /></div>
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
                    <Page>
                        <div style={{height: '90%', width: '100%'}} className="display-flex justify-content-center align-items-center">
                            <div>
                                <div style={{display: 'table', margin: '0 auto'}}><AppointmentIllustration /></div>
                                <div style={{fontWeight: 900, display: 'table', margin: '0 auto'}}><h3><b>Something went wrong...</b></h3></div>
                                <div className="appointment-sent-text">
                                    Please try again
                                </div>
                            </div>
                        </div>
                    </Page>
                </Popup>
            </Page>
        );
    }

}

export default ReviewEditProduct;