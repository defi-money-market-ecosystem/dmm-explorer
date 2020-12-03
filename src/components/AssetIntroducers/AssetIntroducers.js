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
          const country_name = countries[country]["AFFILIATE"] ? countries[country]["AFFILIATE"] && countries[country]["AFFILIATE"][0]["country_name"] : countries[country]["PRINCIPAL"] && countries[country]["PRINCIPAL"][0]["country_name"];
          const total_affiliates = countries[country]["AFFILIATE"] && countries[country]["AFFILIATE"].length;
          const total_principals = countries[country]["PRINCIPAL"] && countries[country]["PRINCIPAL"].length;
          const available_affiliates = countries[country]["AFFILIATE"] && countries[country]["AFFILIATE"].filter(country => country["is_primary_market"]).length;
          const available_principals = countries[country]["PRINCIPAL"] && countries[country]["PRINCIPAL"].filter(country => country["is_primary_market"]).length;
          const total_available = (available_affiliates || 0) + (available_principals || 0);
          const total_purchased = ((total_affiliates || 0) + (total_principals || 0)) - total_available;
          const price_usd = countries[country]["AFFILIATE"] ? countries[country]["AFFILIATE"] && countries[country]["AFFILIATE"][0]["price_usd"] : countries[country]["PRINCIPAL"] && countries[country]["PRINCIPAL"][0]["price_usd"];
          const price_dmg = countries[country]["AFFILIATE"] ? countries[country]["AFFILIATE"] && countries[country]["AFFILIATE"][0]["price_dmg"] : countries[country]["PRINCIPAL"] && countries[country]["PRINCIPAL"][0]["price_dmg"];
          const affiliate_token_id = countries[country]["AFFILIATE"] && countries[country]["AFFILIATE"][0]["token_id"];
          const principal_token_id = countries[country]["PRINCIPAL"] && countries[country]["PRINCIPAL"][0]["token_id"];

          constructedCountryData.push({
            country: country_name,
            totalAffiliates: total_affiliates,
            totalPrincipals: total_principals,
            availableAffiliates: available_affiliates,
            availablePrincipals: available_principals,
            totalPurchased: total_purchased,
            totalAvailable: total_available,
            priceUSD: price_usd,
            priceDMG: price_dmg,
            affiliateTokenID: affiliate_token_id,
            principalTokenID: principal_token_id

          });
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
            height={'600px'}
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
            mapsApiKey="AIzaSyBIumXPkzCsPSRgXqMyOWEnmpo4sgkq5-k"
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