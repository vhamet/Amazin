import React from 'react';
import PropTypes from 'prop-types';
import PasswordMask from 'react-password-mask';

const SignupForm = props => (
  <div className="signup">
    <h3>New here ? Please sign up </h3>
    <form name="signupForm" onSubmit={props.handleSubmit}>
      <input name="firstname" type="text" required placeholder="First name" value={props.firstname} onChange={props.handleChangeText} /><br/>
      <input name="lastname" type="text" required placeholder="Last name" value={props.lastname} onChange={props.handleChangeText} /><br/>
      <input name="email" type="text" required placeholder="Email address" value={props.email} onChange={props.handleChangeText} /><br/>
      <PasswordMask name="password" required placeholder="Password" value={props.password} onChange={props.handleChangeText} useVendorStyles={false}/><br/>
      <PasswordMask name="confirm" required placeholder="Confirm password" value={props.confirm} onChange={props.handleChangeText} useVendorStyles={false}/><br/>
      <label name="error">{props.error}</label><br/>
      <input name="submit" type="submit" value="Sign up !" />
    </form>
  </div>
);

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirm: PropTypes.string
};

SignupForm.defaultProps = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm: ''
};

export default SignupForm;
