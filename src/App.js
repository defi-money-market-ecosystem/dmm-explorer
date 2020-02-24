import React from 'react';

import DmmToolbar from './components/toolbar/DmmToolbar.js';
import CollateralizationHeader from './components/header/CollateralizationHeader.js';

import styles from './App.module.scss';
import LoanRecyclerView from "./components/loans/LoanRecyclerView";
import {DmmFooter} from "./components/footer/DmmFooter";

class App extends React.Component {

  render = () => {
    return (
      <div>
        <DmmToolbar/>
        <div className={styles.App}>
          <CollateralizationHeader/>
          <LoanRecyclerView/>
        </div>
        <DmmFooter/>
      </div>
    );
  }

}

export default App;
