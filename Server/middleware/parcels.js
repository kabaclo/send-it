import parcels from '../helpers/PARCELS';
import ParcelsHelper from '../helpers/parcels-helper';


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

const createParcel = (req, res) => {
  const { newParcel = null } = req.body;

  response.data = ParcelsHelper.createParcel({
    parcelsModel: parcels,
    newParcel,
  });
  res.status(response.code).send(response);
};
console.log(getParcels);
export {
  getParcels, getParcelById, getByParcelsUser, cancelParcelDelivery, createParcel,
};
