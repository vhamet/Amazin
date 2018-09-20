import React, { Component } from 'react';
import Carousel from './Carousel';
import HorizontalScrolling from './HorizontalScrolling';

import '../style/home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      gamingItems: [],
      boardcardgamesItems: [],
      sportsItems: [],
      clothingaccessoriesItems: [],
    };
  }

  componentDidMount() {
    this.getRandomItems('gaming', 'gamingItems');
    this.getRandomItems('boardcardgames', 'boardcardgamesItems');
    this.getRandomItems('sports', 'sportsItems');
    this.getRandomItems('clothingaccessories', 'clothingaccessoriesItems');
  }

  getRandomItems(category, container) {
    fetch('/items/randoms/' + category, {method: 'GET'})
    .then(res => res.json()).then((res) => {
      this.setState({ [container]: res.items });
    });
  }

  render() {
    return (
      <div className="container-fluid home-container">
        <Carousel />
        {(this.props.signedIn && <h1>LOGGED</h1>) || <h1>NOT LOGGED</h1> }
        <HorizontalScrolling title="Gaming" items={this.state.gamingItems} handleAddToCart={this.props.handleAddToCart}/>
        <HorizontalScrolling title="Board & card games" items={this.state.boardcardgamesItems}/>
        <HorizontalScrolling title="Sports" items={this.state.sportsItems}/>
        <HorizontalScrolling title="Clothing & accessories" items={this.state.clothingaccessoriesItems}/>
      </div>
    );
  }
}

export default Home;
