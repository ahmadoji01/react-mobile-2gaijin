import React, { Component } from "react";
import Navbar from '../../elements/Navbar';
import Sidebar from '../../elements/Sidebar';
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySection from "../../elements/ProductDisplaySection"
import CategorySlider from "../../elements/CategorySlider"
import Toolbar from "../../elements/Toolbar";
import './Home.scss';
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import ProductContainerInfinite from "../../elements/ProductContainerInfinite"

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        fetch('https://go.2gaijin.com/')
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
                <div className="page page-home page-with-subnavbar">
                    <Toolbar />
                    <div className="tabs">
                        <div id="tab-home" className="tab tab-active tab-home">
                            <div className="background-absolute">
                                <Navbar />
                                <HomeBanners banners={this.state.data["banners"]}/>
                            </div>
                            <div className="panel-backdrop"></div>
                            <Sidebar />
                            <CategorySlider />
                            <ProductDisplaySlider />
                            <ProductDisplayContainer />
                            <ProductDisplaySlider />
                            <ProductContainerInfinite />
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}
 
export default Home;