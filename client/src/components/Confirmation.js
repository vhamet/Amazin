import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'whatwg-fetch';
import { confirmationStatus } from '../utils';
import '../style/confirmation.css';

class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      status: 0,
      message: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    fetch('/authentification/confirmation/' + this.props.match.params.token, {method: 'GET'})
    .then(res => res.json()).then((res) => {
      if (!res.status)
        this.setState({ status: confirmationStatus.error, errorMessage: res.message });
      else
        this.setState({ status: res.status, message: res.message });
    });
  }

  render() {
    let content;
    switch(this.state.status) {
      case confirmationStatus.expired: content = (<div><p>{this.state.message}</p><p>Try <Link to="/resend">resending confirmation</Link>.</p></div>); break;
      case confirmationStatus.nouser: content = (<div><p>{this.state.message}</p><p>Please <Link to="/signup">sign up</Link>.</p></div>); break;
      case confirmationStatus.verified:
      case confirmationStatus.success: content = (<div><p>{this.state.message}</p><p>Please <Link to="/signin">sign in</Link>.</p></div>); break;
      case confirmationStatus.error: content = (<div></div>); break;
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
          <div className="title text-center"><h3>Account verification</h3></div>
            {content}
        </div>
      </div>
    );
  }
}

export default Confirmation;
