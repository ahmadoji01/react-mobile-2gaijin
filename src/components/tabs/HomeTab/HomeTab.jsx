import React, { Component } from "react";
import Sidebar from '../../elements/Sidebar';
import HomeBanners from "../../elements/HomeBanners";
import CategorySlider from "../../elements/CategorySlider";
import './HomeTab.scss';
import ProductDisplaySlider from "../../elements/ProductDisplaySlider";
import ProductDisplayContainer from "../../elements/ProductDisplayContainer";
import ProductContainerInfinite from "../../elements/ProductContainerInfinite";

class HomeTab extends Component {

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
        var tab = document.getElementById('tab-home');
        var navbar = document.getElementById('custom-navbar');
        var barIcon = document.getElementById('bar-icon');
        var notifIcon = document.getElementById('notif-icon');
        var msgIcon = document.getElementById('msg-icon');
        tab.onscroll = function() {
            if (tab.scrollTop >= 5) {
                navbar.style.backgroundColor = "white";
                navbar.classList.add("shadow-4");
                notifIcon.style.color = "grey";
                msgIcon.style.color = "grey";
                barIcon.style.color = "grey";
            } else if(tab.scrollTop < 5) {
                navbar.style.backgroundColor = "#ffffff00";
                navbar.classList.remove("shadow-4");
                notifIcon.style.color = "white";
                msgIcon.style.color = "white";
                barIcon.style.color = "white";
            }
        };
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
            <React.Fragment>
                <div className="background-absolute">
                    <HomeBanners banners={this.state.data["banners"]}/>
                </div>
                <div className="panel-backdrop"></div>
                <Sidebar />
                <CategorySlider />
                <ProductDisplaySlider title="Featured Items" items={this.state.data["featureditems"]} label="Featured" />
                <ProductDisplayContainer title="Recently Added Items" items={this.state.data["recentitems"]} />
                <ProductDisplaySlider title="Free Items" items={this.state.data["freeitems"]} label="Free" />
                <ProductContainerInfinite title="Recommended Items" items={this.state.data["recommendeditems"]} />
            </React.Fragment>
        );
    }
}

export default HomeTab;