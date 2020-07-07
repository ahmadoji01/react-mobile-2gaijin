import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListInput, Tab, Tabs, Button, ListItem, TextEditor, Popup, Block, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import parse from 'html-react-parser';
import "./EditProductPage2.scss";
import MapContainer from "../../elements/MapContainer/MapContainer";

class EditProductPage2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popupOpened: false,
            itemPrice: 0,
            itemLocation: "",
            priceValid: 1,
            position: {
                lat: 43.07712,
                lng: 141.3489104
            }
        }
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onPriceChange(e) {
        let price;
        if(e.target.value != "") {
            price = parseInt(e.target.value);
        } else {
            price = 0;
        }
        this.setState({ itemPrice: price });
    }

    onItemLocationChange(e) {
        this.setState({ itemLocation: e.target.value });
    }

    onEditorChange(e) {
        this.setState({ itemDescription: e });
    }

    mapCallback = (pos) => {
        this.setState({ position: pos });
    }

    onButtonClick() {
        localStorage.setItem("edit_latitude", this.state.position.lat);
        localStorage.setItem("edit_longitude", this.state.position.lng);
        localStorage.setItem("edit_price", this.state.itemPrice);
        this.$f7router.navigate("/review-edit-product");
    }

    componentWillMount() {
        if(localStorage.getItem("edit_latitude")) {
            var lat = parseFloat(localStorage.getItem("edit_latitude"));
            var lng = parseFloat(localStorage.getItem("edit_longitude"));
            var price = parseInt(localStorage.getItem("edit_price"));
            this.setState({ position: { lat: lat, lng: lng } });
            this.setState({ price: price });
        } 
    }

    componentDidMount() {
        if(!localStorage.getItem("edit_latitude")) {
            this.$f7.view.main.router.navigate("/");
        }
    }

    render() {

        let validMsg;
        if(!this.state.priceValid) {
            validMsg = "You must fill in item's price";
        } else {
            validMsg = "";
        }

        return(
            <Page name="edit-product-2" className="page page-edit-product-2">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="black"></Icon></Link>
                    </NavLeft>
                    <NavTitle>How much is this item?</NavTitle>
                </Navbar>
                <div className="container">
                    <List noHairlinesMd>
                        <ListInput
                            outline
                            onChange={this.onPriceChange}
                            label="Item's Price"
                            type="text"
                            placeholder="0"
                            required
                            validate
                            value={this.state.itemPrice}
                            clearButton
                        />
                        <ListInput
                            outline
                            onChange={this.onItemLocationChange}
                            value={this.state.position.lat + ", " + this.state.position.lng}
                            label="Item's Location"
                            type="text"
                            placeholder="e.g. Panasonic"
                            onFocus={() => this.setState({popupOpened : true})}
                            clearButton
                        >
                        </ListInput>
                    </List>
                    <div style={{padding: 15}}>
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>Review Information</Button>
                    </div>
                </div>
                <Popup className="item-desc-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
                    <Page>
                        <Navbar title="Pick item's location">
                        <NavRight>
                            <Link popupClose>Confirm</Link>
                        </NavRight>
                        </Navbar>
                        <MapContainer parentCallback={this.mapCallback} lat={this.state.position.lat} lng={this.state.position.lng} />
                    </Page>
                </Popup>
            </Page>
        );
    }

}

export default EditProductPage2;