import React, { Component } from 'react';
import "./ProductContainerWithTab.scss";
import Masonry from 'react-masonry-css';
import ProductCardWithLove from '../ProductCardWithLove';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
//import Tabs from '@material-ui/core/Tabs';
//import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { geolocated } from 'react-geolocated';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
const { TabPane } = Tabs;

class ProductContainerWithTab extends Component {
    
    loadLimit = 8;

    constructor(props) {
        super(props);
        this.state = {
            currLat: 0.0,
            currLng: 0.0,
            value: 0,
            items1: [],
            startitems1: 1,
            limititems1: 8,
            items2: [],
            startitems2: 1,
            limititems2: 8,
            hasMore1: true,
            hasMore2: true,
            isLoading1: false,
            isLoading2: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    firstTabLoader() {
        
        let config = {
            headers: { },
            params: {
              start: this.state.startitems1,
              limit: this.state.limititems1,
              sortby: "newest"
            }
        }  

        return axios
        .get("/search", config)
        .then(response => {
            var fetchData = response.data.data.items;
            this.state.items1.push(fetchData);
        });
    }

    secondTabLoader() {
      let config = {
        headers: { },
        params: {
          start: this.state.startitems2,
          limit: this.state.limititems2,
          pricemax: 0
        }
      }          

      return axios
      .get("/search", config)
      .then(response => {
          var fetchData = response.data.data.items;
          this.state.items2.push(fetchData);
      });
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };
    
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const location = JSON.stringify(position);
            this.setState({ currLat: position.coords.latitude, currLng: position.coords.longitude });
        });
    }

    componentDidMount() {
      this.firstTabLoader();
      this.secondTabLoader();
      this.findCoordinates();
    }

    callback(key) {
      console.log(key);
    }

    render() {
        var currLat = this.state.currLat; var currLng = this.state.currLng;
        
        var items1 = [];
        var items2 = [];
        
        this.state.items1.map((fetchedData, i) => {
          fetchedData.map((item, j) => {
            items1.push(<div><ProductCardWithLove item={item} lat={currLat} lng={currLng} /></div>);
          })
        });
        this.state.items2.map((fetchedData, i) => {
          fetchedData.map((item, j) => {
            items2.push(<div><ProductCardWithLove item={item} lat={currLat} lng={currLng} /></div>);
          })
        });
        
        return(
            <div className="recommended product segments-bottom">
                <div className="container">
                  <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Recently Added Items" key="1">
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid-tab"
                            columnClassName="my-masonry-grid_column">
                            {items1}
                        </Masonry>
                    </TabPane>
                    <TabPane tab="Free Items" key="2">
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid-tab "
                            columnClassName="my-masonry-grid_column">
                            {items2}
                        </Masonry>
                    </TabPane>
                  </Tabs>
                </div>
            </div>
        );
    }

}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(ProductContainerWithTab);