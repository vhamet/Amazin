import React, { Component } from 'react';

class NotFound extends Component {

  render() {
    return (
      <div className="notfound">
        <h2>404 NOT FOUND</h2>
        <label>The requested URL <b>{this.props.path}</b> was not found on this server. </label>
      </div>
    );
  }
}

export default NotFound;
