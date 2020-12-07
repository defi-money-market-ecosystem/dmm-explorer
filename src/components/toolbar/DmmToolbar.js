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
      <div className={styles.navbar}>
        <div className={styles.content}>
          <a href={'https://explorer.defimoneymarket.com'}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>
                <img src={DMMLogo}/>
              </div>
              <div className={styles.logoText}>
                DMM
              </div>
            </div>
          </a>
          <div className={styles.buttonsWrapper}>
            <div className={styles.connectWalletButton}>
              <a href={'https://app.defimoneymarket.com'}>
              <Button className={styles.loadWallet}>
                APP
              </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

}

export default DmmToolbar;