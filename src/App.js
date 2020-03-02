import React from 'react';

import DmmToolbar from './components/toolbar/DmmToolbar.js';
import HeaderStats from './components/header/HeaderStats.js';

import styles from './App.module.scss';
import LoanRecyclerView from "./components/loans/LoanRecyclerView";
import {DmmFooter} from "./components/footer/DmmFooter";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

class App extends React.Component {

  render = () => {
    return (
      <div>
        <DmmToolbar/>
        <div className={styles.App}>
          <HeaderStats/>
          <LoanRecyclerView/>
        </div>
        <DmmFooter/>
      </div>
    );
  }

}

export default App;
