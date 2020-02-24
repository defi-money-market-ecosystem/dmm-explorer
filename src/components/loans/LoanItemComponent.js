import * as React from "react";
import Grid from "@material-ui/core/Grid";

import * as style from "./LoansLayout.module.scss";
import Tooltip from "@material-ui/core/Tooltip";

export class LoanItemComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  // openLienDialogue = () => {
  //   this.setState({
  //     open: true
  //   })
  // };
  //
  // closeLienDialogue = () => {
  //   this.setState({
  //     open: false
  //   })
  // };

  render = () => {
    const loan = this.props.loan;
    const activeClass = loan.loanStatus === 'ACTIVE' ? style.activeLoan : style.closedLoan;
    const loanValueString = loan.retailValue.toLocaleString("en-US", {style: "currency", currency: "USD"});
    const isLienAvailable = !!loan.digitalLienLink;

    const lienView = isLienAvailable ?
      <a href={loan.digitalLienLink} target={"_blank"}>View Lien</a>
      :
      <Tooltip title={"The lien is still being filed for this vehicle. It may take up to a couple weeks to become available."}>
        <span className={style.disabledButton}>View Lien</span>
      </Tooltip>;

    return (
      <div className={style.scrollableContainer}>
        {/* In the future, we can render the PDFs on the page. For now, just link to another tab. */}
        {/*<Dialog onClose={this.closeLienDialogue} aria-labeledby={"dialog-title"} open={this.state.open} maxWidth={"lg"}>*/}
        {/*  <DialogTitle id="dialog-title" onClose={this.closeLienDialogue}>*/}
        {/*    Lien for {loan.loanId}*/}
        {/*  </DialogTitle>*/}
        {/*  <DialogContent dividers>*/}
        {/*    <Image src={loan.digitalLienLink} alt={`Digital Lien ${loan.loanId}`}/>*/}
        {/*  </DialogContent>*/}
        {/*</Dialog>*/}
        <Grid container className={style.loanContainer}>
          <Grid item xs={6} lg={3} className={style.loanLeftSide}>
            <p className={style.loanLeftSideItem}>Loan ID:&nbsp;{loan.loanId}</p>
            <p className={style.loanLeftSideItem}>VIN Last 6:&nbsp;{loan.vinLastSix}</p>
            <p className={style.loanLeftSideItem}>Loan Status:&nbsp;<span
              className={activeClass}>{loan.loanStatus}</span>
            </p>
          </Grid>
          <Grid item xs={6} lg={9} className={style.loanRightSide}>
            <p className={style.loanRightSideItem}>Retail Value:&nbsp;{loanValueString}</p>
            <p className={style.loanRightSideItem}>{loan.vehicleInfo}</p>
            {lienView}
          </Grid>
          <Grid item xs={12}>
            <div className={style.divider}/>
          </Grid>
        </Grid>
      </div>
    );
  };

}