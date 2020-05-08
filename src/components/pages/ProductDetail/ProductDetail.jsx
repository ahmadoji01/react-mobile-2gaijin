import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import { App, Navbar, View, Views, Page } from "framework7-react";
import './ProductDetail.scss';
import Framework7 from "framework7";

class ProductDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
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
        document.getElementById("navbar-home").style.display = "none";
    }

    render() {
        return (
            <Page name="product" className="page page-product">
                <Navbar title="My App" backLink="Back" large></Navbar>
                <ProductDisplayContainer title="Related Items" items={this.state.data.relateditems} />
                <ProductDisplayContainer title="Seller's Items" items={this.state.data.selleritems} />
            </Page>
        );    
    }
}
 
export default ProductDetail;