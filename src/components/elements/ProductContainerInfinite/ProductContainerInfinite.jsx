import React, { Component } from 'react';
import "./ProductContainerInfinite.scss";
import { NavLink } from 'react-router-dom';
import ProductCard from '../ProductCard';

class ProductContainerInfinite extends Component {
    
    render() {
        if(typeof(this.props.items) !== "undefined") {
            const items = this.props.items;
            return(
                <div className="recommended product segments-bottom">
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.title}</h3>
                        </div>
                        { items.map(function (item, i) {
                            if((i+1)%2 == 1) {
                                if(typeof(items[i+1]) !== "undefined") {
                                    return (
                                        <div className="row">
                                            <div className="col-50">
                                                <ProductCard item={items[i]} />
                                            </div>
                                            <div className="col-50">
                                                <ProductCard item={items[i+1]} />
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="row">
                                            <div className="col-50">
                                                <ProductCard item={items[i]} />
                                            </div>
                                        </div>
                                    );
                                }
                            } else {
                                return '';
                            }
                        })}
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default ProductContainerInfinite;

