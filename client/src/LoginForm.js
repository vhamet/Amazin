import React, { Component } from 'react';
import 'whatwg-fetch';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      validUsername: false,
      errorMessage: '',
      popoverOpen: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.toggle = this.toggle.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  handleSubmitUsername = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });
    if (this.state.username) {
      var username = this.state.username;
      fetch('/authentification/user-exists', {
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
    this.setState({ validUsername: false });
  }

  handleSubmitPassword = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });
    var { username, password } = this.state;
    fetch('/authentification/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })})
    .then(res => res.json()).then((res) => {
      if (res.success)
        this.props.handleLoggedIn();
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
    let content;
    if (!this.state.validUsername) {
      content = (
        <div>
          <form name="loginForm">
            <div className="form-group">
              <label htmlFor="username">Username or email address</label>
              <input id="username" className="form-control" name="username" type="text" required value={this.state.username} onChange={this.onChangeText}/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.username} onClick={this.handleSubmitUsername}>Continue</button>
          </form>
          <div className="helpContainer">
            <a href="" className="collapsed" data-toggle="collapse" data-target="#help" aria-expanded="true" aria-controls="help">
              <i className="fa" aria-hidden="true"></i>
              Need help ?
            </a>
            <div id="help" className="collapse">
              <a href="">Forgot your password ?</a><br />
              <a href="">Other issues with sign in</a>
            </div>
          </div>
        </div>);
    }
    else {
      content = (
        <form name="loginForm">
          <div id="usernameContainer">
            <label>{this.state.username}</label>&nbsp;<a href="#" onClick={this.changeUsername}>Change</a>
          </div>
          <div className="form-group">
            <div><label className="float-left" htmlFor="passwordLogin">Password</label><a className="float-right" href="">Forgot your password ?</a></div>
            <input id="password" className="form-control" name="password" type="password" required onChange={this.onChangeText} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.state.password} onClick={this.handleSubmitPassword}>Sign in</button>
          <div className="form-group form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" /> Keep me signed in.
            </label>&nbsp;
            <a href="#" id="Popover1" onClick={this.toggle}>Details</a>
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
      <div className="container loginContainer">
        <div className="text-center">
          <a href="/" className="navbar-brand">Amazin</a>
        </div>
        {this.state.errorMessage && (
          <div class="alert alert-danger" role="alert">
            <h5><i className="fa fa-exclamation-triangle"></i>&nbsp;There was a problem</h5>
            {this.state.errorMessage}
          </div>)}
        <div className="loginForm rounded">
          <div className="title"><h3>Sign in </h3></div>
          {content}
        </div>
        <div className="divider">
          <hr className="hr-left"/>New to Amazin ?<hr className="hr-right" />
        </div>
        <div>
          <button className="btn" onClick={this.props.handleSwitchToSignup}>Create your Amazin account</button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
