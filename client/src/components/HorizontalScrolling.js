import React, { Component } from 'react';
import ItemBox from './ItemBox';

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
    (this.props.items || this.state.items).forEach( function(element, index) {
      itemBoxes.push(<ItemBox item={element}/>);
    });
    return (
      <div className="container-fluid container-horizontal-scrolling">
        <div className="d-flex flex-row flex-nowrap">
            {itemBoxes}
        </div>
    </div>
    );
  }
}

export default HorizontalScrolling;
