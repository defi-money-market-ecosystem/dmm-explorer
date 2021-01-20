import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PDF from '../../assets/DMM-Disclamier.pdf';
import WhiteLogo from '../../../html/img/logo-white.svg';

import styles from "./DmmFooter.module.scss";

export class DmmFooter extends React.Component {

  render = () => {
    return (
      <footer>
        <div className="footer-content">
          <div className="footer-link-wrap">
            <a className="bold" href={'https://app.defimoneymarket.com'}>Get DMM</a>
            <a href={'https://github.com/defi-money-market-ecosystem/protocol/wiki'} target={'_blank'}>Docs</a>
            <a href={PDF} target={'_blank'}>Legal</a>
            <a href={'https://etherscan.io/address/0x4cb120dd1d33c9a3de8bc15620c7cd43418d77e2'} target={'_blank'}>Smart Contract</a>
            <a href={'https://docs.chain.link/docs/defi-money-market-chainlink-ethereum-mainnet'} target={'_blank'}>Chainlink Integration</a>
          </div>
          <div className="footer-copyright">

            <img src={WhiteLogo} alt=""/>

            <div className="copyright">© DeFi Money Market Foundation 2020</div>

          </div>
          <div className="footer-social">

            <div className="company-name">DMM</div>
            <div className="social-wrap">
              <div className="social-label">Join the conversation:</div>
              <div className="social-links">
                <a href={'https://twitter.com/DmmDAO'} target={'_blank'}><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                <a href={'https://www.reddit.com/r/DMMDAO/'} target={'_blank'}><FontAwesomeIcon icon={['fab', 'reddit']} /></a>
                <a href={'https://medium.com/dmm-dao'} target={'_blank'}><FontAwesomeIcon icon={['fab', 'medium']} /></a>
                <a href={'https://discord.gg/9dM8yaA'} target={'_blank'}><FontAwesomeIcon icon={['fab', 'discord']} /></a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    );
  };

}