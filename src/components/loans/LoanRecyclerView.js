import * as React from "react";

import Grid from "@material-ui/core/Grid";

import {RecyclerListView, DataProvider, LayoutProvider} from "recyclerlistview/web";
import style from "./LoansLayout.module.scss";
import * as LoanService from "../../services/LoansService";
import {LoanItemComponent} from "./LoanItemComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from "@material-ui/core/Paper";

import * as LoanItemStyle from "./LoansLayout.module.scss";
import { getActivatedAssetIntroducers, getAssetIntroducerById } from '../../services/LoansService';

const assets_types = {
  AUTO: 'Auto',
  TRUCK: 'Truck',
  PLANE: 'Plane',
  BOAT: 'Boat',
  REAL_ESTATE: 'Real estate',
  RECREATIONAL_VEHICLE: 'Recreational vehicle',
}

class LoanRecyclerView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      assetIntroducers: [],
    };
    this.widthTracker = React.createRef();
    let listItemHeight = 150;
    if (window.matchMedia("(max-width: 700px)").matches) {
      listItemHeight = 90;
    }
    this.layoutProvider = new LayoutProvider(
      () => 0,
      (type, dim) => {
        dim.width = this.widthTracker.current.offsetWidth;
        dim.height = listItemHeight;
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

  refreshData = async () => {
    let { loans, lastUpdatedTimestamp } = await LoanService.getLoansWithMetadata();
    loans.sort((x1, x2) => {
      if(!x1.digitalLienLink) {
        return 999999999;
      } else if (!x2.digitalLienLink) {
        return -999999999;
      } else {
        return x2.loanId - x1.loanId;
      }
    });
    const activatedAssetIntroducers = Array.from(new Set(loans.map(item => item.assetIntroducerId)));
    let assetIntroducers = [];
    const promises = activatedAssetIntroducers.map(item => getAssetIntroducerById(item));
    assetIntroducers = await Promise.all(promises);
    // loans = loans.map((item) => {});
    console.log('assetIntroducers',assetIntroducers);
    console.log('loans', this.state.assetType ? loans.filter(item => item.vehicleType===this.state.assetType) : loans);
    const filteredLoans = this.state.assetType ? loans.filter(item => item.vehicleType===this.state.assetType) : loans;
    this.setState({
      isLoading: false,
      assetIntroducers,
      lastUpdatedTimestamp,
      dataProvider: this.state.dataProvider.cloneWithRows(filteredLoans)
    })
  };

  renderRow = (type, data) => {
    return (
      <LoanItemComponent loan={data}/>
    );
  };

  handleChangeSelect = (event) => {
    this.setState({
      assetType: event.currentTarget.value,
    })
    this.refreshData();
  }


  render = () => {
    return (
      <div className="dmm-explorer-statistics-table-wrap">
        <div className="dmm-explorer-statistics-table-filter">
          <div className="filter">
            <div className="filter-unit">
              Filter by asset introducer:
              <select required name="" id="sel1">
                <option value="" disabled selected hidden>None</option>
                {
                  this.state.assetIntroducers.map(item => <option value={item.name}>{item.name}</option>)
                }
              </select>
            </div>

            <div className="filter-unit">
              Filter by asset type:
              <select required name="" id="sel2" onChange={this.handleChangeSelect}>
                <option value="" disabled selected hidden>None</option>
                {Object.entries(assets_types).map(item => <option value={item[0]}>{item[1]}</option>)}
              </select>
            </div>
          </div>
          <div className="updates">{ this.state.lastUpdatedTimestamp }</div>
        </div>

        <div className="dmm-explorer-statistics-table" ref={this.widthTracker}>
          <RecyclerListView
            className={style.recycler}
            dataProvider={this.state.dataProvider}
            layoutProvider={this.layoutProvider}
            rowRenderer={this.renderRow}
          />
        </div>
      </div>
    );
  }

}

export default LoanRecyclerView;