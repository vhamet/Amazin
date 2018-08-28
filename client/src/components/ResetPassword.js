import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'whatwg-fetch';
import { resetStatus } from '../utils';
import '../style/resetPassword.css';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      status: 0,
      message: '',
      errorMessage: '',
      password: '',
      confirmation: '',
      working: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/authentification/reset-password/' + this.props.match.params.token, {method: 'GET'})
    .then(res => res.json()).then((res) => {
      if (!res.status)
        this.setState({ status: resetStatus.error, errorMessage: res.message });
      else
        this.setState({ status: res.status, message: res.message });
    });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
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
    this.setState({ working: true, errorMessage: '' });
    var token = this.props.match.params.token;
    var password = this.state.password;
    fetch('/authentification/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })})
    .then(res => res.json()).then((res) => {
      if (!res.status)
        this.setState({ working: false, status: resetStatus.error, errorMessage: res.message });
      else
        this.setState({ working: false, status: res.status, message: res.message });
      });
  }

  render() {
    let content;
    switch(this.state.status) {
      case resetStatus.expired: content = (<div><p>{this.state.message}</p><p>Try <Link to="/send-reset">resending the password reset email</Link>.</p></div>); break;
      case resetStatus.nouser: content = (<div><p>{this.state.message}</p><p>Please <Link to="/signup">sign up</Link>.</p></div>); break;
      case resetStatus.valid:
        var errorPassword = this.checkPassword();
        var errorConfirmation = this.state.password && this.state.confirmation && this.state.password !== this.state.confirmation ? 'Passwords mismatch. Please check your input' : '';
        var disabled = this.state.working || !this.state.password || !this.state.confirmation || errorPassword || errorConfirmation;
        content = (
          <form>
          <p>Please enter your new password and click save to update it.</p>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className={"form-control " + (errorPassword && "invalid")} title={errorPassword} name="password" type="password" required
                    value={this.state.password} onChange={this.onChangeText}/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmation">Re-enter password</label>
              <input className={"form-control " + (errorConfirmation && "invalid")}  title={errorConfirmation} name="confirmation" type="password" required
                  value={this.state.confirmation} onChange={this.onChangeText}/>
            </div>
            {(this.state.working && <div className="progress progress-btn"><div className="progress-bar progress-bar-striped progress-bar-animated"></div></div>)
              || <button disabled={disabled} type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>}
          </form>
        );
        break;
      case resetStatus.success: content = (<div><p>{this.state.message}</p><p>Please <Link to="/signin">sign in</Link>.</p></div>); break;
      default: content = (<div className="progress"><div className="progress-bar progress-bar-striped progress-bar-animated"></div></div>); break;
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
          </div>)}
        <div id="confirmationContainer" className="rounded">
          <div className="title"><h3>Password reset</h3></div>
            {content}
        </div>
      </div>
    );
  }
}

export default ResetPassword;
