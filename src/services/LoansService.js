import {baseUrl} from "./index";
import {Loan} from "../models/Loan";
import {DmmCollateralization} from "../models/DmmCollateralization";
import * as moment from "moment";

export const getLoans = () => {
  return fetch(`${baseUrl}/v1/loans`)
    .then(response => response.json())
    .then(response => response["data"]["loans"])
    .then(loans => Loan.fromArray(loans));
};

export const getLoansWithMetadata = () => {
  return fetch(`${baseUrl}/v1/loans`)
    .then(response => response.json())
    .then(response => response["data"])
    // .then(lastUpdatedMillis => moment(lastUpdatedMillis).format('YYYY-MM-DD HH:mm'));
    .then(data => {
      return {
        loans: Loan.fromArray(data["loans"]),
        lastUpdatedTimestamp: moment(data["last_updated_millis"]).format('LLL')
      }
    });
};

export const getActivatedAssetIntroducers = () => {
  return fetch(`${baseUrl}/v1/asset-introducers/activated`)
    .then(response => response.json())
    .then(response => response["data"])
    .then(data => {
      return {
        loans: Loan.fromArray(data["loans"]),
        lastUpdatedTimestamp: moment(data["last_updated_millis"]).format('LLL')
      }
    });
}

export const getAssetIntroducerById = (assetIntroducerId) => {
  return fetch(`${baseUrl}/v1/asset-introducers/${assetIntroducerId}`)
    .then(response => response.json())
    .then(response => response["data"])
    .then(data => {
      return data;
    });
}

export const getTotalCollateralization = () => {
  return fetch(`${baseUrl}/v1/dmm/collateralization`)
    .then(response => response.json())
    .then(response => response["data"])
    .then(data => new DmmCollateralization(data["active_collateralization"], data["total_collateralization"]));
};