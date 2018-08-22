import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = props => (
  <div className="login">
    <h3>Already signed up ? Please log in </h3>
    <form name="loginForm" onSubmit={props.handleSubmit}>
      <input name="username" type="text" required placeholder="Email address" value={props.username} onChange={props.handleChangeText}/>
      <input name="passwordLogin" type="password" required placeholder="Password" value={props.passwordLogin} onChange={props.handleChangeText}/>
      <input name="submit" type="submit" value="Log in" />
    </form>
  </div>

);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  username: PropTypes.string,
  passwordLogin: PropTypes.string
};

LoginForm.defaultProps = {
  username: '',
  passwordLogin: ''
};

export default LoginForm;
