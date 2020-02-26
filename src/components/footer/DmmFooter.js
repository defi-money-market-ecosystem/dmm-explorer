import * as React from "react";
import {Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";

import * as style from "./DmmFooter.module.scss";

export class DmmFooter extends React.Component {

  render = () => {
    return (
      <AppBar position="static" className={style.footerContainer}>
        <Toolbar className={style.footer}/>
      </AppBar>
    );
  };

}