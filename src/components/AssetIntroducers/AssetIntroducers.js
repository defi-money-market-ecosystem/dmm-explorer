import * as React from "react";
import styles from './AssetIntroducers.module.scss';
import Chart from "react-google-charts";

class AssetIntroducers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: null,
      countryData: null,
      mapData: [['Country', 'Purchased NFTs', 'Available NFTs']],
      lockedDMG: null
    };
  }

  componentDidMount() {
    this.getNFTData();
    this.getDMGLocked();
  }

  getNFTData() {
    fetch(`https://api.defimoneymarket.com/v1/asset-introducers/all`)
      .then(response => response.json())
      .then(response => response["data"])
      .then(countries => {
        let constructedCountryData = [];

        for (let country in countries) {

          const country_name = countries[country]['country_name'];
          const available_affiliates = countries[country]['affiliates'].filter(affiliate => !affiliate['is_on_secondary_market']).length;
          const available_principals = countries[country]['principals'].filter(affiliate => !affiliate['is_on_secondary_market']).length;
          const total_available = (available_affiliates || 0) + (available_principals || 0);
          const purchased_affiliates = countries[country]['affiliates'].filter(affiliate => affiliate['is_on_secondary_market']).length;
          const purchased_principals = countries[country]['principals'].filter(affiliate => affiliate['is_on_secondary_market']).length;
          const total_purchased = (purchased_affiliates || 0) + (purchased_principals || 0);

          constructedCountryData.push({
            country: country_name,
            availableAffiliates: available_affiliates,
            availablePrincipals: available_principals,
            totalAvailable: total_available,
            purchasedAffiliates: purchased_affiliates,
            purchasedPrincipals: purchased_principals,
            totalPurchased: total_purchased,
          })
        }

        let mapData = [['Country', 'Purchased NFTs', 'Available NFTs']];

        if (constructedCountryData) {
          for (let country in constructedCountryData) {
            mapData.push([constructedCountryData[country].country, constructedCountryData[country].totalPurchased, constructedCountryData[country].totalAvailable]);
          }
        }

        this.setState({ countryData: constructedCountryData, mapData: mapData });
      })
  };

  getDMGLocked() {
    fetch('https://api.defimoneymarket.com/v1/asset-introducers/stats/total-dmg-locked')
      .then(response => response.json())
      .then(response => this.setState({ lockedDMG: response["data"] }))
  };

  formatAmount(amount) {
    return (amount.substring(0, amount.length - 15)/1000).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const h = 300;

    return (
      <div className={styles.assetIntroducersWrapper}>
        <div className={styles.pageTitleWrapper}>
          <div className={styles.pageTitle}>
            Asset Introducers by Country
          </div>
          <div className={styles.pageSubtitle}>
            Select a country to see existing asset introducers or openings to become an asset introducer
          </div>
        </div>
        <div className={styles.mapWrapper}>
          <Chart
            ref={elem => this.chart = elem}
            width={'100%'}
            height={h+'px'}
            fill={'none'}
            chartType="GeoChart"
            data={this.state.mapData}
            options={{
              colorAxis: { colors: ['#6d9ed2', '#327CCB'] },
              legend: 'none',
              enableRegionInteractivity: true
            }}
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            mapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        {this.state.lockedDMG &&
          <div className={styles.totalWrapper}>
            <div className={styles.totalTitle}>
              Total amount of DMG locked in asset introducer NFTs:
            </div>
            <div className={styles.totalAmount}>
              {this.formatAmount(this.state.lockedDMG)} <span className={styles.inlineDMG}>DMG</span>
            </div>
          </div>
          }
      </div>
    )
  }
}


export default AssetIntroducers;