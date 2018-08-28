import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  getUserMenu() {
    let userMenu;
    if (!this.props.ready)
      userMenu = (<div>loading</div>);
    else if (this.props.signedIn) {
      userMenu = (
        <div>
          <div><button className="btn btn-primary border border-left-0" onClick={this.props.handleSignOut}>Sign out</button></div>
        </div>
      );
    }
    else {
      userMenu = (
      <div>
        <div><Link className="btn btn-primary border border-left-0" to="/Signin">Sign in</Link></div>
        <span className="dropdown-item-text">New customer ? <Link to="/Signup">Start here</Link></span>
      </div>
      );
    }

    return userMenu;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="/" className="navbar-brand">Amazin</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar1">
          <form className="mx-2 my-auto d-inline w-100">
            <div className="input-group">
              <input type="text" className="form-control border border-right-0" placeholder="Search..." />
              <span className="input-group-append">
                <button className="btn btn-outline-secondary border border-left-0" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link" href="" id="navbarUserMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-user"></i>
              </a>
              <div id="dropdown-menu-user" className="dropdown-menu dropdown-menu-right text-center" aria-labelledby="navbarUserMenu">
                {this.getUserMenu()}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-shopping-cart"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
