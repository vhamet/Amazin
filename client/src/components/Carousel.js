import React, { Component } from 'react';

import '../style/carousel.css';
import christmas from '../images/christmas.jpg';
import halloween from '../images/halloween.jpg';
import smashbross from '../images/smashbross.jpeg';

class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  render() {
    if(true)
    return(<div>caroussel</div>);
    return (
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators">
          <li data-target="#carousel" data-slide-to="0" className="active"></li>
          <li data-target="#carousel" data-slide-to="1"></li>
          <li data-target="#carousel" data-slide-to="2"></li>
        </ul>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={christmas} alt="Christmas"/>
            <div className="carousel-caption">
              <h3>Christmas</h3>
              <p>Do not miss our Christmas specials !</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={halloween} alt="Halloween"/>
            <div className="carousel-caption">
              <h3>Halloween</h3>
              <p>Get -10% on your command with the code HALL10</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={smashbross} alt="Christmas"/>
            <div className="carousel-caption">
              <h3>Super Smash Bros. Ultimate</h3>
              <p>Pre-order now</p>
            </div>
          </div>
        </div>

        <a className="carousel-control-prev" href="#carousel" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#carousel" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
    );
  }
}

export default Carousel;
