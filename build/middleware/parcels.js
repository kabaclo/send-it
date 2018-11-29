"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParcel = exports.cancelParcelDelivery = exports.getByParcelsUser = exports.getParcelById = exports.getParcels = void 0;

var _PARCELS = _interopRequireDefault(require("../helpers/PARCELS"));

var _parcelsHelper = _interopRequireDefault(require("../helpers/parcels-helper"));

var _Parcel = _interopRequireDefault(require("../Model/Parcel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const response = {
  code: 200,
  data: {
    success: false
  }
}; // parcels.parcels[0].parcelName

const getParcels = function (req, res) {
  res.status(200).send(_PARCELS.default);
};

exports.getParcels = getParcels;

const getParcelById = function (req, res) {
  const {
    parcelId = null
  } = req.params;

  const parcel = _parcelsHelper.default.getById({
    parcelsModel: _PARCELS.default,
    parcelId
  });

  response.data.parcel = {};

  if (parcel) {
    response.data.parcel = parcel;
  }

  response.data.success = true;
  res.send(response.data);
};

exports.getParcelById = getParcelById;

const getByParcelsUser = function (req, res) {
  const {
    userId = null
  } = req.params;

  const parcelsResult = _parcelsHelper.default.getByParcelsUser({
    parcelsModel: _PARCELS.default,
    userId
  });

  response.data.parcels = [];

  if (parcelsResult) {
    response.data.parcels = parcelsResult;
  } // if(!parcelsResult.lenght){
  //   response.code = 404;
  // }


  response.data.success = true;
  res.status(response.code).send(response);
};

exports.getByParcelsUser = getByParcelsUser;

const cancelParcelDelivery = function (req, res) {
  const {
    parcelId = null
  } = req.params;

  const cancelResult = _parcelsHelper.default.updateParcel({
    parcelsModel: _PARCELS.default,
    parcelId
  });

  response.data = cancelResult;
  res.status(response.code).send(response);
};

exports.cancelParcelDelivery = cancelParcelDelivery;

const createParcel = async function (req, res) {
  const {
    newParcel
  } = req.body;
  const insertParcelQuery = `INSERT INTO Parcels
                (userId, receiver, parcelDescription, origin, destination,
                currentLocation, weightKg, submissionDate, arrivalDate, status) VALUES
                ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10)`;
  const insertParcelValues = [newParcel.userId, newParcel.receiver, newParcel.parcelDescription, newParcel.origin, newParcel.destination, newParcel.currentLocation, Number(newParcel.weightKg), newParcel.submissionDate, newParcel.arrivalDate, newParcel.status];

  try {
    const parcel = new _Parcel.default();
    await parcel.query(insertParcelQuery, insertParcelValues); // console.warn('Success here');

    return res.status(200).send({
      success: true
    });
  } catch (error) {
    console.log(error); // console.error('error here');

    return res.status(500).send({
      success: false
    });
  }
};

exports.createParcel = createParcel;