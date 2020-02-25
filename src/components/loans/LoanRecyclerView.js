import * as React from "react";

import Grid from "@material-ui/core/Grid";

import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview/web";
import style from "./LoansLayout.module.scss";
import * as LoanService from "../../services/LoansService";
import {LoanItemComponent} from "./LoanItemComponent";
import Paper from "@material-ui/core/Paper";

import * as LoanItemStyle from "./LoansLayout.module.scss";

class LoanRecyclerView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.widthTracker = React.createRef();

    this.layoutProvider = new LayoutProvider(
      () => 0,
      (type, dim) => {
        dim.width = this.widthTracker.current.offsetWidth;
        dim.height = LoanItemStyle.loanItemHeight;
      }
    );

    const dataProvider = new DataProvider((r1, r2) => r1.loanId !== r2.loanId);
    dataProvider.cloneWithRows([]);
    this.state.dataProvider = dataProvider;

    this.state.isLoading = true;
    this.subscriptionId = setInterval(() => {
      this.refreshData();
    }, 60000);
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.subscriptionId);
  }

  refreshData = () => {
    LoanService
      .getLoans()
      .then(loans => {
        loans.sort((x1, x2) => {
          if(!x1.digitalLienLink) {
            return 999999999;
          } else if (!x2.digitalLienLink) {
            return -999999999;
          } else {
            return x2.loanId - x1.loanId;
          }
        });

        this.setState({
          isLoading: false,
          dataProvider: this.state.dataProvider.cloneWithRows(loans)
        })
      })
  };

  renderRow = (type, data) => {
    return (
      <LoanItemComponent loan={data}/>
    );
  };

  render = () => {
    return (
      <Grid container className={style.loanGrid}>
        <Grid item xs={12} lg={8} className={style.layoutWrapper}>
          <Paper variant={"outlined"} className={style.paperWrapper} ref={this.widthTracker}>
            <RecyclerListView
              className={style.recycler}
              dataProvider={this.state.dataProvider}
              layoutProvider={this.layoutProvider}
              rowRenderer={this.renderRow}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

export default LoanRecyclerView;