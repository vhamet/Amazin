import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import Resend from './Resend'
import ResetPassword from './ResetPassword'
import Confirmation from './Confirmation'
import NotFound from './NotFound'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Content = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/resend' component={Resend}/>
      <Route path='/reset-password' component={ResetPassword}/>
      <Route exact path='/confirmation/:token' component={Confirmation}/>
      <Route component={NotFound} />
    </Switch>
  </main>
)

export default Content
