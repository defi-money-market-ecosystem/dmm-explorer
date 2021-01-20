import {Button, Toolbar} from "@material-ui/core";
import React from "react";

import DMMLogo from '../../assets/dmm-logo.svg';

import styles from './DmmToolbar.module.scss';

class DmmToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <nav>
        <a href={'https://explorer.defimoneymarket.com'}>
        <div className="nav-logo">
          <img src={DMMLogo}/>
            <div className="logo-text">DMM</div>
        </div>
        </a>
        <div className="nav-actions">
          <a href={'https://app.defimoneymarket.com'}>
            <Button className={styles.loadWallet}>
              APP
            </Button>
          </a>
        </div>
      </nav>
    );
  };

}

export default DmmToolbar;