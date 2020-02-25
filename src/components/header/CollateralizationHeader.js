import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import * as LoansService from "../../services/LoansService";

import styles from "./CollateralizationHeader.module.scss";
import {CircularProgress} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

class CollateralizationHeader extends React.Component {

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
      <Grid container className={styles.collateralizationGrid}>
        <Grid item xs={12} lg={8} className={styles.collateralizationHeader}>
          <Paper elevation={2} className={styles.collateralizationPaper}>
            {this.renderCollateralizaton(false)}
          </Paper>
          <Paper elevation={2} className={styles.collateralizationPaper}>
            <Tooltip disableFocusListener
                     title={"The sum of the values of all the active loans"}>
              <div>
                <h3>Value of All Active Loans:</h3>
                <h3>{activeLoansValueString}</h3>
              </div>
            </Tooltip>
          </Paper>
          <Paper elevation={2} className={styles.collateralizationPaper}>
            <Tooltip disableFocusListener
                     title={"The (local) time at which these loans were last updated. These loans don't change often, so they can go up to roughly 2 weeks without being updated."}>
              <div>
                <h3>Last Updated:</h3>
                <h3>{this.state.loanMetadata}</h3>
              </div>
            </Tooltip>
          </Paper>
          <Paper elevation={2} className={styles.collateralizationPaper}>
            {this.renderCollateralizaton(true)}
          </Paper>
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
              className={styles.collateralizationText}>{isActiveCollateralization ? "Active" : "Total"} Collateralization:</h3>
            <h3>{this.standardizeCollateralization(collateralization)}</h3>
          </div>
        </Tooltip>) :
        (<><h3>{isActiveCollateralization ? "Active" : "Total"} Collateralization:</h3><h3>Error!</h3></>);
  };

  standardizeCollateralization = (collateralizationDecimal) => {
    return Number.parseFloat(Number.parseFloat(collateralizationDecimal).toFixed(2)).toLocaleString("en", {style: "percent"});
  };

}

export default CollateralizationHeader