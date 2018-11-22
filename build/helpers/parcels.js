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
    let id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!id) {
      return {
        success: false
      };
    }

    return this.parcelsModel.parcels.find(function (parcel) {
      if (parcel.parcelId === id) {
        return parcel;
      }
    });
  }

}

exports.default = ParcelsHelper;