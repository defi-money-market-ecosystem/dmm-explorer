import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import styles from '../../components/AssetIntroducers/AssetIntroducers.module.scss';

function BecomeAnAffiliatePage() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [lockedDMG, setLockedDMG] = useState(null);
  const [mapData, setMapData] = useState([['Country', 'Purchased NFTs', 'Available NFTs']]);
  const getNFTData = () => {
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

        setCountryData(constructedCountryData);
        setMapData(mapData);
      })
  };

  const getDMGLocked = () => {
    fetch('https://api.defimoneymarket.com/v1/asset-introducers/stats/total-dmg-locked')
      .then(response => response.json())
      .then(response => setLockedDMG(response["data"] ))
  };

  const formatAmount = (amount) => {
    return (amount.substring(0, amount.length - 15)/1000).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect( () => {
    getNFTData();
    getDMGLocked();
  }, []);
  return (
    <React.Fragment>
      <div className="dmm-header">
        <h2>Asset Introducers by Country</h2>
        <p>
          Select a country to see existing asset introducers or openings to become an asset introducer
        </p>
      </div>

      <div className="dmm-map">
        <Chart
          chartType="GeoChart"
          width={'100%'}
          height={'auto'}
          fill={'none'}
          data={mapData}
          mapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          rootProps={{ 'data-testid': '1' }}
          options={{
            colorAxis: { colors: ['#6d9ed2', '#327CCB'] },
            backgroundColor: '#81d4fa',
            defaultColor: '#f5f5f5',
          }}
        />
      </div>

      <div className="dmm-total">
        <div className="dmm-total-desc">Total amount of DMG locked in asset introducer NFTs:</div>
        <div className="dmm-total-count">{formatAmount(lockedDMG)} DMG</div>
      </div>
    </React.Fragment>
  );
}

export default BecomeAnAffiliatePage;
