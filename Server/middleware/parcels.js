import parcels from '../helpers/PARCELS';
import ParcelsHelper from '../helpers/parcels-helper';
import Parcel from '../Model/Parcel';


const response = {
  code: 200,
  data: {
    success: false,
  },
};
// parcels.parcels[0].parcelName
const getParcels = (req, res) => { res.status(200).send(parcels); };

const getParcelById = (req, res) => {
  const { parcelId = null } = req.params;

  const parcel = ParcelsHelper.getById({
    parcelsModel: parcels,
    parcelId,
  });
  response.data.parcel = {};
  if (parcel) {
    response.data.parcel = parcel;
  }
  response.data.success = true;
  res.send(response.data);
};

const getByParcelsUser = (req, res) => {
  const { userId = null } = req.params;
  const parcelsResult = ParcelsHelper.getByParcelsUser({
    parcelsModel: parcels,
    userId,
  });
  response.data.parcels = [];
  if (parcelsResult) {
    response.data.parcels = parcelsResult;
  }

  // if(!parcelsResult.lenght){
  //   response.code = 404;
  // }
  response.data.success = true;
  res.status(response.code).send(response);
};

const cancelParcelDelivery = (req, res) => {
  const { parcelId = null } = req.params;
  const cancelResult = ParcelsHelper.updateParcel({
    parcelsModel: parcels,
    parcelId,
  });

  response.data = cancelResult;
  res.status(response.code).send(response);
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
    const parcel = new Parcel();
    await parcel.query(insertParcelQuery, insertParcelValues);
    // console.warn('Success here');
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log (error);
    // console.error('error here');
    return res.status(500).send({ success: false });
  }
};


export {
  getParcels, getParcelById, getByParcelsUser, cancelParcelDelivery, createParcel,
};
