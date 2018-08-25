import React, { Component } from 'react';
import Jumbotron from './Jumbotron';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  render() {
    return (
      <div className="container">
        <Jumbotron />
        {(this.state.isLogged && <h1>LOGGED</h1>) || <h1>NOT LOGGED</h1> }
      </div>
    );
  }
}

export default Home;
