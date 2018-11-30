import Parcel from '../Model/Parcel';


const response = {
  code: 300,
  data: {},
};
// parcels.parcels[0].parcelName
const getParcels = async (req, res) => {
  const queryselectParcels = 'SELECT * FROM parcels';
  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new Parcel();
    const queryselectParcelsResults = await parcel.query(queryselectParcels);
    response.data.results = queryselectParcelsResults.rows;
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

const getParcelById = async (req, res) => {
  const { parcelId } = req.params;
  const queryselectParcels = 'SELECT * FROM parcels WHERE parcelid = $1';
  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new Parcel();
    const queryselectParcelsResults = await parcel.query(queryselectParcels, [parcelId]);
    response.data.results = queryselectParcelsResults.rows;
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

const getByParcelsUser = async (req, res) => {
  const { userId } = req.params;
  const queryselectParcels = 'SELECT * FROM parcels WHERE userId = $1';
  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new Parcel();
    const queryselectParcelsResults = await parcel.query(queryselectParcels, [userId]);
    response.data.results = queryselectParcelsResults.rows;
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 403;
    response.data.message = 'No data';
    return res.status(response.code).send(response.data);
  }
};

const cancelParcelDelivery = async (req, res) => {
  const { parcelId } = req.params;
  const { status } = req.body;
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
    const parcel = new Parcel();
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

const changeDestination = async (req, res) => {
  const { parcelId } = req.params;
  const { destination } = req.body;
  const queryChangeDestinationParcel = 'UPDATE parcels SET destination = $1 WHERE parcelid = $2';

  try {
    response.code = 200;
    response.data.message = 'done';
    const parcel = new Parcel();
    // eslint-disable-next-line max-len
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

const changeCurrentLocation = async (req, res) => {
  const { parcelId } = req.params;
  const { currentlocation } = req.body;
  const queryChangeCurrentLocationParcel = 'UPDATE parcels SET currentlocation = $1 WHERE parcelid = $2';

  try {
    response.code = 200;
    response.data.message = 'done';
    const parcel = new Parcel();
    // eslint-disable-next-line max-len
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

const createParcel = async (req, res) => {
  const { newParcel } = req.body;

  const insertParcelQuery = `INSERT INTO Parcels
                (userId, receiver, parcelDescription, origin, destination,
                currentLocation, weightKg, submissionDate, arrivalDate, status) VALUES
                ($1, $2, $3, $4, $5, $6, $7,$8, $9, $10)`;

  const insertParcelValues = [
    newParcel.userId,
    newParcel.receiver,
    newParcel.parcelDescription,
    newParcel.origin,
    newParcel.destination,
    newParcel.currentLocation,
    Number(newParcel.weightKg),
    newParcel.submissionDate,
    newParcel.arrivalDate,
    newParcel.status,
  ];
  try {
    response.code = 200;
    response.data.message = 'Success';
    const parcel = new Parcel();
    await parcel.query(insertParcelQuery, insertParcelValues);
    return res.status(response.code).send(response.data);
  } catch (error) {
    response.code = 501;
    response.data.message = 'Fail';
    return res.status(response.code).send(response.data);
  }
};


export {
  getParcels, getParcelById, getByParcelsUser, cancelParcelDelivery, createParcel,
  changeDestination, changeCurrentLocation,
};
