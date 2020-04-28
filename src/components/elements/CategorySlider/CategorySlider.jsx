import React from "react";
import "./CategorySlider.scss";

const CategorySlider = () => (
    <div className="categories segments no-pd-b">
        <div className="header-container">
            <h3>Explore Categories</h3>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-20">
                    <div className="content">
                        <a href="/all-categories/">
                            <div className="icon">
                                <i className="fas fa-th"></i>
                            </div>
                            <span>Show All</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-tshirt"></i>
                            </div>
                            <span>Apparel</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-chair"></i>
                            </div>
                            <span>Furniture</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-camera"></i>
                            </div>
                            <span>Photo</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-headphones-alt"></i>
                            </div>
                            <span>Accessories</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <span>Handphone</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-basketball-ball"></i>
                            </div>
                            <span>Sports</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-pizza-slice"></i>
                            </div>
                            <span>Food</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-plug"></i>
                            </div>
                            <span>Electronic</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-car"></i>
                            </div>
                            <span>Automotive</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
); 

export default CategorySlider;