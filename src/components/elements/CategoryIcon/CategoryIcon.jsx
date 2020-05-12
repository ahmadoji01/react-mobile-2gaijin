import React, { Component } from 'react'
import { ReactSVG } from 'react-svg'
import "./CategoryIcon.scss"

class CategoryIcon extends Component {
    
    render() {
        return(
            <div className="cat-icon-base">
                <ReactSVG src="./FootwearIcon.svg" />
            </div>
        )
    }

}

export default CategoryIcon;