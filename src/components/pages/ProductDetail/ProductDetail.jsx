import React, { Component } from "react";
import Header from '../../elements/Header';
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySection from "../../elements/ProductDisplaySection"
import './ProductDetail.scss';

class ProductDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        fetch('https://go.2gaijin.com/products/')
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
            <div className="App">
                <Header />
                <HomeBanners />
                <ProductDisplaySection title="Featured Items" items={this.state.data.featureditems} />
            </div>
        );    
    }
}
 
export default ProductDetail;