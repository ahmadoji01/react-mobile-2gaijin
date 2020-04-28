import React, { Component } from 'react';
import "./ProductContainerInfinite.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';

class ProductContainerInfinite extends Component {
    
    render() {
        return(
            <div className="recommended product segments-bottom">
                <div className="container">
                    <div className="section-title">
                        <h3>Recommended For You</h3>
                    </div>
                    <div className="row">
                        <div className="col-50">
                            <ProductCard />
                        </div>
                        <div className="col-50">
                            <ProductCard />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-50">
                            <ProductCard />
                        </div>
                        <div className="col-50">
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductContainerInfinite;

