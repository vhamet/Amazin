import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Navbar from './Navbar';
import Content from './Content';
import Footer from './Footer';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      signedIn: false
    };
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    fetch('/authentification', {method: 'GET'})
    .then(res => res.json()).then((res) => {
        this.setState({ ready: true, signedIn: res.signedIn });
    });
  }

  signOut() {
    fetch('/authentification/signout', {method: 'GET'})
    .then(res => res.json()).then((res) => {
        if (res.success) {
          this.setState({ signedIn: false });
          return <Redirect to='/' />
        }
        else {
          //todo
        }
    });
  }

  signIn() {
    this.setState({ signedIn: true });
  }

  render() {
    return (
      <div>
        <Navbar ready={this.state.ready} signedIn={this.state.signedIn} handleSignOut={this.signOut}/>
        <div className="content-container">
          <Content signedIn={this.state.signedIn} handleSignIn={this.signIn}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page;
