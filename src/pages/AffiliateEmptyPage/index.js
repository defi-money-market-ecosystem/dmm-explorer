import React, { useEffect, useState } from 'react';
import { formatAmount } from '../../utils/NumberUtil';
import styles from '../../components/AssetIntroducers/AssetIntroducers.module.scss';

function AffiliateEmptyPage() {
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
    <div className="dmm-intro-wrap">
      <h4>Asset Introducer - Peru</h4>
      <h1>NFT Purchased</h1>
      <p>
        A governance vote is needed for this introducer to begin to introduce assets. The vote will decide how
        much can be introduced & asset types.
      </p>
      <div className="dmm-intro-desc">Amount of DMG locked - <span>{formatAmount(lockedDMG)} DMG</span>
      </div>
    </div>
  );
}

export default AffiliateEmptyPage;
