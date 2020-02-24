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

export const getLoanMetadata = () => {
  return fetch(`${baseUrl}/v1/loans`)
    .then(response => response.json())
    .then(response => response["data"]["last_updated_millis"])
    // .then(lastUpdatedMillis => moment(lastUpdatedMillis).format('YYYY-MM-DD HH:mm'));
    .then(lastUpdatedMillis => moment(lastUpdatedMillis).format('LLL'));
};

export const getTotalCollateralization = () => {
  return fetch(`${baseUrl}/v1/dmm/collateralization`)
    .then(response => response.json())
    .then(response => response["data"])
    .then(data => new DmmCollateralization(data["active_collateralization"], data["total_collateralization"]));
};