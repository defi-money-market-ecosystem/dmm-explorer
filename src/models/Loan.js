export class Loan {

  static fromArray(arr) {
    return arr.map(item => {
      return new Loan(
        item["public_loan_id"],
        item["vehicle_type"],
        item["asset_introducer_id"],
        item["vehicle_info"],
        item["vehicle_value"],
        item["vehicle_identification_number_last_6"],
        item["loan_status"],
        item["digital_lien"],
      );
    });
  }

  constructor(loanId, vehicleType, assetIntroducerId, vehicleInfo, retailValue, vinLastSix, loanStatus, digitalLienLink) {
    this.loanId = loanId;
    this.assetIntroducerId = assetIntroducerId;
    this.vehicleType = vehicleType;
    this.vehicleInfo = vehicleInfo;
    this.retailValue = retailValue;
    this.vinLastSix = vinLastSix;
    this.loanStatus = loanStatus;
    this.digitalLienLink = digitalLienLink;
  }

}