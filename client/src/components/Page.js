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
      signedIn: false,
      cart: []
    };
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    fetch('/authentification', { method: 'GET', credentials: 'include' }, )
    .then(res => res.json()).then((res) => {
        this.setState({ ready: true, signedIn: res.signedIn });
    });
    fetch('/cart/getItems', { method: 'GET', credentials: 'include' }, )
    .then(res => res.json()).then((res) => {
        this.setState({ cart: res.cart });
    });
  }

  signOut() {
    fetch('/authentification/signout', { method: 'GET', credentials: 'include' })
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

  addToCart(item) {
    fetch('/cart/addItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ item })})
    .then(res => res.json()).then((res) => {
        this.setState({ cart: res.items });
    });
  }

  render() {
    return (
      <div>
        <Navbar ready={this.state.ready} signedIn={this.state.signedIn} handleSignOut={this.signOut} cart={this.state.cart} />
        <div className="content-container">
          <Content signedIn={this.state.signedIn} handleSignIn={this.signIn} handleAddToCart={this.addToCart} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page;
