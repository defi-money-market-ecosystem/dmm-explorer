import {Button, Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React from "react";

import styles from './DmmToolbar.module.scss';

class DmmToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <span className={styles.logoButton}>DMM Explorer</span>
          <Button className={styles.appButton} href={"https://app.defimoneymarket.com"}>App</Button>
        </Toolbar>
      </AppBar>
    );
  };

}

export default DmmToolbar;