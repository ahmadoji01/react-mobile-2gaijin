import React from "react";
import "./CategorySlider.scss";

const CategorySlider = () => (
    <div className="categories segments no-pd-b">
        <div className="container">
            <div className="section-title">
                <h3>Categories</h3>
            </div>
            <div className="row">
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <span>Phone</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content">
                        <a href="/categories-details/">
                            <div className="icon">
                                <i className="fas fa-tshirt"></i>
                            </div>
                            <span>T-Shirt</span>
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
                                <i className="fas fa-tools"></i>
                            </div>
                            <span>Tools</span>
                        </a>
                    </div>
                </div>
                <div className="col-20">
                    <div className="content all-categories-link">
                        <a href="/all-categories/">
                            <div className="icon">
                                <i className="fas fa-angle-right"></i>
                            </div>
                            <span>See All</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
); 

export default CategorySlider;