import React, { Component } from 'react';

class Jumbotron extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  render() {
    return (
      <div className="jumbotron text-center">
        <h1>My First Bootstrap 4 Page</h1>
        <p>Resize this responsive page to see the effect!</p>
        <span className="glyphicon glyphicon-user"></span>
      </div>
    );
  }
}

export default Jumbotron;
