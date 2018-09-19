import React, { Component } from 'react';

import '../style/itemBox.css';
import spinner from '../images/spinner.gif';

class ItemBox extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    if (this.props.item.name) {
      return (
        <div className="item-box">
          ITEM
        </div>
      );
    }
    else {
      return (
        <div className="item-box">
          <div><img src={spinner} /></div>
          <div><label className="aTitle empty">&nbsp;</label></div><br />
          <div><label className="price empty">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></div>
        </div>
      );
    }
  }
}

export default ItemBox;
