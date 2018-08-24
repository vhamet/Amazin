import React, { Component } from 'react';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer';
import Resend from './Resend';
import { displayScreen } from '../utils/const';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      toDisplay: displayScreen.home,
      signedIn: false
    };
  }

  switchHome = (e) => {
    this.setState({ toDisplay: displayScreen.home });
  }

  switchSignin = (e) => {
    this.setState({ toDisplay: displayScreen.signin });
  }

  switchSignup = (e) => {
    this.setState({ toDisplay: displayScreen.signup });
  }

  switchResend = (e) => {
    this.setState({ toDisplay: displayScreen.resend });
  }

  setSignedIn = (e) => {
    this.setState({ toDisplay: displayScreen.home, signedIn: true });
  }

  render() {
    let content;
    switch (this.state.toDisplay) {
      case displayScreen.home: content = (
        <div>
          <Jumbotron />
          {(this.state.signeddIn && <div>LoGGED</div>) || <div>NOT LoGGED</div>}
        </div>);
        break;
      case displayScreen.signin:
        content = (<Signin handleSwitchToSignup={this.switchSignup}
                           handleSwitchToResend={this.switchResend}
                           handleSignedIn={this.setSignedIn}/>);
        break;
      case displayScreen.signup:
        content = (<Signup handleSwitchToSignin={this.switchSignin}
                            handleSwitchToResend={this.switchResend}/>);
        break;
      case displayScreen.resend:
        content = (<Resend handleSwitchToHome={this.switchHome}/>);
        break;
      default: content = (
        <div>
          <Jumbotron />
          <Home />
        </div>
      );
    }

    return (
      <div>
        <Navbar handleClickSignin={this.switchSignin} handleClickSignup={this.switchSignup}/>
        <div className="content-container">
          {content}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page;
