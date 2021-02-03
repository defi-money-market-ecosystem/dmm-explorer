import React from 'react';

import DmmToolbar from './components/toolbar/DmmToolbar.js';
import HeaderStats from './components/header/HeaderStats.js';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';
// import styles from './App.module.scss';
import './style.scss';
import LoanRecyclerView from "./components/loans/LoanRecyclerView";
import {DmmFooter} from "./components/footer/DmmFooter";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import MainPage from './pages/MainPage';
import AffiliateEmptyPage from './pages/AffiliateEmptyPage';
import AffiliateFilledPage from './pages/AffiliateFilledPage';
import BecomeAnAffiliatePage from './pages/BecomeAnAffiliatePage';
import AssetIntroducers from './components/AssetIntroducers/AssetIntroducers';
import BurnPage from './pages/BurnPage';

library.add(fab);

class App extends React.Component {

  render = () => {
    return (
      <div className="app-wrap">
        <DmmToolbar/>
        <div className="content-wrap">
          <Switch>
            <Route exact strict path="/" component={() => <div >
              <NavigationTabs/>
              <MainPage/>
            </div>}/>
            <Route exact strict path="/asset-introducers" component={() => <div >
              <NavigationTabs/>
              <AssetIntroducers/>
            </div>}/>
            {/*<Route exact path='/' component={MainPage}/>*/}
            <Route exact path='/empty_page' component={AffiliateEmptyPage}/>
            <Route path='/filled_page' component={AffiliateFilledPage}/>
            <Route path='/affiliate_page' component={BecomeAnAffiliatePage}/>
            <Route path='/burn_page' component={BurnPage}/>
            {/*<Route exact strict path="/asset-introducers" component={() => <AssetIntroducers/>}/>*/}
            <Redirect to="/"/>
          </Switch>
        </div>
        <DmmFooter/>
      </div>
    );
  }

}

export default App;
