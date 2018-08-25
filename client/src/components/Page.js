import React, { Component } from 'react';
import Navbar from './Navbar';
import Content from './Content';
import Footer from './Footer';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="content-container">
          <Content />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page;
