import React, { Component } from 'react';
import "./SearchRecommendation.scss";
import { Chip } from 'framework7-react';

class SearchRecommendation extends Component {
    constructor(props) {
        super(props);
    }

    chipClick(link) {
        this.$f7.views.main.router.navigate(link);
    }
    
    render() {
        return (
            <div className="slider" style={{ marginTop: 100 }}>
                <div className="container" style={{display: 'flex', flexWrap: "nowrap", overflow: "auto"}}>
                    <Chip onClick={() => this.chipClick("/search/Refrigerator")} text="Refrigerator" color="orange" />
                    <Chip onClick={() => this.chipClick("/search/Washing Machine")} outline text="Washing Machine" color="#F2F7FF" />
                    <Chip onClick={() => this.chipClick("/search/ /Electronics")} outline text="Electronics" color="#F2F7FF" />
                    <Chip onClick={() => this.chipClick("/search/ /Furnitures")} outline text="Furnitures" color="#F2F7FF" />
                    <Chip onClick={() => this.chipClick("/search/ /Kitchens")} outline text="Kitchens" color="#F2F7FF" />
                    <Chip onClick={() => this.chipClick("/search/Table")} outline text="Table" color="#F2F7FF" />
                </div>
            </div>
        )
    }
}

export default SearchRecommendation;