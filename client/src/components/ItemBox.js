import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../style/itemBox.css';
import spinner from '../images/spinner.gif';

class ItemBox extends Component {
  constructor() {
    super();
    this.state = {
      isHovered: false
    };
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(){
    this.setState({
      isHovered: !this.state.isHovered
    });
  }

  render() {
    if (this.props.item.name) {
      const itemBoxClass = "item-box" + (this.state.isHovered ? " shadow p-3 mb-5 bg-white rounded item-box-hovered" : "");
      return (
        <div className={itemBoxClass} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
          <div className="divImg"><Link to=""><img className="mx-auto d-block" src={this.props.item.imgUrl} /></Link></div>
          <div className="divName"><Link to="">{this.props.item.name}</Link></div>
          <div className="divPrice">${this.props.item.price}</div>
          <div className="divCart">
            <button className="btn btn-primary border border-left-0" onClick={() => this.props.handleAddToCart(this.props.item)}>
              <i className="fas fa-cart-arrow-down"></i> Add to cart
            </button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="item-box">
          <div className="divImgEmpty"><img className="mx-auto d-block" src={spinner} /></div>
          <div><label className="aTitle empty">&nbsp;</label></div>
          <div><label className="price empty">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></div>
          <div className="divCart"><button className="btn btn-secondary border border-left-0" disabled><i className="fas fa-cart-arrow-down"></i> Add to cart</button></div>
        </div>
      );
    }
  }
}

export default ItemBox;
