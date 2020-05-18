import React, { Component } from 'react';
import "./ProductContainerWithTab.scss";
import Masonry from 'react-masonry-css';
import ProductCardWithLove from '../ProductCardWithLove';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

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
                <AppBar position="static" color="default">
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example">
                      <Tab label="Recently added items" {...a11yProps(0)} />
                      <Tab label="Free items" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <div className="container" >
                    <TabPanel value={this.state.value} index={0} style={{padding: 0}} ref={(ref) => this.scrollParentRef = ref}>
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid-tab"
                            columnClassName="my-masonry-grid_column">
                            {items1}
                        </Masonry>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <Masonry
                            breakpointCols={2}
                            className="my-masonry-grid-tab "
                            columnClassName="my-masonry-grid_column">
                            {items2}
                        </Masonry>
                    </TabPanel>
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