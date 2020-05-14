import React, { Component } from "react";
import Sidebar from '../../elements/Sidebar';
import HomeBanners from "../../elements/HomeBanners";
import CategorySlider from "../../elements/CategorySlider";
import './HomeTab.scss';
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import ProductContainerInfinite from "../../elements/ProductContainerInfinite";
import {Toolbar, Link} from 'framework7-react';
import ProductContainerWithTab from "../../elements/ProductContainerWithTab/ProductContainerWithTab";

class HomeTab extends Component {

    _isMounted = false;

    state = {
        data: [],
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    }

    updateDimensions = () => {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
        var aspectRatio = this.state.windowWidth / this.state.windowHeight;
        this.changeBgHeight(aspectRatio);
    }

    changeBgHeight = (aspectRatio) => {
        var bg = document.getElementsByClassName("background-absolute")[0];
        if(aspectRatio >= 0.65) {
            bg.style.height = "45%";
        } else if(aspectRatio >= 0.56 && aspectRatio < 0.65 ) {
            bg.style.height = "40%";
        } else if(aspectRatio >= 0.45 && aspectRatio < 0.56 ) {
            bg.style.height = "32%";
        } else if(aspectRatio >= 0.45 && aspectRatio < 0.56 ) {
            bg.style.height = "30%";
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
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
            <React.Fragment>
                <div className="background-absolute">
                    <HomeBanners items={this.state.data["featureditems"]}/>
                </div>
                <div className="panel-backdrop"></div>
                <Sidebar />
                <CategorySlider />
                <ProductDisplaySlider title="Recommended for you" items={this.state.data["featureditems"]} label="Featured" />
                <ProductContainerWithTab title="Recommended Items" items={this.state.data["recentitems"]} items2={this.state.data["freeitems"]} />
                <ProductDisplaySlider title="Free Items" items={this.state.data["freeitems"]} label="Free" />
            </React.Fragment>
        );
    }
}

export default HomeTab;