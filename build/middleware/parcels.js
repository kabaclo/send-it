"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParcel = exports.cancelParcelDelivery = exports.getByParcelsUser = exports.getParcelById = exports.getParcels = void 0;

var _PARCELS = _interopRequireDefault(require("../helpers/PARCELS"));

var _parcelsHelper = _interopRequireDefault(require("../helpers/parcels-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const response = {
  code: 200,
  data: {
    success: false
  }
};

const getParcels = function getParcels(req, res) {
  res.status(200).send(_PARCELS.default);
};

exports.getParcels = getParcels;

const getParcelById = function getParcelById(req, res) {
  const _req$params$parcelId = req.params.parcelId,
        parcelId = _req$params$parcelId === void 0 ? null : _req$params$parcelId;

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

const getByParcelsUser = function getByParcelsUser(req, res) {
  const _req$params$userId = req.params.userId,
        userId = _req$params$userId === void 0 ? null : _req$params$userId;

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

const cancelParcelDelivery = function cancelParcelDelivery(req, res) {
  const _req$params$parcelId2 = req.params.parcelId,
        parcelId = _req$params$parcelId2 === void 0 ? null : _req$params$parcelId2;

  const cancelResult = _parcelsHelper.default.updateParcel({
    parcelsModel: _PARCELS.default,
    parcelId
  });

  response.data = cancelResult;
  res.status(response.code).send(response);
};

exports.cancelParcelDelivery = cancelParcelDelivery;

const createParcel = function createParcel(req, res) {
  const _req$body$newParcel = req.body.newParcel,
        newParcel = _req$body$newParcel === void 0 ? null : _req$body$newParcel;
  response.data = _parcelsHelper.default.createParcel({
    parcelsModel: _PARCELS.default,
    newParcel
  });
  res.status(response.code).send(response);
};

exports.createParcel = createParcel;