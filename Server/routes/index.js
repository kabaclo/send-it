import express from 'express';
import bodyParser from 'body-parser';
// import login from '../middleware/login';
import initDB from '../middleware/admin';
import { createUser, login, authenticatUser } from '../middleware/user';
import 'dotenv/config';
import {
  getParcels, getParcelById, getByParcelsUser, cancelParcelDelivery, createParcel,
  changeDestination, changeCurrentLocation,
} from '../middleware/parcels';

const app = express();
const PORT = process.env.PORT || 5000;
const baseAPIURI = '/api/v1';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Clovis\' API');
});
app.get(`${baseAPIURI}/init-db/$`, initDB);
app.post(`${baseAPIURI}/auth/signUp`, createUser);

app.post(`${baseAPIURI}/auth/login$`, login);
app.use(authenticatUser);

app.get(`${baseAPIURI}/parcels/$`, getParcels);
app.get(`${baseAPIURI}/parcels/:parcelId/$`, getParcelById);
app.get(`${baseAPIURI}/users/:userId/parcels`, getByParcelsUser);
app.put(`${baseAPIURI}/parcels/:parcelId/status`, cancelParcelDelivery);
app.put(`${baseAPIURI}/parcels/:parcelId/destination`, changeDestination);
app.put(`${baseAPIURI}/parcels/:parcelId/presentLocation`, changeCurrentLocation);

app.post(`${baseAPIURI}/parcels/$`, createParcel);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
