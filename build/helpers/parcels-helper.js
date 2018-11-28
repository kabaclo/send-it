"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ParcelsHelper {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const parcelsModel = options.parcelsModel;
    this.parcelsModel = parcelsModel;
  }

  static getById() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const parcelsModel = options.parcelsModel,
          parcelId = options.parcelId; // console.log('parcels id,',parcelId);

    if (!parcelId) {
      return {
        success: false
      };
    }

    return parcelsModel.parcels.find(function (parcel) {
      if (parcel.parcelId === Number(parcelId)) {
        return parcel;
      }
    });
  }

  static getByParcelsUser() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const parcelsModel = options.parcelsModel,
          userId = options.userId;

    if (!userId) {
      return {
        success: false,
        message: 'Not found'
      };
    }

    return parcelsModel.parcels.filter(function (parcel) {
      return parcel.sender === Number(userId);
    });
  }

  static updateParcel() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const parcel = ParcelsHelper.getById(options);
    if (!parcel) return false;

    if (parcel.status === 'delivered' || parcel.status === 'canceled') {
      return {
        success: false,
        message: 'cannot be canceled'
      };
    }

    parcel.status = 'canceled';
    return {
      success: true,
      message: 'parcel canceled',
      parcel
    };
  }

  static createParcel() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const parcelsModel = options.parcelsModel,
          newParcel = options.newParcel;
    /** TODO: check whether newParcel has valid data */

    newParcel.parcelId = ParcelsHelper.newParcelId();
    parcelsModel.parcels.push(newParcel);
    return {
      success: true,
      message: 'parcel saved'
    };
  }

  static newParcelId() {
    return process.hrtime()[1];
  }

}

exports.default = ParcelsHelper;