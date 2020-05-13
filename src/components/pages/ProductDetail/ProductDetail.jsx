import React, { Component } from "react";
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import { App, Navbar, View, Views, Page, Swiper, SwiperSlide } from "framework7-react";
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
                <Navbar backLink="Back" large>
                    <div slot="title-large" className="product-images-container">
                        <Swiper pagination>
                            <SwiperSlide>Slide 1</SwiperSlide>
                            <SwiperSlide>Slide 2</SwiperSlide>
                            <SwiperSlide>Slide 3</SwiperSlide>
                        </Swiper>
                    </div>
                </Navbar>
                <ProductDisplaySlider title="Related items you might like" items={this.state.data.relateditems} />
                <ProductDisplaySlider title="Other items from this seller" items={this.state.data.selleritems} />
            </Page>
        );    
    }
}
 
export default ProductDetail;