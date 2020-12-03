import React from 'react';

import DmmToolbar from './components/toolbar/DmmToolbar.js';
import HeaderStats from './components/header/HeaderStats.js';

import styles from './App.module.scss';
import LoanRecyclerView from "./components/loans/LoanRecyclerView";
import {DmmFooter} from "./components/footer/DmmFooter";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AssetIntroducers from './components/AssetIntroducers/AssetIntroducers';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

class App extends React.Component {

  render = () => {
    return (
      <div>
        <BrowserRouter>
          <DmmToolbar/>
          <Switch>
            <Route exact strict path="/" component={() => <div className={styles.App}>
              <HeaderStats/>
              <LoanRecyclerView/>
            </div>}/>
            <Route exact strict path="/asset-introducers" component={() => <AssetIntroducers/>}/>
            <Redirect to="/"/>
          </Switch>
          <DmmFooter/>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
