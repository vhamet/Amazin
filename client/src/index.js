// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Page from './components/Page';
import Confirmation from './components/Confirmation';
import NotFound from './components/NotFound';
import registerServiceWorker from './utils/registerServiceWorker';

var path = window.location.pathname;
var parts = path.substring(1).split('/');

if (path === '/')
  ReactDOM.render(<Page />, document.getElementById('root'));
else if (parts.length === 2 && parts[0] === 'confirmation') {
  var token = parts[1];
  ReactDOM.render(<Confirmation token={token} />, document.getElementById('root'));
}
else {
  ReactDOM.render(<NotFound path={path} />, document.getElementById('root'));
}

registerServiceWorker();
