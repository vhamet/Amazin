import React, { Component } from 'react';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import Footer from './Footer';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      toDisplay: 0,
      loggedIn: false
    };
  }

  clickSignin = (e) => {
    this.setState({ toDisplay: 1 });
  }

  clickSignup = (e) => {
    this.setState({ toDisplay: 2 });
  }

  setLoggedIn = (e) => {
    this.setState({ toDisplay: 0, loggedIn: true });
  }

  render() {
    let content;
    switch (this.state.toDisplay) {
      case 0: content = (
        <div>
          <Jumbotron />
          {this.state.loggedIn && <div>LoGGED</div>}
          {!this.state.loggedIn && <div>NOT LoGGED</div>}
        </div>);
        break;
      case 1: content = (<LoginForm handleSwitchToSignup={this.clickSignup} handleLoggedIn={this.setLoggedIn}/>); break;
      case 2: content = (<SignupForm />); break;
      default: content = (
        <div>
          <Jumbotron />
          <Home />
        </div>
      );
    }

    return (
      <div>
        <Navbar handleClickSignin={this.clickSignin}/>
        <div className="content-container">
          {content}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page;
