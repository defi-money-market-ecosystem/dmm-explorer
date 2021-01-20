import * as React from "react";

import * as LoansService from "../../services/LoansService";

import styles from "./HeaderStats.module.scss";
import {CircularProgress} from "@material-ui/core";

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
        <div className="dmm-explorer-statistics-wrap">
          {this.renderCollateralizaton(false)}
          <div className="dmm-explorer-statistics-unit">
            <div className="dmm-explorer-statistics-label">Value of All Active Assets</div>
            <div className="dmm-explorer-statistics-header">
              {activeLoansValueString}
              <div className="dmm-explorer-statistics-header-modal">
                The aggregate sum of all the assets whose status is ACTIVE.
              </div>
            </div>
          </div>
          <div className="dmm-explorer-statistics-unit">
            <div className="dmm-explorer-statistics-label">Current Interest Rate:</div>
            <div className="dmm-explorer-statistics-header">
              6.25% <span>APY</span>
              <div className="dmm-explorer-statistics-header-modal">
                The amount of interest that can be earned by lenders by minting and holding mAssets.
              </div>
            </div>
          </div>
            {this.renderCollateralizaton(true)}
        </div>
    );
  };

  renderCollateralizaton = (isActiveCollateralization) => {
    const tooltipText = isActiveCollateralization ?
      'The amount of collateral backing the system plus the value of all underlying tokens, divided by the value of all the circulating mAssets, including interest.' :
      'The amount of collateral backing the system plus the value of all underlying tokens, divided by the value of the total supply of all the mAssets, including 1-year\'s interest.';

    const collateralization = (this.state.isLoading || !this.state.collateralization)
      ? undefined :
      isActiveCollateralization ?
        this.state.collateralization.activeCollateralization :
        this.state.collateralization.totalCollateralization;

    return this.state.isLoading ?
      (<CircularProgress style={{justifySelf: "center"}}/>) :
      collateralization ?
        (
          <div className="dmm-explorer-statistics-unit">
            <div className="dmm-explorer-statistics-label">{isActiveCollateralization ? "Active" : "1-Year"} Collateralization:</div>
            <div className="dmm-explorer-statistics-header">
              {this.standardizeCollateralization(collateralization)}
              <div className="dmm-explorer-statistics-header-modal">
                { tooltipText }
              </div>
            </div>
          </div>) :
        (<><h3>{isActiveCollateralization ? "Active" : "Total"} Collateralization:</h3><h3>Error!</h3></>);
  };

  standardizeCollateralization = (collateralizationDecimal) => {
    return Number.parseFloat(Number.parseFloat(collateralizationDecimal).toFixed(2)).toLocaleString("en", {style: "percent"});
  };

}

export default HeaderStats;