import React, { Component } from 'react';
import ItemBox from './ItemBox';
import Breadcrumbs from './Breadcrumbs';
import { chunk } from '../utils';

import '../style/search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      text: ''
    };
  }

  setData(params) {
    const { level, value, text } = params;
    this.setState({ text });
    this.getItems(level, value, text);
  }

  componentDidMount() {
    this.setData(this.props.match.params);
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps.match.params);
  }

  getItems(categoryLevel, categoryValue, searchText) {
    fetch('/items/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryLevel, categoryValue, searchText })})
    .then(res => res.json()).then((res) => {
      if (res.success)
        this.setState({ items: res.items });
    });
  }

  rows() {
    const rows = [];
    const handleAddToCart = this.props.handleAddToCart;
    const chunks = chunk(this.state.items, 6);
    chunks.forEach(function(chunk, key) {
      const columns = [];
      chunk.forEach(function(item, index) {
        columns.push(<div key={item._id || index} className="col-sm-2"><ItemBox item={item} handleAddToCart={handleAddToCart}/></div>);
      });
      rows.push(<div key={key} className="row">{columns}</div>);
    });

    return rows;
  }

  render() {
    const breadcrumbsActive = 'Search results for "' + this.state.text + '"';
    let header, rows;
    if (this.state.items.length) {
      header = (<div>
        <div className="row">
          <div className="col text-center header-search">
            <label>Your search results for :</label>
            <h4 className="search-text">{'"' + this.state.text + '"'}</h4>
          </div>
        </div>
        <div className="jumbotron jumbotron-filters">Filters</div>
        <div className="col text-center number-found">{this.state.items.length} items found</div>
      </div>);
      rows = (
        <div className="container">
          {this.rows()}
        </div>
      );
    }
    else {
      header = (
        <div className="row">
          <h4>No result found for {'"' + this.state.text + '"'}</h4>
        </div>
      );
    }

    return (
      <div>
        <Breadcrumbs active={breadcrumbsActive} />
        {header}
        {rows}
      </div>
    );
  }
}

export default Search;
