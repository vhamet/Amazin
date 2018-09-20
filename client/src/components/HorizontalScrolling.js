import React, { Component } from 'react';
import ItemBox from './ItemBox';
import { Link } from 'react-router-dom';

import '../style/horizontalScrolling.css';

class HorizontalScrolling extends Component {
  constructor() {
    super();
    this.state = {
      items: [{},{},{},{},{},{},{},{},{},{},{},{},{}]
    };
  }

  render() {
    const itemBoxes = [];
    const handleAddToCart = this.props.handleAddToCart;
    (this.props.items || this.state.items).forEach( function(element, index) {
      itemBoxes.push(<ItemBox item={element} key={element._id || index} handleAddToCart={handleAddToCart}/>);
    });
    return (
      <div className="container-fluid container-horizontal">
        <span className="horizontal-scrolling-title align-baseline"><label>{this.props.title}</label>&nbsp;&nbsp;<Link to="">See more</Link></span>
        <div className="container-horizontal-scrolling">
        <div className="d-flex flex-row flex-nowrap">
            {itemBoxes}
        </div>
      </div>
    </div>
    );
  }
}

export default HorizontalScrolling;
