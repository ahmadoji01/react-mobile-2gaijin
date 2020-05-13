import React, { Component } from 'react'
import { ReactSVG } from 'react-svg'
import "./CategoryIcon.scss"

class CategoryIcon extends Component {
    
    render() {
        if(typeof(this.props.iconname) !== 'undefined') {
            return(
                <div className={`cat-icon-base base-${this.props.iconcolor}-color`}>
                    <ReactSVG className="icon-svg" src={`${process.env.PUBLIC_URL}/icons/${this.props.iconname.replace(/\s+/g, '')}Icon.svg`} />
                    <span className="icon-name">{this.props.iconname}</span>
                </div>
            )
        }
    }

}

export default CategoryIcon;