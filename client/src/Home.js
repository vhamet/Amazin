import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import 'whatwg-fetch';
var emailValidator = require('email-validator');

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: '',
      errorSignup: '',
      username: '',
      passwordLogin: ''
    };
  }

  componentDidMount() {
    this.isLogged();
  }

  isLogged = () => {
    fetch('/home')
    .then(data => data.json())
    .then((res) => {
      if (!res.success) this.setState({ isLogged: false });
      else this.setState({ isLogged: res.logged });
    });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  checkSignupForm(email, password, confirm) {
    if (!emailValidator.validate(email))
      return 'Email address invalid !';
    if (!/[A-Z]/.test(password))
      return 'Password should contain at least one uppercase letter';
    if (!/[a-z]/.test(password))
      return 'Password should contain at least one lowercase letter';
    if (!/[0-9]/.test(password))
      return 'Password should contain at least one number';
    if (!/[^A-Za-z0-9]/.test(password))
      return 'Password should contain at least one special character';
    if (password.length < 5)
      return 'Password should be more than 4 characters';
    if (password !== confirm)
        return 'Password does not match the confirm password';

      return '';
  }

  submitSignup = (e) => {
    e.preventDefault();
    var { firstname, lastname, email, password, confirm } = this.state;
    var error = this.checkSignupForm(email, password, confirm);
    if (error.length)
      this.setState({errorSignup: error});
    else {
      fetch('/home/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password })})
      .then(res => res.json()).then((res) => {
          if (!res.success) alert(res.message);
          else alert(res.message);
        });
      }
    }

    submitLogin = (e) => {
      e.preventDefault();
      var { username, passwordLogin } = this.state;
      fetch('/home/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, passwordLogin })})
      .then(res => res.json()).then((res) => {
        if (!res.success)
          alert(res.message);
        else
          this.setState({ isLogged: true });
      });
    }

    render() {
      if (!this.state.isLogged) {
        return (
          <div className="container">
            <div>
              <LoginForm
                handleSubmit={this.submitLogin}
                handleChangeText={this.onChangeText}
                passwordLogin={this.state.passwordLogin}
                username={this.state.username} />
            </div>
            <div>
              <SignupForm
                handleSubmit={this.submitSignup}
                handleChangeText={this.onChangeText}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                email={this.state.email}
                password={this.state.password}
                confirm={this.state.confirm}
                error={this.state.errorSignup}/>
            </div>
          </div>
        );
      }

      return (<label>logged</label>);
    }
  }

  export default Home;
