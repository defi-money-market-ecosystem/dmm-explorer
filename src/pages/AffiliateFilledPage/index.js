import React, { useEffect, useState } from 'react';
import LoanRecyclerView from '../../components/loans/LoanRecyclerView';
import { formatAmount } from '../../utils/NumberUtil';

function AffiliateFilledPage() {
  const [lockedDMG, setLockedDMG] = useState('');

  useEffect( () => {
    getDMGLocked();
  }, []);

  const getDMGLocked = () => {
    fetch('https://api.defimoneymarket.com/v1/asset-introducers/stats/total-dmg-locked')
      .then(response => response.json())
      .then(response => setLockedDMG(response['data']));
  }

  return (
    <React.Fragment>
      <div className="dmm-intro-wrap">
        <h4>Asset Introducer - Peru</h4>
        <h1>NFT Purchased</h1>
        <p>
          Information about the asset introducer Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nunc dignissim neque in aliquam consectetur. Nulla facilisis consequat fringilla. Proin non finibus est,
          eget semper est. Etiam lorem ligula, viverra vel magna vel, pellentesque bibendum nisi. In mollis arcu quis
          sem aliquet condimentum.
        </p>
        <div className="dmm-intro-desc">Assets that can be introduced - <span>Cars, Aircraft</span></div>
        <div className="dmm-intro-desc">Amount of DMG locked - <span>{formatAmount(lockedDMG)}</span></div>
      </div>

      <div className="dmm-explorer-statistics-wrap">

        <div className="dmm-explorer-statistics-unit">
          <div className="dmm-explorer-statistics-label">Total Value of Assets Introduced</div>
          <div className="dmm-explorer-statistics-header">
            $8,922,054
          </div>
        </div>
        <div className="dmm-explorer-statistics-unit">
          <div className="dmm-explorer-statistics-label">Allowed to be Drawn Down</div>
          <div className="dmm-explorer-statistics-header">
            $5,000,000
          </div>
        </div>
        <div className="dmm-explorer-statistics-unit">
          <div className="dmm-explorer-statistics-label">Value of All Active Assets</div>
          <div className="dmm-explorer-statistics-header">
            $4,000,000
          </div>
        </div>
        <div className="dmm-explorer-statistics-unit">
          <div className="dmm-explorer-statistics-label">Currently Drawn Down</div>
          <div className="dmm-explorer-statistics-header">
            $1,000,000
          </div>
        </div>

      </div>

      <LoanRecyclerView/>
    </React.Fragment>
  );
}

export default AffiliateFilledPage;
