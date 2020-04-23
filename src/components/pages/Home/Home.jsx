import React, { Component } from "react";
import Header from '../../elements/Header';
import HomeBanners from "../../elements/HomeBanners";
import ProductDisplaySection from "../../elements/ProductDisplaySection"
import CategorySlider from "../../elements/CategorySlider"
import Toolbar from "../../elements/Toolbar";
import './Home.scss';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        fetch('http://localhost:8080/')
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
                            <Header />
                            <HomeBanners />
                            <CategorySlider />
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}
 
export default Home;