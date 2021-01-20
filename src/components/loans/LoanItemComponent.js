import * as React from "react";
import CarIcon from '../../../html/img/ico/car.svg';

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
      <a href={loan.digitalLienLink} className="veiw-link" target={"_blank"} rel="noopener noreferrer">VIEW LIEN</a>
      :
      <Tooltip title={"The lien is still being filed for this vehicle. It may take up to a couple weeks to become available."}>
        <span className={style.disabledButton}>View Lien</span>
      </Tooltip>;

    return (
        <div className="dmm-explorer-statistics-table-unit">
          <div className="dmm-explorer-statistics-table-ico">
            <img src={CarIcon} alt=""/>
          </div>
          <div className="dmm-explorer-statistics-table-desc">
            <div className="company">Quri Capital <div className="status"></div></div>
            <div className="model">
              <div className="model-text">{loan.vehicleInfo}
              </div>

              <div className="dmm-explorer-statistics-header-modal">
                {loan.vehicleInfo}
              </div>
            </div>
            <div className="price">{loanValueString}</div>
          </div>
          <div className="dmm-explorer-statistics-table-actions">
            {lienView}
            <div className="unit-id">ID: {loan.loanId}</div>
          </div>
        </div>
    );
  };

}