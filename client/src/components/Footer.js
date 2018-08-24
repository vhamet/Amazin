import React, { Component } from 'react';
import '../style/footer.css';

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
        <div className="gradient-divider-1"></div>
        <div className="gradient-divider-2-wide"></div>
        <p>Footer</p>
      </div>
    );
  }
}

export default Footer;
