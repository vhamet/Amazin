import React, { Component } from 'react';
import 'whatwg-fetch';
import { confirmationStatus } from './const';

class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      status: 0,
      message: '',
      email: ''
    };
  }

  componentDidMount() {
    fetch('/home/confirmation/' + this.props.token, {
      method: 'GET'})
    .then(res => res.json()).then((res) => {
      this.setState({ status: res.status, message: res.message });
    });
  }

  onChangeText = (e) => {
    this.setState({ email: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var email = this.state.email;
    fetch('/home/resend/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })})
    .then(res => res.json()).then((res) => {
      if (res.success)
        this.setState({ status: 5, message: res.message });
      else
        this.setState({ status: 1, message: res.message });
    });
  }

  render() {
    return (
      <div className="confirmation">
        <h3>Account verification</h3>
          <label name="message">{this.state.message}</label><br/>
          { this.state.status ===  confirmationStatus.expired && (
            <form name="confirmationForm" onSubmit={this.handleSubmit}>
              <input name="email" type="text" placeholder="Email address" required onChange={this.onChangeText}/>
              <input name="resend" type="submit" value="Resend" />
            </form>
          )}
      </div>
    );
  }
}

export default Confirmation;
