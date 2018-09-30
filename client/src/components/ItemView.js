import React, { Component } from 'react';

class ItemView extends Component {
  constructor() {
    super();
    this.state = {
      item: {}
    };
  }

  componentDidMount() {
    fetch('/items/get/' + this.props.match.params.id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }})
    .then(res => res.json()).then((res) => {
      console.log(JSON.stringify(res.item));
        this.setState({ item: res.item });
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default ItemView;
