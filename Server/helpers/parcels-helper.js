
export default class ParcelsHelper {
  constructor(options = {}) {
    const { parcelsModel } = options;
    this.parcelsModel = parcelsModel;
  }

  static getById(options = {}) {
    const { parcelsModel, parcelId } = options;
    // console.log('parcels id,',parcelId);

    if (!parcelId) {
      return {
        success: false,
      };
    }
    return parcelsModel.parcels.find((parcel) => {
      if (parcel.parcelId === Number(parcelId)) {
        return parcel;
      }
    });
  }

  static getByParcelsUser(options = {}) {
    const { parcelsModel, userId } = options;
    if (!userId) {
      return {
        success: false,
        message: 'Not found',
      };
    }
    return parcelsModel.parcels.filter(parcel => parcel.sender === Number(userId));
  }

  static updateParcel(options = {}) {
    const parcel = ParcelsHelper.getById(options);
    if (!parcel) return false;
    if (parcel.status === 'delivered' || parcel.status === 'canceled') {
      return {
        success: false,
        message: 'cannot be canceled',
      };
    }
    parcel.status = 'canceled';
    return {
      success: true,
      message: 'parcel canceled',
      parcel,
    };
  }

  static createParcel(options = {}) {
    const { parcelsModel, newParcel } = options;

    /** TODO: check whether newParcel has valid data */
    newParcel.parcelId = ParcelsHelper.newParcelId();
    parcelsModel.parcels.push(newParcel);
    return {
      success: true,
      message: 'parcel saved',
    };
  }

  static newParcelId() {
    return process.hrtime()[1];
  }
}
