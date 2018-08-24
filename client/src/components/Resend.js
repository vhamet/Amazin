import React, { Component } from 'react';
import 'whatwg-fetch';
import '../style/resend.css';

class Resend extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errorMessage: '',
      sent: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: '' });
    if (this.state.email) {
      var email = this.state.email;
      fetch('/authentification/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })})
      .then(res => res.json()).then((res) => {
        if (res.success)
          this.setState({ sent: true });
        else
          this.setState({ errorMessage: res.message });
      });
    }
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    let content;
    if (this.state.sent) {
      content = (
        <div>
          <p>An email has been sent to <i>{this.state.email}</i> !</p>
          <div>
            <button className="btn btn-primary" onClick={this.props.handleSwitchToHome}>Start shopping</button>
          </div>
        </div>
      );
    }
    else {
      content = (
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="username">Email address</label>
              <input className="form-control" name="email" type="email" required value={this.state.email} onChange={this.onChangeText}/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!this.state.email} onClick={this.handleSubmit}>Send</button>
          </form>
        </div>
      );
    }

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
        <div id="signinContainer" className="rounded">
          <div className="title"><h3>Resend confirmation mail </h3></div>
            {content}
        </div>
      </div>
    );
  }
}

export default Resend;
