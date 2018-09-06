import React, { Component } from 'react';
import {  Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import 'whatwg-fetch';
import '../style/signin.css';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      keepMeSignedIn: false,
      validUsername: false,
      errorMessage: '',
      popoverOpen: false,
      toVerify: false,
      signedIn: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.toggle = this.toggle.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  onChangeCheck = (e) => {
    this.setState({ keepMeSignedIn: e.target.checked });
  }

  handleSubmitUsername = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });
    if (this.state.username) {
      var username = this.state.username;
      fetch('/authentification/check-user-exists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })})
      .then(res => res.json()).then((res) => {
        if (res.success)
          this.setState({ validUsername: true });
        else
          this.setState({ errorMessage: res.message });
      });
    }
  }

  changeUsername() {
    this.setState({ validUsername: false, errorMessage: '' });
  }

  handleSubmitPassword = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });
    var { username, password, keepMeSignedIn } = this.state;
    fetch('/authentification/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, keepMeSignedIn })})
    .then(res => res.json()).then((res) => {
      if (res.success)
        this.setState({ signedIn: true });
      else if (res.toVerify)
        this.setState({ toVerify: true, errorMessage: res.message });
      else
        this.setState({ errorMessage: res.message });
    });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    if (this.props.signedIn)
      return (<Redirect to='/' />);

    if (this.state.signedIn) {
      this.props.handleSignIn();
      return (<Redirect to='/' />);
      }

    let content;
    if (!this.state.validUsername) {
      content = (
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username or email address</label>
              <input id="username" className="form-control" name="username" type="text" autoFocus required value={this.state.username} onChange={this.onChangeText}/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.username} onClick={this.handleSubmitUsername}>Continue</button>
          </form>
          <div className="helpContainer">
            <a href="" className="collapsed" data-toggle="collapse" data-target="#help" aria-expanded="true" aria-controls="help">
              <i className="fa" aria-hidden="true"></i>
              Need help ?
            </a>
            <div id="help" className="collapse">
              <Link to="/send-reset">Forgot your password ?</Link><br />
              <a href="">Other issues with sign in</a>
            </div>
          </div>
        </div>);
    }
    else {
      content = (
        <form>
          <div id="usernameContainer">
            <label>{this.state.username}</label>&nbsp;<button type="button" className="btn btn-link btn-link-small" onClick={this.changeUsername}>Change</button>
          </div>
          <div className="form-group">
            <label className="float-left" htmlFor="password">Password</label><Link className="float-right" to="/send-reset">Forgot your password ?</Link>
            <input id="password" className="form-control" name="password" type="password" required autoFocus onChange={this.onChangeText} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.state.password} onClick={this.handleSubmitPassword}>Sign in</button>
          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" onChange={this.onChangeCheck}/> Keep me signed in.
            </label>&nbsp;
            <button type="button" className="btn btn-link btn-link-small" id="Popover1" onClick={this.toggle}>Details</button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverHeader><b>"Keep Me Signed In" Checkbox</b><button type="button" className="close" onClick={this.toggle}>&times;</button></PopoverHeader>
              <PopoverBody>
                Choosing "Keep me signed in" reduces the number of times you are asked to sign in on this device.<br/><br/>
                To keep your account secure, use this option only on your personal devices.</PopoverBody>
            </Popover>
          </div>
        </form>);
    }

    return (
      <div className="container slim-container">
        <div className="text-center">
          <a href="/" className="navbar-brand">Amazin</a>
        </div>
        {this.state.errorMessage && (
          <div class="alert alert-danger" role="alert">
            <h5><i className="fa fa-exclamation-triangle"></i>&nbsp;There was a problem</h5>
            {this.state.errorMessage}
            {this.state.toVerify && (
              <p><br/>If you did not receive any confirmation email, please check your spams or try <Link to="resend">resending confirmation</Link>.</p>
            )}
          </div>)}
        <div id="signinContainer" className="rounded">
          <div className="title"><h3>Sign in </h3></div>
          {content}
        </div>
        <div className="divider">
          <hr className="hr-left"/>New to Amazin ?<hr className="hr-right" />
        </div>
        <div>
          <Link id="switchBtn" className="btn btn-light btn-lnk" to="signup">Create your Amazin account</Link>
        </div>
      </div>
    );
  }
}

export default Signin;
