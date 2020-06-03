import React, { Component } from 'react';
import "./ProductContainerWithTab.scss";
import Masonry from 'react-masonry-css';
import ProductCardWithLove from '../ProductCardWithLove';
import ProductContainerInfinite from '../../elements/ProductContainerInfinite';
import axios from 'axios';
import { geolocated } from 'react-geolocated';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { blue } from '@material-ui/core/colors';

const styles = {
  tabs: {
    background: '#fff',
    color: blue,
  },
  slide: {
    padding: 15,
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
      this.callback(value + 1);
      this.setState({
          index: value,
      });
    };

    handleChangeIndex = index => {
        this.setState({
            index,
        });
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
            sortby: "newest"
          }
      }  

      this.setState({ searchState: "recentitems" });

      return axios
      .get(`https://go.2gaijin.com/search`, config)
      .then(response => {
          this.setState({ items1: response.data.data.items });
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
          pricemax: 0
        }
      }
      
      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef2);

      this.setState({ searchState: "freeitems" });

      return axios
      .get(`https://go.2gaijin.com/search`, config)
      .then(response => {
          this.setState({ items2: response.data.data.items });
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
      if(key == 1) {
        this.firstTabLoader();
      } else if (key == 2) {
        this.secondTabLoader();
      }
    }

    getItems() {
      this.setState({ loading: true });
      if(this.state.searchState == "recentitems") {
        const lastItems = this.state.items1.length;
        let config = {
          headers: { },
          params: {
            start: lastItems + 1,
            limit: lastItems + 8,
            sortby: "newest"
          }
        }
        axios
        .get(`https://go.2gaijin.com/search`, config)
        .then(res => {
          this.setState({ items1: [...this.state.items1, ...res.data.data.items] });
          this.setState({ loading: false });
        });  
      } else if(this.state.searchState == "freeitems") {
        const lastItems = this.state.items2.length;
        let config = {
          headers: { },
          params: {
            start: lastItems + 1,
            limit: lastItems + 8,
            pricemax: 0
          }
        }
        axios
        .get(`https://go.2gaijin.com/search`, config)
        .then(res => {
          this.setState({ items2: [...this.state.items2, ...res.data.data.items] });
          this.setState({ loading: false });
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
        

        return(
            <div>
                <Tabs value={this.state.index} variant="fullWidth" onChange={this.handleTabChange} style={styles.tabs}>
                    <Tab label="Recent Items" />
                    <Tab label="Free Items" />
                </Tabs>
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                  <div style={Object.assign({}, styles.slide, styles.slide1)}>
                      <ProductContainerInfinite items={this.state.items1} />
                      <div
                      ref={loadingRef => (this.loadingRef = loadingRef)}
                      style={loadingCSS}
                      >
                          <span style={loadingTextCSS}>Loading...</span>
                      </div>
                  </div>
                  <div style={Object.assign({}, styles.slide, styles.slide2)}>
                      <ProductContainerInfinite items={this.state.items2} />
                      <div
                      ref={loadingRef2 => (this.loadingRef2 = loadingRef2)}
                      style={loadingCSS}
                      >
                          <span style={loadingTextCSS}>Loading...</span>
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