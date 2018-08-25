import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { validateEmail } from '../utils';
import 'whatwg-fetch';
import '../style/resetPassword.css';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errorMessage: '',
      sent: false,
      working: false,
      emailValid: false
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ working: true, errorMessage: '' });
    if (this.state.email) {
      var email = this.state.email;
      fetch('/authentification/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })})
      .then(res => res.json()).then((res) => {
        if (res.success)
          this.setState({ sent: true });
        else
          this.setState({ working: false, errorMessage: res.message });
      });
    }
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value, emailValid: validateEmail(e.target.value)});
  }

  render() {
    let content;
    if (this.state.sent) {
      content = (
        <div>
          <p>An email has been sent to <i>{this.state.email}</i> !</p>
          <div>
            <Link className="btn btn-primary btn-lnk" to="/">Start shopping</Link>
          </div>
        </div>
      );
    }
    else {
      var errorEmail = this.state.email && !this.state.emailValid ? 'Email invalid' : '';
      content = (
        <div>
          <p>If you forgot your password, please enter your email address below and click <i>Send</i>. An email with further instructions will be sent to you.</p>
          <form>
            <div className="form-group">
              <label htmlFor="username">Email address</label>
              <input className={"form-control " + (errorEmail && "invalid")} name="email" type="email" title={errorEmail} required onChange={this.onChangeEmail}/>
            </div>
            {(this.state.working && <div className="progress progress-btn"><div className="progress-bar progress-bar-striped progress-bar-animated"></div></div>)
              || <button type="submit" className="btn btn-primary" disabled={!this.state.emailValid || this.state.working} onClick={this.handleSubmit}>Send</button>}
          </form>
        </div>
      );
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
        <div id="resetPasswordContainer" className="rounded">
          <div className="title"><h3>Reset password</h3></div>
            {content}
        </div>
      </div>
    );
  }
}

export default ResetPassword;
