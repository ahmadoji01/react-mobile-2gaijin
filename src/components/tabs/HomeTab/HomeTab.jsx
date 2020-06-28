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
import SearchRecommendation from "../../elements/SearchRecommendation";

class HomeTab extends Component {

    _isMounted = false;

    state = {
        data: [],
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    }

    componentDidMount() {
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

    componentWillUnmount() {
        this.setState({ data: [] });
    }

    render() {
        return (
            <React.Fragment>
                <SearchRecommendation />
                <HomeBanners items={this.state.data["featureditems"]} />
                <div className="panel-backdrop"></div>
                <Sidebar />
                <CategorySlider />
                <ProductDisplaySlider title="Recommended for you" items={this.state.data["featureditems"]} label="Featured" />
                <ProductContainerWithTab title="Recommended Items" items={this.state.data["recentitems"]} items2={this.state.data["freeitems"]} />
            </React.Fragment>
        );
    }
}

export default HomeTab;