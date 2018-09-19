import React, { Component } from 'react';
import Carousel from './Carousel';
import HorizontalScrolling from './HorizontalScrolling';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      items: null
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="container-fluid">
        <Carousel />
        {(this.props.signedIn && <h1>LOGGED</h1>) || <h1>NOT LOGGED</h1> }
        <HorizontalScrolling items={this.state.items}/>
      </div>
    );
  }
}

export default Home;
