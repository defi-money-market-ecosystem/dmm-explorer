import React from 'react';
import ReactDOM from 'react-dom';
import './layout/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DotEnv from 'dotenv';
import { BrowserRouter } from 'react-router-dom';

DotEnv.config();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
