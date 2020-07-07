import React, { Component } from 'react';
import { Block, Preloader } from "framework7-react";
import "./ProductContainerWithTab.scss";
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import axios from 'axios';
import { geolocated } from 'react-geolocated';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { orange } from '@material-ui/core/colors';

const styles = {
  tabs: {
    background: '#fff',
    color: "orange",
  },
  slide: {
    minHeight: 100,
    color: '#fff',
  },
};

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
          loading: false,
          isLoading1: false,
          isLoading2: false,
          searchState: "",
          index: 0,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleTabChange = this.handleTabChange.bind(this);
      this.handleChangeIndex = this.handleChangeIndex.bind(this);
      this.callback = this.callback.bind(this);
      this.firstTabLoader = this.firstTabLoader.bind(this);
      this.secondTabLoader = this.secondTabLoader.bind(this);
    }

    handleTabChange = (event, value) => {
      this.callback(value);
      this.setState({
          index: value,
      });
    };

    handleChangeIndex = index => {  
      var self = this;
      this.setState({
          index,
      }, () => self.callback(self.state.index));
    };

    firstTabLoader() {
      var options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      };
    
      this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
          options
      );
      this.observer.observe(this.loadingRef);

      let config = {
          headers: { },
          params: {
            start: this.state.startitems1,
            limit: this.state.limititems1,
            sortby: "newest",
            status: "available"
          }
      }  

      this.setState({ searchState: "recentitems" });
      this.setState({ isLoading1: true });

      return axios
      .get(`https://go.2gaijin.com/search`, config)
      .then(response => {
          this.setState({ items1: response.data.data.items });
          this.setState({ items2: [] });
          this.setState({ isLoading1: false });
      });
    }

    secondTabLoader() {

      var options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      };

      let config = {
        headers: { },
        params: {
          start: this.state.startitems2,
          limit: this.state.limititems2,
          pricemax: 0,
          status: "available"
        }
      }
      
      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef2);

      this.setState({ searchState: "freeitems" });
      this.setState({ isLoading2: true });

      return axios
      .get(`https://go.2gaijin.com/search`, config)
      .then(response => {
          this.setState({ items2: response.data.data.items });
          this.setState({ items1: [] });
          this.setState({ isLoading2: false });
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
      this.findCoordinates();
    }

    callback(key) {
      if(key == 0) {
        this.firstTabLoader();
      } else if (key == 1) {
        this.secondTabLoader();
      }
    }

    getItems() {
      if(this.state.searchState == "recentitems") {
        this.setState({ isLoading1: true });
        const lastItems = this.state.items1.length;

        if (lastItems <= 2) {
          return;
        }

        let config = {
          headers: { },
          params: {
            start: lastItems + 1,
            limit: lastItems + 8,
            sortby: "newest",
            status: "available"
          }
        }
        axios
        .get(`https://go.2gaijin.com/search`, config)
        .then(res => {
          if((lastItems - 4) >= this.state.items1.length) {
            return;
          }  
          this.setState({ items1: [...this.state.items1, ...res.data.data.items] });
          this.setState({ isLoading1: false });
        });  
      } else if(this.state.searchState == "freeitems") {
        this.setState({ isLoading2: true });
        const lastItems = this.state.items2.length;

        if (lastItems <= 2) {
          return;
        }

        let config = {
          headers: { },
          params: {
            start: lastItems + 1,
            limit: lastItems + 8,
            pricemax: 0,
            status: "available"
          }
        }
        axios
        .get(`https://go.2gaijin.com/search`, config)
        .then(res => {
          this.setState({ isLoading2: false });
          if((lastItems - 4) >= this.state.items2.length) {
            return;
          }  
          this.setState({ items2: [...this.state.items2, ...res.data.data.items] });
        });  
      }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            this.getItems();
        }
        this.setState({ prevY: y });
    }

    render() {
        const loadingCSS = {
          height: "70px",
          margin: "30px"
        };

        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        var currLat = this.state.currLat; var currLng = this.state.currLng;

        let loading1;
        if(this.state.isLoading1) {
            loading1 = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }

        let loading2;
        if(this.state.isLoading2) {
            loading2 = <Block className="text-align-center">
                <Preloader color="orange"></Preloader>
            </Block>;
        }
        
        return(
            <div>
                <div className="sticky-div" style={{top: 35}}>
                  <Tabs value={this.state.index} variant="fullWidth" onChange={this.handleTabChange} style={styles.tabs}>
                      <Tab label="Recent Items" />
                      <Tab label="Free Items" />
                  </Tabs>
                </div>
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                  <div style={Object.assign({}, styles.slide, styles.slide1)}>
                      <ProductContainerInfinite items={this.state.items1} />
                      <div
                      ref={loadingRef => (this.loadingRef = loadingRef)}
                      style={loadingCSS}
                      >
                        {loading1}
                      </div>
                  </div>
                  <div style={Object.assign({}, styles.slide, styles.slide2)}>
                      <ProductContainerInfinite items={this.state.items2} />
                      <div
                      ref={loadingRef2 => (this.loadingRef2 = loadingRef2)}
                      style={loadingCSS}
                      >
                        {loading2}
                      </div>
                  </div>
                </SwipeableViews>
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