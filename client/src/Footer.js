import React, { Component } from 'react';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  render() {
    return (
      <div className="footer text-center">
        <p>Footer</p>
      </div>
    );
  }
}

export default Footer;
