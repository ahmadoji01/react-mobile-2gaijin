import React, { Component } from 'react';
import { Page, Navbar, NavLeft, List, ListInput, Tab, Tabs, Button, ListItem, TextEditor, Popup, Block, NavRight, Subnavbar, Link, Icon, Searchbar, NavTitle } from 'framework7-react';
import parse from 'html-react-parser';
import "./AddProductPage2.scss";
import MapContainer from "../../elements/MapContainer/MapContainer";

class AddProductPage2 extends Component {

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
            console.log(e.target.value);
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
        localStorage.setItem("latitude", this.state.position.lat);
        localStorage.setItem("longitude", this.state.position.lng);
        localStorage.setItem("price", this.state.itemPrice);
        this.$f7router.navigate("/add-product-3");
    }

    componentWillMount() {
        if(localStorage.getItem("latitude")) {
            var lat = parseFloat(localStorage.getItem("latitude"));
            var lng = parseFloat(localStorage.getItem("longitude"));
            var price = parseInt(localStorage.getItem("price"));
            this.setState({ position: { lat: lat, lng: lng } });
            this.setState({ price: price });
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
            <Page name="search-history" className="page page-category-select">
                <Navbar>
                    <NavLeft>
                        <Link href="#" className="link back"><Icon f7="arrow_left_circle_fill" size="24px" color="gray"></Icon></Link>
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
                        <Button className="general-btn" style={{color: '#fff'}} onClick={this.onButtonClick} raised fill round>Upload Item's Pictures</Button>
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

export default AddProductPage2;