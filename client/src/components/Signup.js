import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';
import 'whatwg-fetch';
import '../style/signup.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmation: '',
      errorMessage: '',
      usernameAvailable: true,
      emailAvailable: true,
      signedUp: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkAvailability(field, value, state) {
    fetch('/authentification/available', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field, value })})
    .then(res => res.json()).then((res) => {
        this.setState({[field]: value, [state]: (res.success && res.available) });
    });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  checkUsername() {
    if (this.state.username) {
      if (this.state.username.length < 3)
        return 'Username should be at least 3 characters long';
      if (this.state.username.length > 25)
        return 'Username should be at most 25 characters long';
      if (!/^[A-Za-z0-9_-]*$/.test(this.state.username))
        return 'Invalid username. Please only use alphanumeric, hyphen or underscore (3 to 25 characters)';
      if (!this.state.usernameAvailable)
        return 'Username already taken';
    }

    return '';
  }

  checkPassword() {
    if (this.state.password) {
      if (!/[A-Z]/.test(this.state.password))
        return 'Password should contain at least one uppercase letter';
      if (!/[a-z]/.test(this.state.password))
        return 'Password should contain at least one lowercase letter';
      if (!/[0-9]/.test(this.state.password))
        return 'Password should contain at least one number';
      if (!/[^A-Za-z0-9]/.test(this.state.password))
        return 'Password should contain at least one special character';
      if (this.state.password.length < 5)
        return 'Password should be more than 4 characters';
    }
    return '';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });
    var { username, email, password } = this.state;
    fetch('/authentification/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })})
    .then(res => res.json()).then((res) => {
      if (res.success)
        this.setState({ signedUp: true });
      else
        this.setState({ errorMessage: res.message });
      });
  }

  render() {
    if (this.state.signedUp) {
      return (
        <div className="container">
          <div className="text-center">
            <a href="/" className="navbar-brand">Amazin</a>
          </div>
          <div id="signupContainer"  className="rounded">
            <div className="title"><h3>Welcome to Amazin {this.state.username} !</h3></div>
            <p>A verification email has been sent to <i>{this.state.email}</i>. If you do not receive this email, please check your spams or try
              <a href="#" onClick={this.props.handleSwitchToResend}>resending it</a>.</p>
          </div>
          <div>
            <button className="btn btn-primary">Start shopping</button>
          </div>
        </div>
      );
    }

    var errorUsername = this.checkUsername();
    var errorEmail = this.state.emailAvailable ? '' : 'Email addressed already used';
    var errorPassword = this.checkPassword();
    var errorConfirmation = this.state.password && this.state.confirmation && this.state.password !== this.state.confirmation ? 'Passwords mismatch. Please check your input' : '';
    return (
      <div className="container">
        <div className="text-center">
          <a href="/" className="navbar-brand">Amazin</a>
        </div>
        {this.state.errorMessage && (
          <div class="alert alert-danger" role="alert">
            <h5><i className="fa fa-exclamation-triangle"></i>&nbsp;There was a problem</h5>
            {this.state.errorMessage}
          </div>)}
        <div id="signupContainer" className="rounded">
          <div className="title"><h3>Create account</h3></div>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className={"form-control " + (errorUsername && "invalid")} title={errorUsername} name="username" onChange={this.onChangeText}
                onBlur={e => this.checkAvailability(e.target.name, e.target.value, 'usernameAvailable')} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input className={"form-control " + (errorEmail && "invalid")}  title={errorEmail} name="email" type="email" onChange={this.onChangeText}
                onBlur={e => this.checkAvailability(e.target.name, e.target.value, 'emailAvailable')} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" className={"form-control " + (errorPassword && "invalid")} title={errorPassword} name="password" type="password" required value={this.state.password} onChange={this.onChangeText}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmation">Re-enter password</label>
              <input id="confirmation" className={"form-control " + (errorConfirmation && "invalid")}  title={errorConfirmation}  name="confirmation" type="password" required value={this.state.confirmation} onChange={this.onChangeText}/>
            </div>
            <button disabled={!this.state.username || !this.state.email || !this.state.password || !this.state.confirmation || errorUsername || errorEmail || errorPassword || errorConfirmation}
              type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Create your Amazin account</button>
            <div id="conditions">
              <label>By creating an account, you agree to Amazin&apos;s <a href="todo">Conditions of Use</a> and <a href="todo">Privacy Notice</a>.</label>
            </div>
            <div id="switch">
              <div className="gradient-divider-1"></div>
              <div className="gradient-divider-2"></div>
              <label>Already have an account ? <a href="#" onClick={this.props.handleSwitchToSignin}>Sign in</a></label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
