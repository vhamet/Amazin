import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import Resend from './Resend'
import SendReset from './SendReset'
import ResetPassword from './ResetPassword'
import Confirmation from './Confirmation'
import NotFound from './NotFound'

class Content extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => (<Home {...props} signedIn={this.props.signedIn} handleAddToCart={this.props.handleAddToCart}/>)} />
          <Route exact path='/signin' render={(props) => (<Signin {...props} signedIn={this.props.signedIn} handleSignIn={this.props.handleSignIn} />)} />
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/resend' component={Resend}/>
          <Route exact path='/send-reset' component={SendReset}/>
          <Route exact path='/reset-password/:token' component={ResetPassword}/>
          <Route exact path='/confirmation/:token' component={Confirmation}/>
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Content
