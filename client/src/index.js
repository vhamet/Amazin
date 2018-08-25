// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import './style/index.css';



ReactDOM.render(
  <BrowserRouter>
    <Page />
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
