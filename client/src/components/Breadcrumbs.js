import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../style/breadcrumbs.css';

class Breadcrumbs extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="container-fluid container-breadcrumb">
        <Link to="/"><i className="fa fa-fw fa-home"></i></Link>

        {this.props.active && (<span>&#8250;<label>{this.props.active}</label></span>)}
      </div>
    );
  }
}

export default Breadcrumbs;
