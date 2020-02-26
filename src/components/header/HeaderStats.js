import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import * as LoansService from "../../services/LoansService";

import styles from "./HeaderStats.module.scss";
import {CircularProgress} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

class HeaderStats extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collateralization: null,
      isLoading: true,
    };

    this.refreshData();

    this.subscriptionId = setInterval(() => {
      this.refreshData()
    }, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.subscriptionId);
  }

  refreshData = () => {
    LoansService.getTotalCollateralization()
      .then(collateralization => {
        this.setState({
          collateralization,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error("Could not fetch collateralization due to error: ", error);
        this.setState({
          isLoading: false,
        })
      });

    LoansService.getLoansWithMetadata()
      .then(loansWithMetadata => {
        const activeLoans = loansWithMetadata.loans.filter(loan => loan.loanStatus === 'ACTIVE');
        const sumActiveLoans = activeLoans.reduce((sum, loan) => {
          return sum + loan.retailValue;
        }, 0);
        this.setState({
          sumActiveLoans: sumActiveLoans,
          loanMetadata: loansWithMetadata.lastUpdatedTimestamp,
        });
      })
      .catch(error => {
        console.error("Could not fetch loan metadata due to error: ", error);
      });
  };

  render = () => {
    const activeLoansValueString = (this.state.sumActiveLoans || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    return (
      <Grid container className={styles.statsGrid}>
        <Grid item xs={12} lg={8} className={styles.statsHeader}>
          <Paper elevation={2} className={styles.statsPaper}>
            {this.renderCollateralizaton(false)}
          </Paper>
          <Paper elevation={2} className={styles.statsPaper}>
            <Tooltip disableFocusListener
                     title={"The aggregate sum of all the assets"}>
              <div>
                <h3>Value of All Active Assets:</h3>
                <h3>{activeLoansValueString}</h3>
              </div>
            </Tooltip>
          </Paper>
          <Paper elevation={2} className={styles.statsPaper}>
            <Tooltip disableFocusListener
                     title={"The amount of interest that can be earned by lenders by minting and holding mAssets."}>
              <div>
                <h3>Current Interest Rate:</h3>
                <h3>6.25% APY</h3>
              </div>
            </Tooltip>
          </Paper>
          <Paper elevation={2} className={styles.statsPaper}>
            {this.renderCollateralizaton(true)}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8} className={styles.lastUpdatedHeader}>
          <h6>Last Updated: <b>{this.state.loanMetadata}</b></h6>
        </Grid>
      </Grid>
    );
  };

  renderCollateralizaton = (isActiveCollateralization) => {
    const tooltipText = isActiveCollateralization ?
      'The amount of collateral backing the system divided by the value of all the circulating mTokens, including interest.' :
      'The amount of collateral backing the system divided by the value of the total supply of all the mTokens, including interest.';

    const collateralization = (this.state.isLoading || !this.state.collateralization)
      ? undefined :
      isActiveCollateralization ?
        this.state.collateralization.activeCollateralization :
        this.state.collateralization.totalCollateralization;

    return this.state.isLoading ?
      (<CircularProgress style={{justifySelf: "center"}}/>) :
      collateralization ?
        (<Tooltip disableFocusListener title={tooltipText}>
          <div>
            <h3
              className={styles.statsText}>{isActiveCollateralization ? "Active" : "Total"} Collateralization:</h3>
            <h3>{this.standardizeCollateralization(collateralization)}</h3>
          </div>
        </Tooltip>) :
        (<><h3>{isActiveCollateralization ? "Active" : "Total"} Collateralization:</h3><h3>Error!</h3></>);
  };

  standardizeCollateralization = (collateralizationDecimal) => {
    return Number.parseFloat(Number.parseFloat(collateralizationDecimal).toFixed(2)).toLocaleString("en", {style: "percent"});
  };

}

export default HeaderStats