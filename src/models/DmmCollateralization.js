import * as Web3 from 'web3';

export class DmmCollateralization {

  constructor(activeCollateralization, totalCollateralization) {
    this.activeCollateralization = Web3.utils.fromWei(activeCollateralization);
    this.totalCollateralization = Web3.utils.fromWei(totalCollateralization);
  }

}