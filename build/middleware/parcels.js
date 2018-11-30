"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeCurrentLocation = exports.changeDestination = exports.createParcel = exports.cancelParcelDelivery = exports.getByParcelsUser = exports.getParcelById = exports.getParcels = void 0;

var _Parcel = _interopRequireDefault(require("../Model/Parcel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const response = {
  code: 300,
  data: {}
}; // parcels.parcels[0].parcelName

const getParcels = async function (req, res) {
  const queryselectParcels = 'SELECT * FROM parcels';

  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new _Parcel.default();
    const queryselectParcelsResults = await parcel.query(queryselectParcels);
    response.data.results = queryselectParcelsResults.rows;
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

exports.getParcels = getParcels;

const getParcelById = async function (req, res) {
  const {
    parcelId
  } = req.params;
  const queryselectParcels = 'SELECT * FROM parcels WHERE parcelid = $1';

  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new _Parcel.default();
    const queryselectParcelsResults = await parcel.query(queryselectParcels, [parcelId]);
    response.data.results = queryselectParcelsResults.rows;
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

exports.getParcelById = getParcelById;

const getByParcelsUser = async function (req, res) {
  const {
    userId
  } = req.params;
  const queryselectParcels = 'SELECT * FROM parcels WHERE userId = $1';

  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new _Parcel.default();
    const queryselectParcelsResults = await parcel.query(queryselectParcels, [userId]);
    response.data.results = queryselectParcelsResults.rows;
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

exports.getByParcelsUser = getByParcelsUser;

const cancelParcelDelivery = async function (req, res) {
  const {
    parcelId
  } = req.params;
  const {
    status
  } = req.body;
  const allowedStatus = ['canceled', 'inTransit', 'delivered'];

  if (allowedStatus.indexOf(status) < 0) {
    response.code = 400;
    response.data.message = 'bad request';
    return res.status(response.code).send(response.data);
  }

  const queryCancelParcel = 'UPDATE parcels SET status = $1 WHERE parcelid = $2';

  try {
    response.code = 200;
    response.data.message = 'done';
    const parcel = new _Parcel.default();
    const queryCancelParcelResult = await parcel.query(queryCancelParcel, [status, parcelId]);

    if (!queryCancelParcelResult.rowCount) {
      response.code = 404;
      response.data.message = 'parcel does not exit';
    }

    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

exports.cancelParcelDelivery = cancelParcelDelivery;

const changeDestination = async function (req, res) {
  const {
    parcelId
  } = req.params;
  const {
    destination
  } = req.body;
  const queryChangeDestinationParcel = 'UPDATE parcels SET destination = $1 WHERE parcelid = $2';

  try {
    response.code = 200;
    response.data.message = 'done';
    const parcel = new _Parcel.default(); // eslint-disable-next-line max-len

    const queryChangeDestinationParcelResult = await parcel.query(queryChangeDestinationParcel, [destination, parcelId]);

    if (!queryChangeDestinationParcelResult.rowCount) {
      response.code = 404;
      response.data.message = 'parcel does not exit';
    }

    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

exports.changeDestination = changeDestination;

const changeCurrentLocation = async function (req, res) {
  const {
    parcelId
  } = req.params;
  const {
    currentlocation
  } = req.body;
  const queryChangeCurrentLocationParcel = 'UPDATE parcels SET currentlocation = $1 WHERE parcelid = $2';

  try {
    response.code = 200;
    response.data.message = 'done';
    const parcel = new _Parcel.default(); // eslint-disable-next-line max-len

    const queryChangeCurrentLocationParcelResult = await parcel.query(queryChangeCurrentLocationParcel, [currentlocation, parcelId]);

    if (!queryChangeCurrentLocationParcelResult.rowCount) {
      response.code = 404;
      response.data.message = 'parcel does not exit';
    }

    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

exports.changeCurrentLocation = changeCurrentLocation;

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
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new _Parcel.default();
    await parcel.query(insertParcelQuery, insertParcelValues);
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 501;
    response.data.message = 'Fail';
    return res.status(response.code).send(response.data);
  }
};

exports.createParcel = createParcel;