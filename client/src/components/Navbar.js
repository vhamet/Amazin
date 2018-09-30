import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import '../style/navbar.css';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      selectedDepartmentLevel: 'category',
      selectedDepartmentText: 'All departments',
      selectedDepartmentValue: 'all',
      searchText: '',
      url: '/search',
    };
    this.selectDepartment = this.selectDepartment.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    const url = '/search/' + this.state.selectedDepartmentLevel + '/' + this.state.selectedDepartmentValue + '/' + encodeURIComponent(e.target.value);
    this.setState({ searchText: e.target.value, url });
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

  selectDepartment(level, text, value) {
    const url = '/search/' + level + '/' + value + '/' + encodeURIComponent(this.state.searchText);
    this.setState({ selectedDepartmentLevel: level, selectedDepartmentText: text, selectedDepartmentValue: value, url });
  }

  render() {return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="/" className="navbar-brand">Amazin</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar1">
          <div className="input-group">
            <div className="input-group-prepend">
              <button type="button" className="btn btn-outline-secondary border border-right-0 dropdown-toggle" data-toggle="dropdown">
                {this.state.selectedDepartmentText}
              </button>
              <div className="dropdown-menu dropdown-search">
                <span className="dropdown-item dropdown-category" onClick={() => this.selectDepartment('category', 'All departments', 'all')}>All departments</span>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item dropdown-category" onClick={() => this.selectDepartment('category', 'Gaming', 'gaming')}>Gaming</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'PS4', 'ps4')}>PS4</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'PS4 - Games', 'ps4games')}>Games</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'PS4 - Accessories', 'ps4accessories')}>Accessories</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Xbox One', 'xboxone')}>Xbox One</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Xbox One - Games', 'xboxonegames')}>Games</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Xbox One - Accessories', 'xboxoneaccessories')}>Accessories</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Nintendo Switch', 'switch')}>Nintendo Switch</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Nintendo Switch - Games', 'switchgames')}>Games</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Nintendo Switch - Accessories', 'switchaccessories')}>Accessories</span>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item dropdown-category" onClick={() => this.selectDepartment('category', 'Board & Card games', 'boardcardgames')}>Board & Card games</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Board games', 'boardgames')}>Board games</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Board games - Strategy', 'boardgamesstrategy')}>Strategy</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Board games - Classic', 'classic')}>Classic</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Party & Family games', 'boardgamespartyfamily')}>Party & Family</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Card games', 'cardgames')}>Card games</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Card games - Strategy', 'boardgamesstrategy')}>Strategy</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Card games - Party & Family', 'cardgamespartyfamily')}>Party & Family</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Card games - Trading cards', 'tradingcards')}>Trading cards</span>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item dropdown-category" onClick={() => this.selectDepartment('category', 'Sports', 'sports')}>Sports</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Football', 'football')}>Football</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Shorts', 'shorts')}>Shorts</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Footballs', 'footballs')}>Footballs</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Boots, Laces & Studs', 'bootslacesstuds')}>Boots, Laces & Studs</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Fitness', 'fitness')}>Fitness</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Medical', 'medical')}>Medical</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Clothing', 'clothing')}>Clothing</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Boxing', 'boxing')}>Boxing</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Gloves', 'gloves')}>Clothing</span>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item dropdown-category" onClick={() => this.selectDepartment('category', 'Clothing & Accessories', 'clothingaccessories')}>Clothing & Accessories</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Clothing', 'clothing')}>Clothing</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Fleeces', 'fleeces')}>Fleeces</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Socks', 'socks')}>Socks</span>
                <span className="dropdown-item dropdown-subcategory1" onClick={() => this.selectDepartment('subcategory1', 'Accessories', 'accessories')}>Accessories</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Keyrings', 'keyrings')}>Keyrings</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Wallets', 'wallets')}>Wallets</span>
                <span className="dropdown-item dropdown-subcategory2" onClick={() => this.selectDepartment('subcategory2', 'Accessories', 'accessories')}>Accessories</span>
              </div>
            </div>
            <input type="text" className="form-control border border-right-0" placeholder="Search..." value={this.state.searchText} onChange={this.onChange}/>
            <span className="input-group-append">
              {
                this.state.searchText ?
                (<Link className="btn btn-outline-secondary border border-left-0" to={this.state.url}>
                  <i className="fa fa-search"></i>
                </Link>)
                : (<button className="btn btn-outline-secondary border border-left-0"><i className="fa fa-search"></i></button>)

              }
            </span>
          </div>
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
              <a className="nav-link a-cart" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-shopping-cart cart-navbar">
                  <span className="cart-items badge badge-pill badge-primary">{this.props.cart.length > 0 ? this.props.cart.length : ''}</span>
                </i>
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
