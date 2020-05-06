import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import { Navbar, Page } from "framework7-react";
import './ProductDetail.scss';

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

    render() {
        return (
            <Page className="page page-product page-with-subnavbar">
                <Navbar title="My App" backLink="Back" large transparent></Navbar>
                <div className="page-content">
                    <ProductDisplayContainer title="Related Items" items={this.state.data.relateditems} />
                    <ProductDisplayContainer title="Seller's Items" items={this.state.data.selleritems} />
                </div>
            </Page>
        );    
    }
}
 
export default ProductDetail;